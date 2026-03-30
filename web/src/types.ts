export interface SongMaster {
  song_id: string
  楽曲名: string
  原曲アーティスト: string
  作詞1: string
  作詞2: string
  作曲1: string
  作曲2: string
  編曲1: string
  編曲2: string
  リリース日: string
}

export interface StreamingRecord {
  枠名: string
  song_id: string
  補足情報: string
  楽曲名: string
  歌唱順: number
  配信日: string
  枠URL: string
  コラボ相手様: string
  キー: string
  // マスターから JOIN されるフィールド
  原曲Artist: string
  作詞1: string
  作詞2: string
  作曲1: string
  作曲2: string
  編曲1: string
  編曲2: string
  リリース日: string
}

export interface StreamInfo {
  枠名: string
  配信日: string
  枠URL: string
}

export interface SongStat {
  楽曲名: string
  原曲アーティスト: string
  作詞1: string
  作詞2: string
  作曲1: string
  作曲2: string
  編曲1: string
  編曲2: string
  リリース日: string
  リリース年: string
  歌唱回数: number
}
