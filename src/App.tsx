import { useEffect, useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import Profile from './profile'

function App() {
  const [showProfile, setShowProfile] = useState(false)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const userId = params.get('userId')
    const email = params.get('email')
    
    if (userId && email) {
      localStorage.setItem('userId', userId)
      localStorage.setItem('email', email)
      setUserData({ userId, email })
      setShowProfile(true)
    }
  }, [])

  const handleAgree = () => {
    window.location.href = 'https://auth.readtalk.workers.dev/'
  }

  if (showProfile && userData) {
    return <Profile userData={userData} />
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
