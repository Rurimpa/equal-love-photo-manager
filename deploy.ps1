Set-Location $PSScriptRoot

Write-Host "[1/2] Creating GitHub repo and pushing..."
$ghResult = gh repo create equal-love-photo-manager --public --source=. --remote=origin --push 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "gh command failed. Trying manual git remote..."
    git remote add origin https://github.com/Rurimpa/equal-love-photo-manager.git
    git branch -M main
    git add .
    git commit -m "initial commit: equal-love-photo-manager v1.0.0" 2>&1
    git push -u origin main
    if ($LASTEXITCODE -ne 0) {
        Write-Host ""
        Write-Host "ERROR: git push failed."
        Write-Host "Please create the GitHub repo manually:"
        Write-Host "  https://github.com/new"
        Write-Host "  Name: equal-love-photo-manager (public)"
        Write-Host "Then run this script again."
        Read-Host "Press Enter to exit"
        exit 1
    }
}

Write-Host ""
Write-Host "[2/2] Deploying to GitHub Pages..."
npm run deploy

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "============================"
    Write-Host "Deploy complete!"
    Write-Host "URL: https://Rurimpa.github.io/equal-love-photo-manager"
    Write-Host "============================"
} else {
    Write-Host "ERROR: deploy failed"
}
Read-Host "Press Enter to exit"
