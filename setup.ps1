$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host "[1/4] Installing packages..."
npm install
if ($LASTEXITCODE -ne 0) { Write-Host "ERROR: npm install failed"; Read-Host; exit 1 }

Write-Host ""
Write-Host "[2/4] Building..."
npm run build
if ($LASTEXITCODE -ne 0) { Write-Host "ERROR: build failed"; Read-Host; exit 1 }

Write-Host ""
Write-Host "[3/4] Git init and push to GitHub..."
git init
git add .
git commit -m "initial commit: equal-love-photo-manager v1.0.0"
gh repo create equal-love-photo-manager --public --source=. --remote=origin --push
if ($LASTEXITCODE -ne 0) {
    Write-Host "NOTE: gh command failed."
    Write-Host "Please create repo manually: https://github.com/new"
    Write-Host "Repo name: equal-love-photo-manager"
}

Write-Host ""
Write-Host "[4/4] Deploy to GitHub Pages..."
npm run deploy

Write-Host ""
Write-Host "============================"
Write-Host "Setup complete!"
Write-Host "URL: https://Rurimpa.github.io/equal-love-photo-manager"
Write-Host "============================"
Read-Host "Press Enter to exit"
