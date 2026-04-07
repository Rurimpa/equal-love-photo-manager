# equal-love-photo-manager - Claude Code作業指示書

## プロジェクト概要
=LOVE生写真の所持管理WebアプリApp。
React + Firebase Firestore + GitHub Pages構成。
URLを知っている人なら誰でも閲覧・チェック可能。

## 作業ルール
- 設計変更が必要な場合は実装を止めてユーザーに確認すること
- 実装済み機能を失わないこと
- src/firebase.js のAPIキー（REPLACE_ME）はユーザーが手動入力するため変更しないこと

## ファイル構成
- src/data/photoSets.js：メンバー・セットのマスターデータ（新セット追加はここ）
- src/firebase.js：Firebase初期化＆localStorageフォールバック
- src/pages/MainPage.jsx：メイン所持管理画面
- src/pages/MissingPage.jsx：未所持一覧画面
- src/pages/SettingsPage.jsx：メンバー設定画面

## デプロイ
npm run deploy → GitHub Pages に自動公開
