import { useTranslation } from 'react-i18next'

interface ChangelogEntry {
  date: string
  items: string[]
}

export default function ChangelogTab() {
  const { t } = useTranslation()
  const entries = t('changelog.entries', { returnObjects: true }) as ChangelogEntry[]

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', lineHeight: 1.85, color: '#2a2a2a' }}>
      <section>
        <h3 style={{ color: '#3a6a6b', fontSize: '1.1rem' }}>{t('changelog.title')}</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <tbody>
            {entries.map((entry) =>
              entry.items.map((item, i) => (
                <tr key={`${entry.date}-${i}`}>
                  <td style={{
                    padding: '8px 16px 8px 0',
                    borderBottom: '1px solid #cce0e0',
                    color: '#5a8a8b',
                    whiteSpace: 'nowrap',
                    verticalAlign: 'top',
                    width: 120,
                  }}>
                    {i === 0 ? entry.date : ''}
                  </td>
                  <td style={{
                    padding: '8px 0',
                    borderBottom: '1px solid #cce0e0',
                    color: '#2a2a2a',
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
