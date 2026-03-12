# ============================================================
# Create-StudentUsers.ps1
# Creates student001 to student030 in M365 and assigns licenses
# ============================================================
# Prerequisites:
#   Install-Module Microsoft.Graph -Scope CurrentUser
# ============================================================

#Requires -Modules Microsoft.Graph.Users, Microsoft.Graph.Identity.DirectoryManagement

param(
    [string]$DefaultPassword = "Student@2025!",
    [string]$Domain = "M365x75849431.OnMicrosoft.com",
    [int]$StartWith = 1,
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

$usageLocation = "DE"   # Change if needed (e.g. "US", "GB")

# ── Hardcoded SKU IDs (from your tenant) ─────────────────────
$licenses = @(
    @{ SkuId = "3271cf8e-2be5-4a09-a549-70fd05baaa17" },  # Microsoft 365 E5 EEA (not Teams)
    # @{ SkuId = "606b54a9-78d8-4298-ad8b-df6ef4481c80" },  # Microsoft Copilot Studio Viral Trial — NOT available in tenant
    @{ SkuId = "f30db892-07e9-47e9-837c-80727f46fd3d" },  # Microsoft Power Automate Free
    @{ SkuId = "7e74bd05-2c47-404e-829a-ba95c66fe8e5" }   # Microsoft Teams EEA
)

Write-Host "Licenses to assign:" -ForegroundColor Cyan
Write-Host "  - Microsoft 365 E5 EEA (not Teams)"
# Write-Host "  - Microsoft Copilot Studio Viral Trial"  # Not available in tenant
Write-Host "  - Microsoft Power Automate Free"
Write-Host "  - Microsoft Teams EEA"

# ── Password profile ─────────────────────────────────────────
$passwordProfile = @{
    Password                      = $DefaultPassword
    ForceChangePasswordNextSignIn = $false
}

# ── Create users ─────────────────────────────────────────────
$userCount = 30
$results = @()

Write-Host "Creating users student$("{0:D3}" -f $StartWith) to student$("{0:D3}" -f ($StartWith + $userCount - 1))" -ForegroundColor Cyan

for ($i = $StartWith; $i -le ($StartWith + $userCount - 1); $i++) {
    $number      = "{0:D3}" -f $i
    $upn         = "student$number@$domain"
    $displayName = "Student $number"
    $mailNick    = "student$number"

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
        # Check which licenses are already assigned
        $currentLicenses = (Get-MgUserLicenseDetail -UserId $userId -ErrorAction Stop).SkuId
        $missingLicenses = $licenses | Where-Object { $_.SkuId -notin $currentLicenses }

        if ($missingLicenses.Count -eq 0) {
            Write-Host "  All licenses already assigned — skipping." -ForegroundColor Yellow
            $results += [PSCustomObject]@{ UPN = $upn; Status = "AlreadyComplete" }
            continue
        }

        Write-Host "  Assigning $($missingLicenses.Count) missing license(s)..." -ForegroundColor Cyan
        Update-MgUser -UserId $userId -UsageLocation $usageLocation

        Set-MgUserLicense -UserId $userId `
                          -AddLicenses @($missingLicenses) `
                          -RemoveLicenses @() `
                          -ErrorAction Stop

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

$successCount = ($results | Where-Object { $_.Status -eq "Success" -or $_.Status -eq "AlreadyComplete" }).Count
Write-Host "Done. $successCount / $userCount users processed successfully." -ForegroundColor $(if ($successCount -eq $userCount) {"Green"} else {"Yellow"})

Disconnect-MgGraph
