import { useEffect, useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [showIframe, setShowIframe] = useState(false)
  const [iframeSrc, setIframeSrc] = useState('')

  // ===== CEK PARAMETER DARI AUTH =====
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const userId = params.get('userId')
    const email = params.get('email')
    
    if (userId && email) {
      // Simpan di localStorage (opsional)
      localStorage.setItem('userId', userId)
      localStorage.setItem('email', email)
      
      // Bikin URL untuk iframe
      const src = `https://settings.readtalk.workers.dev/?userId=${userId}&email=${encodeURIComponent(email)}`
      setIframeSrc(src)
      setShowIframe(true)
    }
  }, [])

  const handleAgree = () => {
    window.location.href = 'https://auth.readtalk.workers.dev/'
  }

  // KALAU ADA PARAMETER, TAMPILKAN IFRAME FULLSCREEN
  if (showIframe) {
    return (
      <iframe
        src={iframeSrc}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none'
        }}
        title="READTalk Settings"
      />
    )
  }

  // WELCOME SCREEN (default)
  return (
    <div className="whatsapp-container">
      <div className="content">
        <img src={viteLogo} className="logo" alt="Vite logo" />
        
        <h1 className="title">Welcome to READTalk</h1>
        
        <p className="terms">
          Read our <a href="https://readtalk.pages.dev/">Privacy Policies</a>. Tap "Agree and continue" 
          to accept our <a href="https://readtalk.pages.dev/">Terms of Service</a>.
        </p>

        <div className="language-selector">
          <span>English ▼</span>
        </div>

        <button 
          className="agree-button"
          onClick={handleAgree}
        >
          Agree and continue
        </button>
      </div>

      <div className="footer">
        <p>© 2026 SOEPARNO ENTERPRISE Corp.</p>
      </div>
    </div>
  )
}

export default App
