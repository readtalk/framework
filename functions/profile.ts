// /functions/profile.ts
export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  
  const userId = url.searchParams.get('userId');
  const email = url.searchParams.get('email');
  const yourname = url.searchParams.get('yourname') || '';
  const avatar = url.searchParams.get('avatar') || '';
  
  const decodedEmail = email ? decodeURIComponent(email) : '';

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>READTalk Profile</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background: linear-gradient(135deg, #f5f7fa 0%, #f0f2f5 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .card {
      max-width: 500px;
      width: 100%;
      background: white;
      border-radius: 24px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .header {
      background: #ff0000;
      color: white;
      padding: 30px 20px;
      text-align: center;
      position: relative;
    }

    .header h1 {
      font-size: 28px;
      font-weight: 600;
      margin: 0;
    }

    .header p {
      font-size: 14px;
      opacity: 0.9;
      margin-top: 8px;
    }

    .menu {
      position: absolute;
      top: 20px;
      right: 20px;
    }

    .menu-button {
      background: none;
      border: none;
      color: white;
      font-size: 24px;
      cursor: pointer;
      padding: 5px 10px;
    }

    .menu-dropdown {
      position: absolute;
      top: 50px;
      right: 0;
      background: white;
      border-radius: 12px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.2);
      display: none;
      min-width: 150px;
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
    }

    .menu-item:hover {
      background: #f5f5f5;
    }

    .menu-item.logout {
      color: #ff0000;
      border-top: 1px solid #eee;
    }

    .content {
      padding: 30px 25px;
    }

    .avatar-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 30px;
    }

    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: #f0f2f5;
      border: 3px solid #ff0000;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 15px;
      overflow: hidden;
    }

    .avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .avatar .initials {
      font-size: 36px;
      color: #ff0000;
      font-weight: bold;
    }

    .info-group {
      margin-bottom: 20px;
    }

    .label {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #888;
      margin-bottom: 6px;
      font-weight: 600;
    }

    .value {
      font-size: 16px;
      color: #1a1a1a;
      background: #f8f9fa;
      padding: 12px 15px;
      border-radius: 12px;
      border-left: 4px solid #ff0000;
      word-break: break-all;
    }

    .divider {
      height: 1px;
      background: #e9ecef;
      margin: 25px 0;
    }

    .button-group {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }

    .btn {
      flex: 1;
      padding: 15px;
      border: none;
      border-radius: 30px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      text-align: center;
      transition: all 0.3s;
    }

    .btn-primary {
      background: #ff0000;
      color: white;
    }

    .btn-primary:hover {
      background: #cc0000;
    }

    .btn-secondary {
      background: #f0f2f5;
      color: #333;
    }

    .btn-secondary:hover {
      background: #e0e0e0;
    }

    .footer {
      background: #f8f9fa;
      padding: 20px;
      text-align: center;
      border-top: 1px solid #e9ecef;
    }

    .footer a {
      color: #ff0000;
      text-decoration: none;
      font-size: 14px;
    }

    .footer a:hover {
      text-decoration: underline;
    }

    .avatar-link {
      font-size: 12px;
      color: #888;
      word-break: break-all;
      margin-top: 8px;
      padding: 8px;
      background: #f5f5f5;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>READTalk Profile</h1>
      <p>Informasi akun Anda</p>
      
      <!-- MENU 3 TITIK -->
      <div class="menu">
        <button class="menu-button" onclick="toggleMenu()">⋮</button>
        <div class="menu-dropdown" id="menuDropdown">
          <a href="/settings?userId=${userId}&email=${encodeURIComponent(decodedEmail)}${yourname ? `&yourname=${encodeURIComponent(yourname)}` : ''}${avatar ? `&avatar=${encodeURIComponent(avatar)}` : ''}" class="menu-item">⚙️ Settings</a>
          <a href="/logout" class="menu-item logout">🚪 Logout</a>
        </div>
      </div>
    </div>
    
    <div class="content">
      <!-- AVATAR SECTION -->
      <div class="avatar-section">
        <div class="avatar" id="avatarContainer">
          ${avatar ? 
            `<img src="${avatar}" alt="avatar" onerror="this.style.display='none';document.getElementById('avatarInitials').style.display='flex';">` : 
            `<div class="initials" id="avatarInitials">${yourname ? yourname.charAt(0).toUpperCase() : userId?.charAt(0).toUpperCase() || '?'}</div>`
          }
        </div>
        
        ${avatar ? 
          `<div class="avatar-link">📷 ${avatar.substring(0, 30)}${avatar.length > 30 ? '...' : ''}</div>` : 
          ''
        }
      </div>

      <!-- INFO SECTIONS -->
      <div class="info-group">
        <div class="label">Your Name</div>
        <div class="value">${yourname || '-'}</div>
      </div>

      <div class="info-group">
        <div class="label">User ID</div>
        <div class="value">${userId || ''}</div>
      </div>
      
      <div class="info-group">
        <div class="label">Email</div>
        <div class="value">${decodedEmail}</div>
      </div>
      
      <div class="divider"></div>
      
      <!-- BUTTON KE SETTINGS -->
      <div class="button-group">
        <a href="/settings?userId=${userId}&email=${encodeURIComponent(decodedEmail)}${yourname ? `&yourname=${encodeURIComponent(yourname)}` : ''}${avatar ? `&avatar=${encodeURIComponent(avatar)}` : ''}" class="btn btn-primary">
          Edit Profil
        </a>
      </div>
    </div>
    
    <div class="footer">
      <a href="/">← Beranda</a>
    </div>
  </div>

  <script>
    // Toggle menu dropdown
    window.toggleMenu = function() {
      const menu = document.getElementById('menuDropdown');
      menu.classList.toggle('show');
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const menu = document.getElementById('menuDropdown');
      const button = document.querySelector('.menu-button');
      
      if (!button.contains(event.target) && !menu.contains(event.target)) {
        menu.classList.remove('show');
      }
    });

    // Handle avatar load error
    const avatarImg = document.querySelector('.avatar img');
    if (avatarImg) {
      avatarImg.onerror = function() {
        this.style.display = 'none';
        const initials = document.createElement('div');
        initials.className = 'initials';
        initials.id = 'avatarInitials';
        initials.textContent = '${yourname ? yourname.charAt(0).toUpperCase() : userId?.charAt(0).toUpperCase() || '?'}';
        document.getElementById('avatarContainer').appendChild(initials);
      };
    }
  </script>
</body>
</html>
  `;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html;charset=UTF-8' }
  });
}
