import { useEffect } from 'react'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  // ===== REAKSI TERHADAP PARAMETER =====
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const userId = params.get('userId')
    const email = params.get('email')
    
    // KALAU ADA PARAMETER, LANGSUNG REDIRECT KE FUNCTIONS
    if (userId && email) {
      console.log('✅ Login Success:', { userId, email })
      
      // Redirect ke /profile dengan parameter yang sama
      window.location.href = `/profile?userId=${userId}&email=${encodeURIComponent(email)}`
    }
  }, []) // ← JALAN SEKALI PAS COMPONENT MOUNT

  // ===== HANDLE AGREE BUTTON =====
  const handleAgree = () => {
    window.location.href = 'https://auth.readtalk.workers.dev/'
  }

  // ===== WELCOME SCREEN (TAMPIL KALAU TIDAK ADA PARAMETER) =====
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
