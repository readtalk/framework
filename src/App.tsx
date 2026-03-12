import { useState, useEffect } from 'react'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [step, setStep] = useState<'welcome' | 'form' | 'chat'>('welcome')
  const [userData, setUserData] = useState<{userId: string; email: string} | null>(null)
  const [formData, setFormData] = useState({ yourname: '', avatar: '' })

  // ===== DETEKSI PARAMETER DARI URL (SAAT BALIK DARI AUTH) =====
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const userId = params.get('userId')
    const email = params.get('email')
    const authentication = params.get('authentication')
    
    if (userId && email) {
      console.log('✅ Login Success:', { userId, email, authentication })
      
      // Simpan di localStorage
      localStorage.setItem('userId', userId)
      localStorage.setItem('email', email)
      
      // Simpan di state
      setUserData({ userId, email })
      
      // REAKSI: LANGSUNG PINDAH KE FORM
      setStep('form')
      
      // Bersihkan URL (opsional, biar tidak bingung)
      // window.history.replaceState({}, '', '/')
    }
  }, [])

  // ===== HANDLE AGREE BUTTON =====
  const handleAgree = () => {
    window.location.href = 'https://auth.readtalk.workers.dev/'
  }

  // ===== HANDLE SUBMIT FORM =====
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.yourname || !userData) return
    
    // Simpan data form di localStorage
    localStorage.setItem('yourname', formData.yourname)
    if (formData.avatar) localStorage.setItem('avatar', formData.avatar)
    
    // PINDAH KE CHAT (IFRAME)
    setStep('chat')
  }

  // ===== WELCOME SCREEN =====
  if (step === 'welcome') {
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

  // ===== FORM POPUP (YOURNAME + AVATAR) =====
  if (step === 'form') {
    return (
      <div className="form-container" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}>
        <form onSubmit={handleFormSubmit} style={{
          maxWidth: '400px',
          width: '100%',
          padding: '40px 20px',
          textAlign: 'center'
        }}>
          <h1 style={{ color: '#ff0000', marginBottom: '30px' }}>READTalk</h1>
          <h2 style={{ marginBottom: '30px' }}>Chooses Profil</h2>
          
          <input
            type="text"
            placeholder="Your name"
            value={formData.yourname}
            onChange={(e) => setFormData({...formData, yourname: e.target.value})}
            required
            style={{
              width: '100%',
              padding: '15px',
              marginBottom: '20px',
              border: '2px solid #e0e0e0',
              borderRadius: '30px',
              fontSize: '16px'
            }}
          />
          
          <input
            type="text"
            placeholder="Avatar URL (opsional)"
            value={formData.avatar}
            onChange={(e) => setFormData({...formData, avatar: e.target.value})}
            style={{
              width: '100%',
              padding: '15px',
              marginBottom: '30px',
              border: '2px solid #e0e0e0',
              borderRadius: '30px',
              fontSize: '16px'
            }}
          />
          
          <button type="submit" style={{
            width: '100%',
            padding: '15px',
            backgroundColor: '#ff0000',
            color: 'white',
            border: 'none',
            borderRadius: '30px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            Lanjut ke Chat
          </button>
        </form>
      </div>
    )
  }

  // ===== CHAT SCREEN (IFRAME) =====
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <iframe
        src={`https://edge.readtalk.workers.dev?userId=${userData?.userId}&email=${userData?.email}`}
        style={{
          width: '100%',
          height: '100%',
          border: 'none'
        }}
        title="READTalk Chat"
      />
      
      {/* Tombol kembali ke form (opsional) */}
      <button
        onClick={() => setStep('form')}
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          padding: '8px 16px',
          backgroundColor: '#ff0000',
          color: 'white',
          border: 'none',
          borderRadius: '20px',
          cursor: 'pointer',
          zIndex: 1000
        }}
      >
        ← Ganti Profil
      </button>
    </div>
  )
}

export default App
