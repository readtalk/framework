// src/User.tsx (atau src/pages/User.tsx)

import { useEffect } from "react";
import "./User.css"; // buat file CSS terpisah di bawah

// Ganti data ini sesuai kebutuhan (atau fetch dari API nanti)
const userData = {
  username: "soeparnocorp",
  displayName: "Soeparno Enterprise",
  bio: "Digital Creator • Tech Enthusiast • Cloudflare Lover\n\nSemua link penting ada di sini 👇",
  profilePic: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // ganti foto profil kamu
  links: [
    { title: "Website Resmi", url: "https://readtalk.com", icon: "🌐" },
    { title: "X / Twitter", url: "https://x.com/soeparnocorp", icon: "🐦" },
    { title: "Instagram", url: "https://instagram.com/soeparnocorp", icon: "📸" },
    { title: "GitHub", url: "https://github.com/readtalk", icon: "🐙" },
    { title: "Cloudflare Pages", url: "https://readtalk.pages.dev", icon: "⚡" },
    { title: "Email", url: "mailto:readtalk@outlook.co.id", icon: "✉️" },
  ],
};

export default function User() {
  // Optional: set title halaman
  useEffect(() => {
    document.title = `${userData.displayName} | ${userData.username}`;
  }, []);

  return (
    <div className="user-page">
      <div className="container">
        {/* Foto profil */}
        <img src={userData.profilePic} alt={userData.displayName} className="profile-pic" />

        {/* Nama & username */}
        <h1 className="display-name">{userData.displayName}</h1>
        <p className="username">@{userData.username}</p>

        {/* Bio */}
        <p className="bio">{userData.bio}</p>

        {/* Daftar link */}
        <div className="links">
          {userData.links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-button"
            >
              <span className="link-icon">{link.icon}</span>
              {link.title}
            </a>
          ))}
        </div>

        {/* Footer kecil */}
        <footer className="footer">
          Powered by READTalk • {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
}
