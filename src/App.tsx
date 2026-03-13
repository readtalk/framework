import { useEffect, useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [showIframe, setShowIframe] = useState(false)
  const [iframeSrc, setIframeSrc] = useState('')

  useEffect(() => {
    // CEK LOCALSTORAGE DULU (UNTUK TAB BARU)
    const localUserId = localStorage.getItem('userId')
    const localEmail = localStorage.getItem('email')
    
    // CEK URL (UNTUK PERTAMA KALI)
    const params = new URLSearchParams(window.location.search)
    const urlUserId = params.get('userId')
    const urlEmail = params.get('email')
    
    // PRIORITAS: LOCALSTORAGE > URL
    const userId = localUserId || urlUserId
    const email = localEmail || urlEmail
    
    if (userId && email) {
      // Update localStorage dengan data dari URL (jika ada)
      if (urlUserId) localStorage.setItem('userId', urlUserId)
      if (urlEmail) localStorage.setItem('email', urlEmail)
      
      setIframeSrc(`https://settings.readtalk.workers.dev/?userId=${userId}&email=${encodeURIComponent(email)}`)
      setShowIframe(true)
    }
  }, [])

  const handleAgree = () => {
    window.location.href = 'https://auth.readtalk.workers.dev/'
  }

  // LISTENER LOGOUT DARI VITE 2
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://settings.readtalk.workers.dev') return
      
      if (event.data.type === 'LOGOUT') {
        localStorage.removeItem('userId')
        localStorage.removeItem('email')
        window.location.reload()
      }
    }
    
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

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
          border: 'none',
          zIndex: 1000,
          background: 'white'
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
          Read our <a href="#">Privacy Policies</a>. Tap "Agree and continue" 
          to accept our <a href="#">Terms of Service</a>.
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
