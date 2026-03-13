// src/profile.tsx
interface ProfileProps {
  userData: {
    userId: string
    email: string
  }
}

export default function Profile({ userData }: ProfileProps) {
  return (
    <div style={{
      padding: '40px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>READTalk Profile</h1>
      <p>User ID: {userData.userId}</p>
      <p>Email: {userData.email}</p>
    </div>
  )
}
