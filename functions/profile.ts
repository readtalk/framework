// /functions/settings.ts
export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  
  // Ambil parameter untuk diteruskan ke iframe
  const userId = url.searchParams.get('userId');
  const email = url.searchParams.get('email');
  const yourname = url.searchParams.get('yourname') || '';
  const avatar = url.searchParams.get('avatar') || '';

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
  </style>
</head>
<body>
  <!-- HEADER -->
  <div class="header">
    <a href="/profile?userId=${userId}&email=${encodeURIComponent(email)}${yourname ? `&yourname=${encodeURIComponent(yourname)}` : ''}${avatar ? `&avatar=${encodeURIComponent(avatar)}` : ''}" class="back-button">←</a>
    <h1>READTalk</h1>
  </div>

  <!-- IFRAME KE WORKERS.DEV -->
  <div class="iframe-container">
    <iframe 
      src="https://settings.readtalk.workers.dev/profile?userId=${userId}&email=${encodeURIComponent(email)}${yourname ? `&yourname=${encodeURIComponent(yourname)}` : ''}${avatar ? `&avatar=${encodeURIComponent(avatar)}` : ''}"
      allow="camera; microphone"
      sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
      id="settingsFrame">
    </iframe>
  </div>

  <div class="loading" id="loading" style="display: none;">
    Loading...
  </div>

  <script>
    // Show/hide loading
    const iframe = document.getElementById('settingsFrame');
    const loading = document.getElementById('loading');
    
    iframe.onload = () => {
      loading.style.display = 'none';
    };
    
    iframe.onloadstart = () => {
      loading.style.display = 'block';
    };

    // Terima pesan dari iframe
    window.addEventListener('message', (event) => {
      if (event.origin !== 'https://settings.readtalk.workers.dev') return;
      
      if (event.data.type === 'PROFILE_UPDATED') {
        // Redirect ke profile dengan data baru
        const { yourname, avatar } = event.data;
        window.location.href = \`/profile?userId=${userId}&email=${encodeURIComponent(email)}\${yourname ? '&yourname=' + encodeURIComponent(yourname) : ''}\${avatar ? '&avatar=' + encodeURIComponent(avatar) : ''}\`;
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
