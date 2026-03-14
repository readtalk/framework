// src/App.tsx - readtalk.pages.dev
import { useEffect, useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [showIframe, setShowIframe] = useState(false)
  const [iframeSrc, setIframeSrc] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [loadingMessage, setLoadingMessage] = useState('Menyiapkan READTalk...')

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
      
      setLoadingMessage('Mengalihkan ke READTalk...')
      setIframeSrc(`https://settings.readtalk.workers.dev/?userId=${userId}&email=${encodeURIComponent(email)}`)
      
      // Beri sedikit delay agar loading terlihat
      setTimeout(() => {
        setShowIframe(true)
        setIsLoading(false)
      }, 800)
    } else {
      // TIDAK ADA USER, LANGSUNG KE WELCOME
      setIsLoading(false)
    }
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

  // LOADING SCREEN DENGAN ANIMASI
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <img src={viteLogo} className="loading-logo" alt="Vite logo" />
          <h1 className="loading-title">READTalk</h1>
          <div className="spinner"></div>
          <p className="loading-message">{loadingMessage}</p>
        </div>
      </div>
    )
  }

  // KALAU ADA IFRAME, TAMPILKAN LANGSUNG
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

  // WELCOME SCREEN
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
