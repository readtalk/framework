import { useState, useEffect } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import PopupProfile from './popup'  // ✅ IMPORT POPUP

function App() {
  const [showPopup, setShowPopup] = useState(false)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const userId = params.get('userId')
    const email = params.get('email')
    
    if (userId && email) {
      setUserData({ userId, email })
      setShowPopup(true)  // ✅ MUNCULKAN POPUP
    }
  }, [])

  const handleAgree = () => {
    window.location.href = 'https://auth.readtalk.workers.dev/'
  }

  return (
    <>
      {/* WELCOME SCREEN (background) */}
      <div className="whatsapp-container">
        <div className="content">
          <img src={viteLogo} className="logo" alt="Vite logo" />
          <h1 className="title">Welcome to READTalk</h1>
          <p className="terms">...</p>
          <button className="agree-button" onClick={handleAgree}>
            Agree and continue
          </button>
        </div>
        <div className="footer">...</div>
      </div>

      {/* POPUP (muncul di atas) */}
      {showPopup && userData && (
        <PopupProfile 
          userId={userData.userId} 
          email={userData.email} 
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  )
}

export default App
