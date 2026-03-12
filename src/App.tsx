import { useState, useEffect } from 'react'
import viteLogo from '/vite.svg'
import './App.css'

// Definisikan tipe untuk userData
interface UserData {
  userId: string;
  email: string;
}

// Definisikan tipe untuk formData
interface FormData {
  yourname: string;
  avatar: string;
}

function App() {
  const [step, setStep] = useState<'welcome' | 'form' | 'chat'>('welcome')
  const [userData, setUserData] = useState<UserData | null>(null)
  const [formData, setFormData] = useState<FormData>({ yourname: '', avatar: '' })
  const [showForm, setShowForm] = useState(false)

  // ===== DETEKSI PARAMETER =====
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const userId = params.get('userId')
    const email = params.get('email')
    
    if (userId && email) {
      // ✅ Perbaiki error TS2353
      setUserData({ userId, email })
      setShowForm(true)
      setStep('form')
    }
  }, [])

  // ===== HANDLE AGREE BUTTON =====
  const handleAgree = () => {
    window.location.href = 'https://auth.readtalk.workers.dev/'
  }

  // ===== HANDLE SUBMIT FORM =====
  // ✅ Perbaiki error TS7006 - tambah tipe parameter
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // ✅ Perbaiki error TS18047 - cek userData tidak null
    if (!userData) return
    
    // Redirect ke functions/profile.ts
    const params = new URLSearchParams({
      userId: userData.userId,
      email: userData.email,
      yourname: formData.yourname,
      avatar: formData.avatar
    })
    
    window.location.href = `/profile?${params.toString()}`
  }

  return (
    <>
      {/* WELCOME SCREEN */}
      <div className="whatsapp-container" style={{ 
        display: step === 'welcome' || showForm ? 'flex' : 'none' 
      }}>
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

      {/* POPUP FORM */}
      {showForm && (
        <div className="popup-form" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <form onSubmit={handleSubmit} style={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '16px',
            maxWidth: '400px',
            width: '90%'
          }}>
            <h1 style={{ color: '#ff0000', marginBottom: '20px' }}>READTalk</h1>
            <h2 style={{ marginBottom: '30px' }}>Lengkapi Profil</h2>
            
            <input
              type="text"
              placeholder="Your name"
              value={formData.yourname}
              onChange={(e) => setFormData({...formData, yourname: e.target.value})}
              required
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '20px',
                border: '2px solid #e0e0e0',
                borderRadius: '24px',
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
                padding: '12px',
                marginBottom: '30px',
                border: '2px solid #e0e0e0',
                borderRadius: '24px',
                fontSize: '16px'
              }}
            />
            
            <button type="submit" style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#ff0000',
              color: 'white',
              border: 'none',
              borderRadius: '24px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Simpan & Lanjut
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default App
