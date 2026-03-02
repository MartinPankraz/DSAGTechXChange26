# ============================================================
# Invite-TrainerGuests.ps1
# Invites trainer001-030 as B2B guest users into this tenant
# and adds them to the "DSAG TechXChange 2026" group
# ============================================================
# Prerequisites:
#   Install-Module Microsoft.Graph -Scope CurrentUser
# ============================================================

#Requires -Modules Microsoft.Graph.Users, Microsoft.Graph.Groups, Microsoft.Graph.Identity.SignIns

param(
    [switch]$WhatIf
)

# ── Connect ──────────────────────────────────────────────────
Write-Host "Connecting to Microsoft Graph..." -ForegroundColor Cyan
Connect-MgGraph -Scopes "User.Invite.All", "User.ReadWrite.All", "GroupMember.ReadWrite.All", "Directory.ReadWrite.All" -NoWelcome

$context = Get-MgContext
if (-not $context) {
    Write-Error "Not connected to Microsoft Graph. Aborting."
    exit 1
}
Write-Host "Connected as: $($context.Account)" -ForegroundColor Green

# ── Config ───────────────────────────────────────────────────
$sourceDomain  = "M365x49933862.onmicrosoft.com"   # Tenant where users were created
$groupId       = "e43d9d58-0b3e-4c23-aa96-978079105c74"  # "DSAG TechXChange 2026"
$inviteRedirectUrl = "https://myapps.microsoft.com"       # Where users land after accepting invite

# ── Verify group exists ───────────────────────────────────────
Write-Host "`nVerifying target group..." -ForegroundColor Cyan
try {
    $group = Get-MgGroup -GroupId $groupId
    Write-Host "  Group found: $($group.DisplayName)" -ForegroundColor Green
} catch {
    Write-Error "Group with ID '$groupId' not found. Check you are connected to the correct tenant. Aborting."
    exit 1
}

# ── Process users ─────────────────────────────────────────────
$results = @()

for ($i = 1; $i -le 30; $i++) {
    $number = "{0:D3}" -f $i
    $email  = "trainer$number@$sourceDomain"

    Write-Host "`nProcessing $email ..." -ForegroundColor Cyan

    # ── Step 1: Check if guest already exists in this tenant ──
    $existingGuest = Get-MgUser -Filter "mail eq '$email' or userPrincipalName eq '$email'" -ErrorAction SilentlyContinue

    if (-not $existingGuest) {
        # Also try searching by ExternalUserState (invited but not yet accepted)
        $existingGuest = Get-MgUser -Filter "otherMails/any(m:m eq '$email')" -ErrorAction SilentlyContinue
    }

    $guestId = $null

    if ($existingGuest) {
        Write-Host "  Guest already exists in this tenant. ID: $($existingGuest.Id)" -ForegroundColor Yellow
        $guestId = $existingGuest.Id
    } else {
        if ($WhatIf) {
            Write-Host "  [WhatIf] Would invite: $email" -ForegroundColor Magenta
            $results += [PSCustomObject]@{ Email = $email; InviteStatus = "WhatIf"; GroupStatus = "WhatIf" }
            continue
        }

        # ── Step 2: Send B2B invitation ───────────────────────
        try {
            $invitation = New-MgInvitation `
                -InvitedUserEmailAddress $email `
                -InviteRedirectUrl $inviteRedirectUrl `
                -InvitedUserDisplayName "Trainer $number" `
                -SendInvitationMessage:$false   # Set to $true to send invite email

            $guestId = $invitation.InvitedUser.Id
            Write-Host "  Invited successfully. Guest ID: $guestId  |  Status: $($invitation.Status)" -ForegroundColor Green

        } catch {
            Write-Warning "  Invitation failed: $_"
            $results += [PSCustomObject]@{ Email = $email; InviteStatus = "Failed"; GroupStatus = "Skipped"; Error = $_ }
            continue
        }
    }

    if (-not $guestId) {
        Write-Warning "  No valid guest ID — skipping group assignment."
        $results += [PSCustomObject]@{ Email = $email; InviteStatus = "NoId"; GroupStatus = "Skipped" }
        continue
    }

    # ── Step 3: Add to group ──────────────────────────────────
    if ($WhatIf) {
        Write-Host "  [WhatIf] Would add to group '$($group.DisplayName)'" -ForegroundColor Magenta
        $results += [PSCustomObject]@{ Email = $email; InviteStatus = "WhatIf"; GroupStatus = "WhatIf" }
        continue
    }

    try {
        # Check if already a member
        $isMember = Get-MgGroupMember -GroupId $groupId -Filter "id eq '$guestId'" -ErrorAction SilentlyContinue

        if ($isMember) {
            Write-Host "  Already a group member — skipping." -ForegroundColor Yellow
            $results += [PSCustomObject]@{ Email = $email; InviteStatus = "AlreadyExisted"; GroupStatus = "AlreadyMember" }
        } else {
            New-MgGroupMember -GroupId $groupId -DirectoryObjectId $guestId
            Write-Host "  Added to group '$($group.DisplayName)'." -ForegroundColor Green
            $results += [PSCustomObject]@{ Email = $email; InviteStatus = "Invited"; GroupStatus = "Added" }
        }

    } catch {
        Write-Warning "  Group assignment failed: $_"
        $results += [PSCustomObject]@{ Email = $email; InviteStatus = "Invited"; GroupStatus = "Failed"; Error = $_ }
    }
}

# ── Summary ───────────────────────────────────────────────────
Write-Host "`n========== SUMMARY ==========" -ForegroundColor Cyan
$results | Format-Table Email, InviteStatus, GroupStatus -AutoSize

$successCount = ($results | Where-Object { $_.GroupStatus -in "Added","AlreadyMember" }).Count
Write-Host "Done. $successCount / 30 users are in the group." -ForegroundColor $(if ($successCount -eq 30) {"Green"} else {"Yellow"})

Disconnect-MgGraph
