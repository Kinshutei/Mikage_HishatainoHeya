const LILY_GROUP = `${import.meta.env.BASE_URL}spiderlily_group.png`
const LILY_LEFT  = `${import.meta.env.BASE_URL}spiderlily_left.png`

export default function Footer() {
  return (
    <>
      {/* 左端の彼岸花 */}
      <img
        src={LILY_LEFT}
        alt=""
        style={{
          position: 'fixed',
          bottom: 54,
          left: 0,
          height: 100,
          width: 'auto',
          zIndex: 9,
          pointerEvents: 'none',
        }}
      />

      {/* 彼岸花：position:fixed で直接ビューポート基準 */}
      <img
        src={LILY_GROUP}
        alt=""
        style={{
          position: 'fixed',
          bottom: 54,
          left: 0,
          width: '100vw',
          height: 'auto',
          opacity: 0.45,
          zIndex: 9,
          pointerEvents: 'none',
        }}
      />

      {/* フッターバー */}
      <footer style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 54,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgb(22, 22, 22)',
        borderTop: '1px solid rgb(34, 34, 34)',
        fontSize: 13,
        color: 'rgb(112, 112, 112)',
        letterSpacing: '0.06em',
        fontFamily: '"Noto Sans JP", sans-serif',
        zIndex: 10,
        pointerEvents: 'auto',
      }}>
        <span className="footer-full">
          © 2026{' '}
          <a href="https://x.com/WL_GE_inn" target="_blank" rel="noopener noreferrer"
            style={{ color: 'rgb(136, 136, 136)', textDecoration: 'none' }}>
            金鷲亭
          </a>
          　|　非公式ファンサイト — 深影（Mikage / RK Music）　|　掲載情報の誤りは{' '}
          <a href="https://x.com/WL_GE_inn" target="_blank" rel="noopener noreferrer"
            style={{ color: 'rgb(136, 136, 136)', textDecoration: 'none' }}>
            @WL_GE_inn
          </a>{' '}
          までお気軽にどうぞ
        </span>
        <span className="footer-short">
          © 2026 金鷲亭　|　深影（Mikage / RK Music）非公式ファンサイト
        </span>
      </footer>
    </>
  )
}
