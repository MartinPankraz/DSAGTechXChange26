# ============================================================
# Create-TrainerUsers.ps1
# Creates trainer001 to trainer030 in M365 and assigns licenses
# ============================================================
# Prerequisites:
#   Install-Module Microsoft.Graph -Scope CurrentUser
# ============================================================

#Requires -Modules Microsoft.Graph.Users, Microsoft.Graph.Identity.DirectoryManagement

param(
    [string]$DefaultPassword = "Trainer@2025!",
    [switch]$WhatIf
)

# ── Connect ──────────────────────────────────────────────────
Write-Host "Connecting to Microsoft Graph..." -ForegroundColor Cyan
Connect-MgGraph -Scopes "User.ReadWrite.All", "Directory.ReadWrite.All", "Organization.Read.All" -NoWelcome

# Verify authentication
$context = Get-MgContext
if (-not $context) {
    Write-Error "Not connected to Microsoft Graph. Aborting."
    exit 1
}
Write-Host "Connected as: $($context.Account)" -ForegroundColor Green

$domain        = "M365x49933862.onmicrosoft.com"
$usageLocation = "DE"   # Change if needed (e.g. "US", "GB")

# ── Hardcoded SKU IDs (from your tenant) ─────────────────────
$licenses = @(
    @{ SkuId = "3271cf8e-2be5-4a09-a549-70fd05baaa17" },  # Microsoft 365 E5 EEA (not Teams)
    @{ SkuId = "606b54a9-78d8-4298-ad8b-df6ef4481c80" },  # Microsoft Copilot Studio Viral Trial
    @{ SkuId = "f30db892-07e9-47e9-837c-80727f46fd3d" },  # Microsoft Power Automate Free
    @{ SkuId = "7e74bd05-2c47-404e-829a-ba95c66fe8e5" }   # Microsoft Teams EEA
)

Write-Host "Licenses to assign:" -ForegroundColor Cyan
Write-Host "  - Microsoft 365 E5 EEA (not Teams)"
Write-Host "  - Microsoft Copilot Studio Viral Trial"
Write-Host "  - Microsoft Power Automate Free"
Write-Host "  - Microsoft Teams EEA"

# ── Password profile ─────────────────────────────────────────
$passwordProfile = @{
    Password                      = $DefaultPassword
    ForceChangePasswordNextSignIn = $false
}

# ── Create users ─────────────────────────────────────────────
$results = @()

for ($i = 1; $i -le 30; $i++) {
    $number      = "{0:D3}" -f $i
    $upn         = "trainer$number@$domain"
    $displayName = "Trainer $number"
    $mailNick    = "trainer$number"

    Write-Host "`nProcessing $upn ..." -ForegroundColor Cyan

    # Check if user already exists
    $existing = Get-MgUser -Filter "userPrincipalName eq '$upn'" -ErrorAction SilentlyContinue

    if ($existing) {
        Write-Host "  User already exists — skipping creation." -ForegroundColor Yellow
        $userId = $existing.Id
    } else {
        if ($WhatIf) {
            Write-Host "  [WhatIf] Would create user: $upn" -ForegroundColor Magenta
            $results += [PSCustomObject]@{ UPN = $upn; Status = "WhatIf" }
            continue
        }

        try {
            $newUser = New-MgUser -DisplayName $displayName `
                                  -UserPrincipalName $upn `
                                  -MailNickname $mailNick `
                                  -AccountEnabled `
                                  -PasswordProfile $passwordProfile `
                                  -UsageLocation $usageLocation

            $userId = $newUser.Id

            if (-not $userId) {
                Write-Warning "  User created but returned empty ID — skipping license step."
                $results += [PSCustomObject]@{ UPN = $upn; Status = "CreateFailed"; Error = "Empty UserId returned" }
                continue
            }

            Write-Host "  Created user. ID: $userId" -ForegroundColor Green

        } catch {
            Write-Warning "  Failed to create user: $_"
            $results += [PSCustomObject]@{ UPN = $upn; Status = "CreateFailed"; Error = $_ }
            continue
        }
    }

    # ── Assign licenses ──────────────────────────────────────
    if ($WhatIf) {
        Write-Host "  [WhatIf] Would assign $($licenses.Count) license(s)." -ForegroundColor Magenta
        $results += [PSCustomObject]@{ UPN = $upn; Status = "WhatIf" }
        continue
    }

    if (-not $userId) {
        Write-Warning "  Skipping license assignment — no valid UserId."
        $results += [PSCustomObject]@{ UPN = $upn; Status = "LicenseFailed"; Error = "No UserId" }
        continue
    }

    try {
        Update-MgUser -UserId $userId -UsageLocation $usageLocation

        Set-MgUserLicense -UserId $userId `
                          -AddLicenses $licenses `
                          -RemoveLicenses @()

        Write-Host "  Licenses assigned successfully." -ForegroundColor Green
        $results += [PSCustomObject]@{ UPN = $upn; Status = "Success" }

    } catch {
        Write-Warning "  License assignment failed: $_"
        $results += [PSCustomObject]@{ UPN = $upn; Status = "LicenseFailed"; Error = $_ }
    }
}

# ── Summary ──────────────────────────────────────────────────
Write-Host "`n========== SUMMARY ==========" -ForegroundColor Cyan
$results | Format-Table -AutoSize

$successCount = ($results | Where-Object Status -eq "Success").Count
Write-Host "Done. $successCount / 30 users processed successfully." -ForegroundColor $(if ($successCount -eq 30) {"Green"} else {"Yellow"})

Disconnect-MgGraph
