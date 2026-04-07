$path = "E:\Users\PCowner\ClaudeCode\equal-love-photo-manager\setup.bat"
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
[System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::Default)
Write-Host "Done: ANSI save complete"
