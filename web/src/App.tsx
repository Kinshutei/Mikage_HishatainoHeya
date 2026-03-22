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

const BANNER_URL =
  'https://yt3.googleusercontent.com/6REyrT4s7DrjAvRL0yJUJJxi3Ahb59XtcnnDNpu7lC7sojUKthxvBIWJDVSyExFi1BOyJPzZWg' +
  '=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj'

const MIKAGE_ICON = `${import.meta.env.BASE_URL}icon_mikage.png`

type Tab = 'streams' | 'songs' | 'about' | 'changelog'

const LANGS = [
  { value: 'ja',    label: '日本語' },
  { value: 'en',    label: 'English' },
  { value: 'ko',    label: '한국어' },
  { value: 'zh-TW', label: '繁體中文' },
]

export default function App() {
  const { t, i18n } = useTranslation()
  const [records, setRecords] = useState<StreamingRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<Tab>('streams')

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

  const handleLangChange = (lang: string) => {
    setLanguage(lang)
  }

  const langSelector = (
    <div className="lang-selector">
      <select
        value={i18n.language}
        onChange={e => handleLangChange(e.target.value)}
        aria-label="Language"
      >
        {LANGS.map(l => (
          <option key={l.value} value={l.value}>{l.label}</option>
        ))}
      </select>
    </div>
  )

  return (
    <div className="app">
      {/* 言語セレクタ（デスクトップ：fixed 左上） */}
      <div className="lang-selector-desktop">
        {langSelector}
      </div>

      {/* バナー */}
      <div className="banner">
        <img src={BANNER_URL} alt="深影 バナー" />
      </div>

      {/* タブ（デスクトップ） */}
      <div className="tabs tabs-desktop">
        <button
          className={`tab-btn ${activeTab === 'streams' ? 'active' : ''}`}
          onClick={() => setActiveTab('streams')}
        >
          <img src={MIKAGE_ICON} alt="" className="tab-icon" />
          {t('tab.streams')}
        </button>
        <button
          className={`tab-btn ${activeTab === 'songs' ? 'active' : ''}`}
          onClick={() => setActiveTab('songs')}
        >
          <img src={MIKAGE_ICON} alt="" className="tab-icon" />
          {t('tab.songs')}
        </button>
        <button
          className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          <img src={MIKAGE_ICON} alt="" className="tab-icon" />
          {t('tab.about')}
        </button>
        <button
          className={`tab-btn ${activeTab === 'changelog' ? 'active' : ''}`}
          onClick={() => setActiveTab('changelog')}
        >
          <img src={MIKAGE_ICON} alt="" className="tab-icon" />
          {t('tab.changelog')}
        </button>
      </div>

      {/* タブ（モバイル：プルダウン） */}
      <div className="tabs tabs-mobile">
        <div className="mobile-tab-select">
          <span className="select-arrow">▼</span>
          <select
            value={activeTab}
            onChange={e => setActiveTab(e.target.value as Tab)}
          >
            <option value="streams">{t('tab.streams')}</option>
            <option value="songs">{t('tab.songs')}</option>
            <option value="about">{t('tab.about')}</option>
            <option value="changelog">{t('tab.changelog')}</option>
          </select>
        </div>
        {/* 言語セレクタ（モバイル：プルダウン右隣） */}
        {langSelector}
      </div>

      {/* コンテンツ */}
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
  )
}
