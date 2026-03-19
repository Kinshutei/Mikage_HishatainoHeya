export default function ChangelogTab() {
  const entries = [
    {
      date: '2026-03-20',
      items: [
        'LiveStreamingInfoタブ＞検索フォームの改善。楽曲名または原曲アーティストで該当がないか検索するよう変更。※従来は楽曲名のみ反応。',
      ],
    },
    {
      date: '2026-03-20',
      items: [
        'LiveStreaming Info タブ › 検索フォームの改善。楽曲名または原曲アーティストで該当がないか検索するよう変更。※従来は楽曲名のみ反応。',
        'Uta-Mita DB の閲覧しやすさ更新。楽曲表に下限を設け、それ以降はスクロール方式に変更。また歌唱回数ランキングは左端の楽曲名が見切れていたため修正。リリース年度分布はツリーマップから棒グラフに変更。',
      ],
    },
    {
      date: '2026-03-19',
      items: [
        'DBの構造変更。曲マスターデータと配信枠のマスターデータを分離し、DB管理環境の改善実施。',
        'UI、原曲アーティスト様などの情報を一旦整理。本作業により一部の楽曲にて、閲覧者の方によっては「この曲の歌い手は◯◯と言うより××と表記すべきでは？」と疑念を感じる方もいるかも知れません。後日頑張りますので、現時点ではご容赦を。',
      ],
    },
    {
      date: '2026-03-13',
      items: ['サイト公開'],
    },
  ]

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', lineHeight: 1.85, color: '#c0c0c0' }}>
      <section>
        <h3 style={{ color: '#6b9fd4', fontSize: '1.1rem' }}>更新履歴</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <tbody>
            {entries.map((entry) =>
              entry.items.map((item, i) => (
                <tr key={`${entry.date}-${i}`}>
                  <td style={{
                    padding: '8px 16px 8px 0',
                    borderBottom: '1px solid #1e1e1e',
                    color: '#606060',
                    whiteSpace: 'nowrap',
                    verticalAlign: 'top',
                    width: 120,
                  }}>
                    {i === 0 ? entry.date : ''}
                  </td>
                  <td style={{
                    padding: '8px 0',
                    borderBottom: '1px solid #1e1e1e',
                    color: '#c0c0c0',
                  }}>
                    {item}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  )
}
