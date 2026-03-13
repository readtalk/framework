import { useEffect, useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [showIframe, setShowIframe] = useState(false)
  const [iframeSrc, setIframeSrc] = useState('')

  useEffect(() => {
    // 1. CEK PARAMETER DARI URL (untuk pertama kali)
    const params = new URLSearchParams(window.location.search)
    const urlUserId = params.get('userId')
    const urlEmail = params.get('email')
    
    // 2. CEK LOCALSTORAGE (untuk kunjungan berikutnya)
    const localUserId = localStorage.getItem('userId')
    const localEmail = localStorage.getItem('email')
    
    // PRIORITAS: URL > LOCALSTORAGE
    const userId = urlUserId || localUserId
    const email = urlEmail || localEmail
    
    if (userId && email) {
      // Simpan di localStorage untuk下次
      localStorage.setItem('userId', userId)
      localStorage.setItem('email', email)
      
      const src = `https://settings.readtalk.workers.dev/?userId=${userId}&email=${encodeURIComponent(email)}`
      setIframeSrc(src)
      setShowIframe(true)
    }
  }, [])

  const handleAgree = () => {
    window.location.href = 'https://auth.readtalk.workers.dev/'
  }

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
        <button className="agree-button" onClick={handleAgree}>
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
