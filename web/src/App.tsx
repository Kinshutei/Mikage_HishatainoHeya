import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { StreamingRecord } from './types'
import { parseCSV, parseSongMaster } from './utils/csv'
import { setLanguage } from './i18n'
import StreamsTab from './components/StreamsTab'
import SongsTab from './components/SongsTab'
import AboutTab from './components/AboutTab'
import ChangelogTab from './components/ChangelogTab'
import Footer from './components/Footer'
import './App.css'

const STREAMING_CSV_URL =
  import.meta.env.VITE_CSV_URL ??
  'https://raw.githubusercontent.com/Kinshutei/Mikage_HishatainoHeya/main/streaminginfo_Mikage.csv'

const SONG_MASTER_URL =
  import.meta.env.VITE_MASTER_URL ??
  'https://raw.githubusercontent.com/Kinshutei/Mikage_HishatainoHeya/main/rkmusic_song_master.csv'

const BG_URL = `${import.meta.env.BASE_URL}background_0.png`

type Tab = 'streams' | 'songs' | 'about' | 'changelog'

const LANGS = [
  { value: 'ja',    label: '日本語' },
  { value: 'en',    label: 'English' },
  { value: 'ko',    label: '한국어' },
  { value: 'zh-TW', label: '繁體中文' },
]

export default function App() {
  const { t } = useTranslation()
  const [records, setRecords] = useState<StreamingRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<Tab>('streams')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    document.body.style.backgroundImage = `url(${BG_URL})`
    document.body.style.backgroundRepeat = 'repeat'
    return () => {
      document.body.style.backgroundImage = ''
      document.body.style.backgroundRepeat = ''
    }
  }, [])

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [masterRes, streamRes] = await Promise.all([
          fetch(SONG_MASTER_URL),
          fetch(STREAMING_CSV_URL),
        ])

        if (!masterRes.ok) throw new Error(`song_master HTTP ${masterRes.status}`)
        if (!streamRes.ok) throw new Error(`streaming_info HTTP ${streamRes.status}`)

        const [masterText, streamText] = await Promise.all([
          masterRes.text(),
          streamRes.text(),
        ])

        const masterMap = parseSongMaster(masterText)
        const parsed = parseCSV(streamText, masterMap)
        setRecords(parsed)
      } catch (e: unknown) {
        setError(String(e))
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
  }, [])

  const [selectedLang, setSelectedLang] = useState<string>(
    () => {
      const stored = localStorage.getItem('lang') ?? ''
      return LANGS.some(l => l.value === stored) ? stored : ''
    }
  )

  const handleNavClick = (tab: Tab) => {
    setActiveTab(tab)
    setSidebarOpen(false)
  }

  return (
    <>
      {/* 言語セレクタ：右上固定 */}
      <div className="lang-selector-topright">
        <div className="lang-selector">
          <select
            value={selectedLang}
            onChange={e => {
              setSelectedLang(e.target.value)
              setLanguage(e.target.value)
            }}
            aria-label="Language"
          >
            <option value="" disabled>Language</option>
            {LANGS.map(l => (
              <option key={l.value} value={l.value}>{l.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* サイドバー */}
      <aside className={`sidebar${sidebarOpen ? ' sidebar-open' : ''}`}>
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(o => !o)}
          aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
        >
          <span>ME</span>
          <span>NU</span>
        </button>
        <nav className="sidebar-nav">
          <button
            className={`sidebar-nav-btn${activeTab === 'streams' ? ' active' : ''}`}
            onClick={() => handleNavClick('streams')}
          >
            <span className="sidebar-nav-text">{t('tab.streams')}</span>
          </button>
          <button
            className={`sidebar-nav-btn${activeTab === 'songs' ? ' active' : ''}`}
            onClick={() => handleNavClick('songs')}
          >
            <span className="sidebar-nav-text">{t('tab.songs')}</span>
          </button>
          <button
            className={`sidebar-nav-btn${activeTab === 'about' ? ' active' : ''}`}
            onClick={() => handleNavClick('about')}
          >
            <span className="sidebar-nav-text">{t('tab.about')}</span>
          </button>
          <button
            className={`sidebar-nav-btn${activeTab === 'changelog' ? ' active' : ''}`}
            onClick={() => handleNavClick('changelog')}
          >
            <span className="sidebar-nav-text">{t('tab.changelog')}</span>
          </button>
        </nav>
      </aside>

      {/* メインコンテンツ */}
      <div className={`main-wrapper${sidebarOpen ? ' sidebar-open' : ''}`}>
        <div className="content">
          {activeTab === 'about' ? (
            <AboutTab />
          ) : activeTab === 'changelog' ? (
            <ChangelogTab />
          ) : (
            <>
              {loading && <p style={{ color: '#888' }}>{t('loading')}</p>}
              {error && <p style={{ color: '#c00' }}>{t('error', { error })}</p>}
              {!loading && !error && (
                <>
                  {activeTab === 'streams' && <StreamsTab records={records} />}
                  {activeTab === 'songs' && <SongsTab records={records} />}
                </>
              )}
            </>
          )}
        </div>
        <Footer />
      </div>
    </>
  )
}
