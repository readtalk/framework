import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import viteLogo from '/vite.svg'
import './App.css'

function HomePage() {
  const navigate = useNavigate()

  const handleAgree = () => {
    // Pake navigate biar gak reload
    navigate('/auth')
  }

  return (
    <>
      <div>
        <a href="#" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      
      <div className="content-wrapper">
        <h1>Welcome to READTalk</h1>
        
        <p className="terms-text">
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

        <p className="read-the-docs">
          © 2026 SOEPARNO ENTERPRISE Corp.
        </p>
      </div>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        {/* Nanti auth redirect balik ke / dengan parameter */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
