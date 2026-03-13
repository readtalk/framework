import { useState } from 'react';
import { login, register, forgotPassword } from '../services/authApi';
import PopupLayout from './ui/PopupLayout';

type AuthMode = 'login' | 'register' | 'forgot';

interface AuthPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AuthPopup({ isOpen, onClose, onSuccess }: AuthPopupProps) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await login(email, password);
        onSuccess();
        onClose();
      } 
      else if (mode === 'register') {
        await register(email, password, name);
        setMessage('Registrasi berhasil! Silakan login.');
        setMode('login');
        setPassword('');
      } 
      else if (mode === 'forgot') {
        await forgotPassword(email);
        setMessage('Email reset password telah dikirim. Cek inbox Anda.');
        setTimeout(() => {
          setMode('login');
          setMessage('');
        }, 3000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    switch (mode) {
      case 'login': return 'Login';
      case 'register': return 'Daftar Akun Baru';
      case 'forgot': return 'Lupa Password';
    }
  };

  return (
    <PopupLayout position="right" onClose={onClose}>
      <div style={{ padding: '24px', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', marginRight: '16px' }}
          >
            ←
          </button>
          <h2 style={{ margin: 0 }}>{getTitle()}</h2>
        </div>

        {/* Error / Success Message */}
        {error && (
          <div style={{ 
            background: '#ffebee', 
            color: '#c62828', 
            padding: '12px', 
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            {error}
          </div>
        )}

        {message && (
          <div style={{ 
            background: '#e8f5e9', 
            color: '#2e7d32', 
            padding: '12px', 
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ flex: 1 }}>
          {/* Email (semua mode) */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500 }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
          </div>

          {/* Password (login & register) */}
          {mode !== 'forgot' && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500 }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={mode !== 'forgot'}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              />
            </div>
          )}

          {/* Nama (register only) */}
          {mode === 'register' && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500 }}>Nama Lengkap</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: '#25D366',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '20px'
            }}
          >
            {loading ? 'Memproses...' : mode === 'login' ? 'Login' : mode === 'register' ? 'Daftar' : 'Kirim Reset Password'}
          </button>
        </form>

        {/* Navigation Links */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          {mode === 'login' && (
            <>
              <button
                onClick={() => { setMode('register'); setError(''); setMessage(''); }}
                style={{ background: 'none', border: 'none', color: '#25D366', cursor: 'pointer', marginRight: '16px' }}
              >
                Daftar
              </button>
              <button
                onClick={() => { setMode('forgot'); setError(''); setMessage(''); }}
                style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}
              >
                Lupa Password?
              </button>
            </>
          )}

          {mode === 'register' && (
            <button
              onClick={() => { setMode('login'); setError(''); setMessage(''); }}
              style={{ background: 'none', border: 'none', color: '#25D366', cursor: 'pointer' }}
            >
              Sudah punya akun? Login
            </button>
          )}

          {mode === 'forgot' && (
            <button
              onClick={() => { setMode('login'); setError(''); setMessage(''); }}
              style={{ background: 'none', border: 'none', color: '#25D366', cursor: 'pointer' }}
            >
              Kembali ke Login
            </button>
          )}
        </div>
      </div>
    </PopupLayout>
  );
}
