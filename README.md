# 【非公式】深影さん×被写隊の部屋

RK Music所属VSinger **深影（Mikage）** さんの歌ってみた・配信情報をまとめたファンメイドDBサイトです。

GitHub Pages でホストされています。

## 構成

```
Mikage_HishatainoHeya/
├── .github/
│   └── workflows/
│       └── pages.yml             # 自動ビルド・デプロイ
├── web/                          # React + Vite フロントエンド
│   ├── index.html                # HTMLテンプレート
│   ├── package.json              # 依存パッケージ
│   ├── tsconfig.json             # TypeScript設定
│   ├── tsconfig.node.json        # TypeScript設定（Node用）
│   ├── vite.config.ts            # Vite設定
│   ├── public/
│   │   └── icon_mikage.png       # ファビコン（要差し替え）
│   └── src/
│       ├── main.tsx              # エントリーポイント
│       ├── App.tsx               # ルートコンポーネント・タブ管理
│       ├── App.css               # グローバルスタイル
│       ├── types.ts              # 型定義
│       ├── components/
│       │   ├── StreamsTab.tsx    # LiveStreaming Info タブ
│       │   ├── SongsTab.tsx      # Uta-Mita DB タブ
│       │   └── AboutTab.tsx      # About タブ
│       └── utils/
│           └── csv.ts            # CSV パース・集計ユーティリティ
├── streaming_info.csv            # データ（手動更新）
├── .gitignore
└── README.md
```

## データ更新

`streaming_info.csv` を編集して `main` ブランチに push すると、GitHub Actions が自動でビルド・デプロイします。

### CSVカラム

| カラム | 説明 |
|--------|------|
| 枠名 | 配信タイトル |
| 楽曲名 | 歌った曲名 |
| 歌唱順 | 枠内での順番 |
| 配信日 | YYYY-MM-DD 形式 |
| 枠URL | YouTube URL（タイムスタンプ付き可） |
| コラボ相手様 | コラボなしの場合は「なし」 |
| 原曲Artist | 原曲アーティスト名 |
| 作詞 | 作詞者 |
| 作曲 | 作曲者 |
| リリース日 | 例: 2023年4月20日 |

## ローカル開発

```bash
cd web
npm install
npm run dev
```

## ファビコン差し替え

`web/public/icon_mikage.png` を深影さん用の画像に置き換えてください。
