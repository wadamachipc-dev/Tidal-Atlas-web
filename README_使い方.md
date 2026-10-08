# Tidal Atlas — 干潟図鑑 公式サイト

Higata Project / 2026年11月公開予定

## 開く

ZIPをすべて展開して、public/index.htmlをダブルクリックしてください。
WindowsではOPEN_SITE.batからも開けます。
ネット接続やソフトのインストールは不要です。画像や機能はすべて同梱しています。

## 構成

- public/index.html：文章、公開情報、ゲーム紹介
- public/styles.css：デザイン、スマホ表示
- public/script.js：メニュー、画像切り替え・拡大
- public/site-config.js：開発元、公開予定のラベル、企業サイト・公式X・問い合わせ先
- public/assets/：提供いただいた5枚のゲーム画面
- wrangler.jsonc：Cloudflare Workersで公開する場合の設定例

## 内容を変更する

文章はpublic/index.htmlで編集します。
公開時期を変更する場合は、HTML内の公開情報・お知らせ・FAQと、site-config.jsのreleaseTextを更新してください。
画像はpublic/assets/内の該当ファイルを差し替えます。同じ名前なら文章以外の変更は不要です。
企業サイト・公式X・問い合わせ先はsite-config.jsの空欄に入力してください。入力した項目だけ、開発元の欄にリンクが表示されます。

プレイ先のURLはまだ設定していません。現在のボタンはサイト内のゲーム紹介や公開情報へ移動します。公開時に実際のプレイ先を追加してください。
料金・スマートフォンへの対応は未定としています。代表者・所在地・実績など未提供の企業情報は掲載していません。

## GitHubを使わずCloudflare Pagesで公開する

1. CloudflareのWorkers & PagesからPagesの新規プロジェクトを作成します。
2. Git連携ではなくDirect Upload（直接アップロード）を選びます。
3. publicフォルダをドラッグ＆ドロップして公開します。
4. index.htmlがアップロード対象の最上位になることを確認してください。

アップロードするのはpublicフォルダ内のファイルです。このZIP全体をそのまま送らず、展開したpublicフォルダか、その中身だけをZIPにして送ってください。
更新するときは、同じプロジェクトに更新後のpublicフォルダをアップロードします。

## Cloudflare Workersで公開する場合

wrangler.jsoncはassets.directoryを./publicにしています。
Worker名tidal-atlasは、実際に利用する名前に合わせて変更できます。
Node.jsとWranglerのある環境で、このフォルダからnpx wrangler deployを実行すると公開できます。
Cloudflareアカウントへのログインが必要です。

## 今後の変更を依頼する

このZIP、または変更後の最新ファイルをチャットに添付し、変更内容を伝えてください。
公開URLが決まったら、それも共有すると現在の公開先を確認しやすくなります。

## 補足

スクリーンショットはすべてユーザー提供の開発中ゲーム画面です。
外部フォント・外部JavaScript・アクセス解析・Cookie・問い合わせフォームは使用していません。
問い合わせ先を設定するとメールソフトが開くリンクになります。サイトがメールを直接送信する機能ではありません。
デスクトップ・タブレット・スマートフォンの画面幅に対応するCSSと、キーボード操作・動きを抑える設定への配慮を含みます。
