// /functions/profile.ts
export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  
  // Data user SAAT INI (yang login)
  const currentUserId = url.searchParams.get('userId');
  const currentEmail = url.searchParams.get('email');
  const currentName = url.searchParams.get('yourname') || '';
  const currentAvatar = url.searchParams.get('avatar') || '';
  
  const decodedEmail = currentEmail ? decodeURIComponent(currentEmail) : '';

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>READTalk</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background: #f0f2f5;
      height: 100vh;
      overflow: hidden;
    }

    .header {
      background: #ff0000;
      color: white;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
    }

    .back-button {
      background: none;
      border: none;
      color: white;
      font-size: 24px;
      cursor: pointer;
      padding: 8px;
      line-height: 1;
      text-decoration: none;
    }

    .back-button:hover {
      background: rgba(255,255,255,0.2);
      border-radius: 50%;
    }

    .header h1 {
      font-size: 20px;
      font-weight: 600;
      flex: 1;
    }

    .header-info {
      font-size: 14px;
      opacity: 0.9;
      margin-right: 10px;
    }

    .menu {
      position: relative;
    }

    .menu-button {
      background: none;
      border: none;
      color: white;
      font-size: 24px;
      cursor: pointer;
      padding: 8px;
      line-height: 1;
    }

    .menu-button:hover {
      background: rgba(255,255,255,0.2);
      border-radius: 50%;
    }

    .menu-dropdown {
      position: absolute;
      top: 50px;
      right: 0;
      background: white;
      border-radius: 12px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.2);
      display: none;
      min-width: 200px;
      z-index: 200;
    }

    .menu-dropdown.show {
      display: block;
    }

    .menu-item {
      padding: 12px 20px;
      color: #333;
      text-decoration: none;
      display: block;
      font-size: 14px;
      cursor: pointer;
      border: none;
      background: none;
      width: 100%;
      text-align: left;
    }

    .menu-item:hover {
      background: #f5f5f5;
    }

    .menu-divider {
      height: 1px;
      background: #eee;
      margin: 8px 0;
    }

    .iframe-container {
      margin-top: 60px;
      height: calc(100vh - 60px);
      width: 100%;
    }

    iframe {
      width: 100%;
      height: 100%;
      border: none;
    }

    .loading {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      z-index: 1000;
    }

    .badge {
      background: rgba(255,255,255,0.2);
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 12px;
      margin-left: 10px;
    }
  </style>
</head>
<body>
  <!-- HEADER PENGENDALI UNTUK USER SAAT INI -->
  <div class="header">
    <a href="" class="back-button"></a>
    <h1>READTalk</h1>
    <span class="header-info">${currentName || decodedEmail.split('@')[0]}</span>
    <span class="badge">ID: ${currentUserId.substring(0, 6)}...</span>
    
    <!-- MENU 3 TITIK (PERINTAH KE VITE 2) -->
    <div class="menu">
      <button class="menu-button" onclick="toggleMenu()">⋮</button>
      <div class="menu-dropdown" id="menuDropdown">
        <button class="menu-item" onclick="sendToVite2('REFRESH_CONTACTS')">🔄 Refresh Kontak</button>
        <button class="menu-item" onclick="sendToVite2('NEW_CHAT')">💬 Chat Baru</button>
        <button class="menu-item" onclick="sendToVite2('CREATE_GROUP')">👥 Buat Grup</button>
        <div class="menu-divider"></div>
        <button class="menu-item" onclick="sendToVite2('EDIT_PROFILE')">⚙️ Edit Profil Saya</button>
        <button class="menu-item" onclick="sendToVite2('SETTINGS')">🔧 Pengaturan</button>
        <div class="menu-divider"></div>
        <button class="menu-item" onclick="logout()" style="color: #ff0000;">🚪 Logout</button>
      </div>
    </div>
  </div>

  <!-- IFRAME KE VITE 2 (EKSEKUTOR) -->
  <div class="iframe-container">
    <iframe 
      src="https://state.readtalk.workers.dev/profile?userId=${currentUserId}&email=${encodeURIComponent(decodedEmail)}${currentName ? `&yourname=${encodeURIComponent(currentName)}` : ''}${currentAvatar ? `&avatar=${encodeURIComponent(currentAvatar)}` : ''}"
      allow="camera; microphone"
      sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
      id="vite2Frame">
    </iframe>
  </div>

  <div class="loading" id="loading" style="display: none;">
    Loading Vite 2...
  </div>

  <script>
    const iframe = document.getElementById('vite2Frame');
    const loading = document.getElementById('loading');
    
    // Toggle menu 3 titik
    window.toggleMenu = function() {
      const menu = document.getElementById('menuDropdown');
      menu.classList.toggle('show');
    };

    // Tutup menu jika klik di luar
    document.addEventListener('click', function(event) {
      const menu = document.getElementById('menuDropdown');
      const button = document.querySelector('.menu-button');
      
      if (!button.contains(event.target) && !menu.contains(event.target)) {
        menu.classList.remove('show');
      }
    });

    // Kirim perintah ke Vite 2 (eksekutor)
    window.sendToVite2 = function(command, data = {}) {
      console.log('📤 Mengirim perintah ke Vite 2:', command, data);
      iframe.contentWindow.postMessage({
        type: 'HEADER_COMMAND',
        command,
        userId: '${currentUserId}',
        email: '${decodedEmail}',
        ...data
      }, 'https://settings.readtalk.workers.dev');
      
      // Tutup menu setelah kirim perintah
      document.getElementById('menuDropdown').classList.remove('show');
    };

    // Logout
    window.logout = function() {
      // Hapus localStorage, cookie, dll
      window.location.href = '/logout';
    };

    // Iframe events
    iframe.onload = () => {
      loading.style.display = 'none';
      console.log('✅ Vite 2 siap menerima perintah');
      
      // Kirim data user saat ini ke Vite 2
      sendToVite2('INIT', {
        yourname: '${currentName}',
        avatar: '${currentAvatar}'
      });
    };
    
    iframe.onloadstart = () => {
      loading.style.display = 'block';
    };

    // Terima pesan dari Vite 2
    window.addEventListener('message', (event) => {
      if (event.origin !== 'https://state.readtalk.workers.dev') return;
      
      console.log('📨 Pesan dari Vite 2:', event.data);
      
      if (event.data.type === 'CONTACT_SELECTED') {
        // User memilih kontak dari daftar
        const { targetUserId, targetEmail } = event.data;
        window.location.href = \`/chat?myId=${currentUserId}&targetId=\${targetUserId}\`;
      }
      
      if (event.data.type === 'RESEND_LIST') {
        // Update jumlah kontak di header
        const count = event.data.count;
        // Bisa update badge
      }
      
      if (event.data.type === 'OPEN_SETTINGS') {
        // Buka settings untuk user tertentu
        window.location.href = \`/settings?userId=\${event.data.userId}&email=\${encodeURIComponent(event.data.email)}\`;
      }
    });
  </script>
</body>
</html>
  `;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html;charset=UTF-8' }
  });
}
