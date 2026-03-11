import { useState } from 'react'
import viteLogo from '/vite.svg'
import { languages } from './language'
import './App.css'

function App() {
  const [showLanguagePopup, setShowLanguagePopup] = useState(false)
  const [showAuthPopup, setShowAuthPopup] = useState(false)

  return (
    <>
      {/* Language PopUp */}
      {showLanguagePopup && (
        <div className="popup-overlay" onClick={() => setShowLanguagePopup(false)}>
          <div className="popup-language" onClick={(e) => e.stopPropagation()}>
            <h2>Language</h2>
            <div className="language-list">
              {languages.map((lang) => (
                <div key={lang.code} className="language-item">
                  {lang.nativeName}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Auth PopUp */}
      {showAuthPopup && (
        <div className="popup-overlay" onClick={() => setShowAuthPopup(false)}>
          <div className="popup-auth" onClick={(e) => e.stopPropagation()}>
            <button 
              className="close-button"
              onClick={() => setShowAuthPopup(false)}
            >
              ←
            </button>
            <iframe
              src="https://auth.readtalk.workers.dev"
              className="auth-iframe"
              title="Authentication"
            />
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="container">
        <img src={viteLogo} className="logo" alt="Vite logo" />
        
        <h1>Welcome to READTalk</h1>
        
        <p className="terms-text">
          Read our <a href="#">Privacy Policies</a>. Tap "Agree and continue" to accept our <a href="#">Terms of Service</a>.
        </p>

        <div 
          className="language-selector"
          onClick={() => setShowLanguagePopup(true)}
        >
          English ▼
        </div>

        <button 
          className="agree-button"
          onClick={() => setShowAuthPopup(true)}
        >
          Agree and continue
        </button>

        <p className="footer">© 2026 SOEPARNO ENTERPRISE Corp.</p>
      </div>
    </>
  )
}

export default App
