import { useEffect, useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [showIframe, setShowIframe] = useState(false)
  const [iframeSrc, setIframeSrc] = useState('')

  // ===== CEK PARAMETER DARI URL =====
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const userId = params.get('userId')
    const email = params.get('email')
    
    if (userId && email) {
      // Simpan di localStorage (untuk下次)
      localStorage.setItem('userId', userId)
      localStorage.setItem('email', email)
      
      // ✅ JANGAN BERSIHKAN URL!
      // Biarkan parameter tetap ada di URL
      
      // Set iframe
      setIframeSrc(`https://settings.readtalk.workers.dev/?userId=${userId}&email=${encodeURIComponent(email)}`)
      setShowIframe(true)
    }
  }, [])

  const handleAgree = () => {
    window.location.href = 'https://auth.readtalk.workers.dev/'
  }

  // ===== LISTENER LOGOUT DARI IFRAME =====
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== 'https://settings.readtalk.workers.dev') return
      
      if (event.data.type === 'LOGOUT') {
        // Hapus localStorage
        localStorage.removeItem('userId')
        localStorage.removeItem('email')
        
        // ✅ RELOAD DENGAN PARAMETER MASIH ADA
        // Tapi karena localStorage udah kosong, 
        // useEffect akan tetap detek parameter, tapi kita harus cegah login ulang
        window.location.reload()
      }
    }
    
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  // KALAU ADA IFRAME, TAMPILKAN (WELCOME SCREEN TETAP ADA DI BELAKANG)
  if (showIframe) {
    return (
      <>
        {/* WELCOME SCREEN (background) - bisa dikasih opacity atau hidden */}
        <div style={{ display: 'none' }}>
          <div className="whatsapp-container">
            <div className="content">
              <img src={viteLogo} className="logo" alt="Vite logo" />
              <h1 className="title">Welcome to READTalk</h1>
              <p className="terms">...</p>
              <button className="agree-button">Agree and continue</button>
            </div>
          </div>
        </div>
        
        {/* IFRAME FULLSCREEN */}
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
      </>
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
