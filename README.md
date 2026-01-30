# discord-stream-svc

Discord配信基盤サービス

## 開発

開発サーバーを起動するには以下のコマンドを実行する

```bash
pnpm run dev
```

ビルドとビルド結果を実行するには以下のコマンドを実行する

```bash
pnpm run build
pnpm run start
```

## 本番デプロイ

Dockerを用いてビルド、実行するには以下のコマンドを実行する

> これらのコマンドを実行すると`discord-stream-svc`というイメージと`discord-stream-svc`というコンテナが生成されます

```bash
pnpm run docker:build
pnpm run docker:start
```
