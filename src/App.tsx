import { useState } from 'react';
import AuthPopup from './auth';
import { useLocale } from './contexts/LocaleContext';
import { languages } from './language';
import './App.css';

function App() {
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const { t, locale, setLocale } = useLocale();

  return (
    <>
      {/* Language Popup */}
      {showLanguagePopup && (
        <div className="popup-overlay" onClick={() => setShowLanguagePopup(false)}>
          <div className="popup-language" onClick={(e) => e.stopPropagation()}>
            <h2>{t('language')}</h2>
            <div className="language-list">
              {languages.map((lang) => (
                <div
                  key={lang.code}
                  className={`language-item ${locale === lang.code ? 'active' : ''}`}
                  onClick={() => {
                    setLocale(lang.code as any);
                    setShowLanguagePopup(false);
                  }}
                >
                  {lang.nativeName}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Auth Popup (1 popup untuk semua) */}
      <AuthPopup
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onSuccess={() => {
          // Redirect ke dashboard setelah login sukses
          window.location.href = '/dashboard';
        }}
      />

      {/* Main Content */}
      <div className="container">
        <h1>{t('welcome')}</h1>

        <p className="terms-text">
          {t('terms', { privacy: t('privacy'), terms: t('terms_of_service') })}
        </p>

        <div
          className="language-selector"
          onClick={() => setShowLanguagePopup(true)}
        >
          {languages.find(l => l.code === locale)?.nativeName} ▼
        </div>

        <button
          className="agree-button"
          onClick={() => setShowAuth(true)}
        >
          {t('agree')}
        </button>

        <p className="footer">{t('footer')}</p>
      </div>
    </>
  );
}

export default App;
