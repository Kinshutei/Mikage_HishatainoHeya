import { useTranslation, Trans } from 'react-i18next'

export default function AboutTab() {
  const { t } = useTranslation()

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', lineHeight: 1.85, color: '#2a2a2a' }}>

      <section style={{ marginBottom: 40 }}>
        <h3>{t('about.siteTitle')}</h3>
        <p>{t('about.siteDesc1')}</p>
        <p>
          <Trans
            i18nKey="about.siteDesc2"
            components={{
              link: <a href="https://x.com/WL_GE_inn" target="_blank" rel="noopener noreferrer" />,
            }}
          />
        </p>
        <p style={{ color: '#888', fontSize: '0.9rem' }}>{t('about.siteNote')}</p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h3>{t('about.purposeTitle')}</h3>
        <p>{t('about.purposeDesc')}</p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h3>{t('about.howTitle')}</h3>
        <div style={{ display: 'grid', gap: 12 }}>
          <div style={{ background: '#f5f0e8', border: '1px solid #d8cfc4', borderRadius: 8, padding: '14px 18px' }}>
            <div style={{ fontWeight: 700, color: '#3a7a7b', marginBottom: 6, fontSize: '0.95rem' }}>
              {t('about.howStreamsTitle')}
            </div>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#555' }}>
              {t('about.howStreamsDesc')}
            </p>
          </div>
          <div style={{ background: '#f5f0e8', border: '1px solid #d8cfc4', borderRadius: 8, padding: '14px 18px' }}>
            <div style={{ fontWeight: 700, color: '#3a7a7b', marginBottom: 6, fontSize: '0.95rem' }}>
              {t('about.howSongsTitle')}
            </div>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#555' }}>
              {t('about.howSongsDesc')}
            </p>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h3>{t('about.dataTitle')}</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', color: '#2a2a2a' }}>
          <tbody>
            {([
              [t('about.dataFormat'),   t('about.dataFormatVal')],
              [t('about.dataUpdate'),   t('about.dataUpdateVal')],
              [t('about.dataCoverage'), t('about.dataCoverageVal')],
              [t('about.dataCollab'),   t('about.dataCollabVal')],
            ] as [string, string][]).map(([k, v]) => (
              <tr key={k}>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #e0eded', color: '#888', whiteSpace: 'nowrap', width: 160 }}>{k}</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #e0eded' }}>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h3>{t('about.linksTitle')}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <a href="https://www.youtube.com/@Mikage_RKMusic" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.95rem' }}>
            {t('about.linkYt')}
          </a>
          <a href="https://twitter.com/Mikage_0916" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.95rem' }}>
            {t('about.linkX')}
          </a>
        </div>
      </section>

      <section>
        <h3>{t('about.disclaimerTitle')}</h3>
        <p style={{ fontSize: '0.85rem', color: '#888', lineHeight: 1.8 }}>
          {t('about.disclaimerText')}
        </p>
      </section>

    </div>
  )
}
