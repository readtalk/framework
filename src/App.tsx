import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import { renderProfile } from './profile'  // ✅ IMPORT dari .ts

function App() {
  // CEK PARAMETER DI URL
  const params = new URLSearchParams(window.location.search)
  const userId = params.get('userId')
  const email = params.get('email')

  // KALAU ADA PARAMETER, TAMPILKAN PROFILE
  if (userId && email) {
    return renderProfile({ userId, email })  // ✅ PANGGIL FUNCTION
  }

  // KALAU TIDAK, TAMPILKAN WELCOME
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
        <button className="agree-button" onClick={() => window.location.href = 'https://auth.readtalk.workers.dev/'}>
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
