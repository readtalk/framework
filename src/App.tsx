// src/App.tsx (VITE 1 - readtalk.pages.dev)
import { useEffect, useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [showIframe, setShowIframe] = useState(false)
  const [iframeSrc, setIframeSrc] = useState('')
  const [isLoading, setIsLoading] = useState(true)  // ← TAMBAH LOADING

  useEffect(() => {
    // CEK DATA USER
    const localUserId = localStorage.getItem('userId')
    const localEmail = localStorage.getItem('email')
    
    const params = new URLSearchParams(window.location.search)
    const urlUserId = params.get('userId')
    const urlEmail = params.get('email')
    
    const userId = localUserId || urlUserId
    const email = localEmail || urlEmail
    
    if (userId && email) {
      if (urlUserId) localStorage.setItem('userId', urlUserId)
      if (urlEmail) localStorage.setItem('email', urlEmail)
      
      setIframeSrc(`https://settings.readtalk.workers.dev/?userId=${userId}&email=${encodeURIComponent(email)}`)
      setShowIframe(true)
    }
    
    // LOADING SELESAI
    setIsLoading(false)
  }, [])

  const handleAgree = () => {
    window.location.href = 'https://auth.readtalk.workers.dev/'
  }

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

  // LOADING SCREEN (biar tidak keliatan welcome)
  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div className="spinner"></div>
      </div>
    )
  }

  // KALAU ADA IFRAME, TAMPILKAN LANGSUNG (TANPA WELCOME)
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

  // WELCOME SCREEN (hanya untuk user yang belum login)
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
