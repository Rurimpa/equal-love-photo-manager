@echo off
SET BAT_VERSION=2.0.0
chcp 65001 > nul
cd /d "%~dp0"

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0show_info.ps1" -ProjectPath "%~dp0."

if not exist "CLAUDE.md" (
    powershell -NoProfile -ExecutionPolicy Bypass -Command "Set-Content -Path CLAUDE.md -Value # -Encoding UTF8"
)

claude --dangerously-skip-permissions
