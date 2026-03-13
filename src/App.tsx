// App.tsx - tambah listener untuk logout dari iframe
import { useEffect, useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [showIframe, setShowIframe] = useState(false)
  const [iframeSrc, setIframeSrc] = useState('')

  // ===== CEK PARAMETER & LOCALSTORAGE =====
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlUserId = params.get('userId')
    const urlEmail = params.get('email')
    
    const localUserId = localStorage.getItem('userId')
    const localEmail = localStorage.getItem('email')
    
    const userId = urlUserId || localUserId
    const email = urlEmail || localEmail
    
    if (userId && email) {
      localStorage.setItem('userId', userId)
      localStorage.setItem('email', email)
      
      // Bersihkan URL
      window.history.replaceState({}, '', '/')
      
      const src = `https://settings.readtalk.workers.dev/?userId=${userId}&email=${encodeURIComponent(email)}`
      setIframeSrc(src)
      setShowIframe(true)
    }
  }, [])

  // ===== LISTENER LOGOUT DARI IFRAME =====
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== 'https://settings.readtalk.workers.dev') return
      
      if (event.data.type === 'LOGOUT') {
        // Hapus localStorage
        localStorage.removeItem('userId')
        localStorage.removeItem('email')
        localStorage.removeItem('username')
        
        // Reload halaman (kembali ke welcome screen)
        window.location.href = '/'
      }
    }
    
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
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
