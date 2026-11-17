# 3択クイズ（宿題用クイズアプリ）

建設業法に関する全5問の3択クイズです。HTML / CSS / JavaScript だけで動く静的サイトなので、GitHub Pages でそのまま公開できます。

## ファイル構成

- `index.html` … 画面の構造
- `style.css` … 見た目（緑色のテーマ）
- `script.js` … クイズの問題と動き
- `.nojekyll` … GitHub Pages の Jekyll 処理を無効にするための空ファイル

## GitHub Pages での公開手順

1. GitHub で新しいリポジトリを作成します（例: `quiz-app`、Public）。
2. このフォルダで次のコマンドを実行してアップロードします。

   ```bash
   git add .
   git commit -m "クイズアプリを追加"
   git remote add origin https://github.com/<ユーザー名>/quiz-app.git
   git push -u origin main
   ```

3. GitHub のリポジトリ画面で **Settings → Pages** を開きます。
4. **Source** を「Deploy from a branch」、**Branch** を `main` / `/ (root)` にして **Save** を押します。
5. 1〜2分後、`https://<ユーザー名>.github.io/quiz-app/` で公開されます。
