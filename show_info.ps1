param(
    [string]$ProjectPath = "."
)

$OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$SCRIPT_VERSION = "2.0.0"

$projectName = Split-Path (Resolve-Path $ProjectPath) -Leaf
$separator = "=" * 48

Write-Host $separator
Write-Host "Project: $projectName  (v$SCRIPT_VERSION)"
Write-Host $separator
Write-Host ""

$designPath = Join-Path $ProjectPath "DESIGN.md"
Write-Host "--- DESIGN.md ---"
if (Test-Path $designPath) {
    Get-Content $designPath -Encoding UTF8 | ForEach-Object { Write-Host $_ }
} else {
    Write-Host "(まだ作成されていません)"
}

Write-Host ""

$changelogPath = Join-Path $ProjectPath "CHANGELOG.md"
Write-Host "--- CHANGELOG.md ---"
if (Test-Path $changelogPath) {
    Get-Content $changelogPath -Encoding UTF8 | ForEach-Object { Write-Host $_ }
} else {
    Write-Host "(まだ作成されていません)"
}

Write-Host ""
Write-Host $separator
Write-Host "必要に応じてClaude.aiに貼り付けてから作業を開始してください"
Write-Host $separator
Write-Host ""
