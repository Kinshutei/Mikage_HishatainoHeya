# 【非公式】深影さん×被写隊の部屋

RK Music所属VSinger **深影（Mikage）** さんの歌ってみた・配信情報をまとめたファンメイドDBサイトです。

GitHub Pages でホストされています。

## 構成

```
Mikage_HishatainoHeya/
├── .github/
│   └── workflows/
│       └── pages.yml                 # 自動ビルド・デプロイ
├── web/                              # React + Vite フロントエンド
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── public/
│   │   └── background_0.png          # 背景画像
│   └── src/
│       ├── main.tsx                  # エントリーポイント
│       ├── App.tsx                   # ルートコンポーネント・タブ管理
│       ├── App.css                   # グローバルスタイル
│       ├── types.ts                  # 型定義
│       ├── i18n.ts                   # 多言語設定
│       ├── locales/                  # 翻訳ファイル（ja / en / ko / zh-TW）
│       ├── components/
│       │   ├── StreamsTab.tsx        # 配信枠一覧タブ
│       │   ├── SongsTab.tsx          # 歌唱曲DB タブ
│       │   ├── AboutTab.tsx          # About タブ
│       │   ├── ChangelogTab.tsx      # 更新履歴タブ
│       │   └── Footer.tsx            # フッター
│       └── utils/
│           └── csv.ts                # CSV パース・集計ユーティリティ
├── streaminginfo_Mikage.csv          # 枠情報（手動更新）
├── rkmusic_song_master.csv           # ソングマスター（手動更新）
├── alias_map.csv                     # 楽曲名エイリアスマップ
├── App.py                            # データ管理スクリプト
├── .gitignore
└── README.md
```

## データ管理

データは2つのCSVで管理しています。

### streaminginfo_Mikage.csv（枠情報）

配信枠ごとの歌唱記録。

| カラム | 説明 |
|--------|------|
| 枠名 | 配信タイトル |
| song_id | ソングマスターとの結合キー |
| 歌唱順 | 枠内での歌唱順番 |
| 配信日 | YYYY-MM-DD 形式 |
| 枠URL | YouTube URL（タイムスタンプ付き可） |
| コラボ相手様 | コラボなしの場合は「なし」 |

### rkmusic_song_master.csv（ソングマスター）

楽曲情報のマスターデータ。`song_id` で枠情報と結合されます。

| カラム | 説明 |
|--------|------|
| song_id | 楽曲ID（例: S0001） |
| 楽曲名 | 曲名 |
| 原曲アーティスト | 原曲のアーティスト名 |
| 作詞1 / 作詞2 | 作詞者 |
| 作曲1 / 作曲2 | 作曲者 |
| 編曲1 / 編曲2 | 編曲者 |
| リリース日 | YYYY/M/D 形式 |

## データ更新フロー

`streaminginfo_Mikage.csv` または `rkmusic_song_master.csv` を更新して `main` ブランチに push すると、GitHub Actions が自動でビルド・デプロイします。

## ローカル開発

```bash
cd web
npm install
npm run dev
```
