import { useState, useEffect } from 'react'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [showForm, setShowForm] = useState(false)
  const [userData, setUserData] = useState(null)
  const [formData, setFormData] = useState({ yourname: '', avatar: '' })

  // ===== DETEKSI PARAMETER =====
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const userId = params.get('userId')
    const email = params.get('email')
    
    if (userId && email) {
      setUserData({ userId, email })
      setShowForm(true)  // TAMPILKAN POPUP FORM
    }
  }, [])

  // ===== HANDLE SUBMIT FORM =====
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // REDIRECT KE FUNCTIONS/PROFILE.TS DENGAN DATA
    const params = new URLSearchParams({
      userId: userData.userId,
      email: userData.email,
      yourname: formData.yourname,
      avatar: formData.avatar
    })
    
    window.location.href = `/functions/profile?${params.toString()}`
  }

  return (
    <>
      {/* WELCOME SCREEN (background) */}
      <div className="whatsapp-container">
        <div className="content">
          <img src={viteLogo} className="logo" alt="Vite logo" />
          <h1>Welcome to READTalk</h1>
          <p>Read our Privacy Policies...</p>
          <button onClick={() => window.location.href = 'https://auth.readtalk.workers.dev/'}>
            Agree and continue
          </button>
        </div>
        <div className="footer">© 2026 SOEPARNO ENTERPRISE Corp.</div>
      </div>

      {/* POPUP FORM (muncul jika showForm = true) */}
      {showForm && (
        <div className="popup-form" style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <form onSubmit={handleSubmit} style={{
            background: 'white',
            padding: '40px',
            borderRadius: '16px',
            maxWidth: '400px',
            width: '90%'
          }}>
            <h2 style={{ color: '#ff0000' }}>Lengkapi Profil</h2>
            <input
              placeholder="Your name"
              value={formData.yourname}
              onChange={(e) => setFormData({...formData, yourname: e.target.value})}
              required
              style={{ width: '100%', padding: '12px', margin: '10px 0' }}
            />
            <input
              placeholder="Avatar URL (opsional)"
              value={formData.avatar}
              onChange={(e) => setFormData({...formData, avatar: e.target.value})}
              style={{ width: '100%', padding: '12px', margin: '10px 0' }}
            />
            <button type="submit" style={{
              width: '100%',
              padding: '12px',
              background: '#ff0000',
              color: 'white',
              border: 'none',
              borderRadius: '24px',
              fontWeight: 'bold'
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
