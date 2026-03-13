// src/profile.tsx
import './App.css'  // ✅ PAKAI CSS YANG SAMA DENGAN APP.TSX!

interface ProfileProps {
  userData: {
    userId: string
    email: string
  }
}

export default function Profile({ userData }: ProfileProps) {
  return (
    <div className="whatsapp-container">  {/* PAKAI CLASS YANG SUDAH ADA */}
      <div className="content">
        <h1 className="title">READTalk Profile</h1>
        
        <div className="profile-card" style={{ marginTop: '30px' }}>
          <p><strong>User ID:</strong> {userData.userId}</p>
          <p><strong>Email:</strong> {userData.email}</p>
        </div>

        <a href="/" className="agree-button" style={{ 
          display: 'inline-block', 
          textDecoration: 'none',
          marginTop: '20px',
          maxWidth: '200px'
        }}>
          ← Kembali
        </a>
      </div>
    </div>
  )
}
