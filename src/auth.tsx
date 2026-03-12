// AuthPage.jsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect beneran ke auth eksternal
    window.location.href = 'https://auth.readtalk.workers.dev/'
  }, [])

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <p>Login...</p>
    </div>
  )
}

export default AuthPage
