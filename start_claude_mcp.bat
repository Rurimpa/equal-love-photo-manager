@echo off
:: Claude Code MCP サーバー自動起動バッチ
:: タスクスケジューラからログイン時に自動実行される

:: ウィンドウを最小化して起動
start /min "" cmd /c "claude mcp serve"
