import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const handleAgree = () => {
    // Redirect ke OpenAuth
    window.location.href = 'https://openauth.soeparnocorp.workers.dev/'
  }

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
