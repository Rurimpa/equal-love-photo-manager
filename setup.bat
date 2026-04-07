@echo off
chcp 65001 > nul

cd /d "%~dp0"

echo [1/4] Installing packages...
call npm install
if errorlevel 1 ( echo ERROR: npm install failed && pause && exit /b 1 )

echo.
echo [2/4] Building...
call npm run build
if errorlevel 1 ( echo ERROR: build failed && pause && exit /b 1 )

echo.
echo [3/4] Git init and push to GitHub...
git init
git add .
git commit -m "initial commit: equal-love-photo-manager v1.0.0"
gh repo create equal-love-photo-manager --public --source=. --remote=origin --push
if errorlevel 1 (
  echo NOTE: gh command failed. Please create repo manually on GitHub.
  echo Repo name: equal-love-photo-manager
)

echo.
echo [4/4] Deploy to GitHub Pages...
call npm run deploy

echo.
echo ============================
echo Setup complete!
echo URL: https://Rurimpa.github.io/equal-love-photo-manager
echo ============================
pause
