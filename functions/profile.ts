// /functions/profile.ts
export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  
  // Ambil parameter dari URL
  const userId = url.searchParams.get('userId');
  const email = url.searchParams.get('email');

  // Format email yang sudah di-decode
  const decodedEmail = email ? decodeURIComponent(email) : 'Tidak ada';

  // HTML yang lebih rapi (mirip screenshot)
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
      border-radius: 20px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .header {
      background: #ff0000;
      color: white;
      padding: 30px 20px;
      text-align: center;
    }

    .header h1 {
      font-size: 28px;
      font-weight: 600;
      margin: 0;
      letter-spacing: -0.5px;
    }

    .header p {
      font-size: 14px;
      opacity: 0.9;
      margin-top: 8px;
    }

    .content {
      padding: 30px 25px;
    }

    .info-group {
      margin-bottom: 25px;
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
      font-family: monospace;
    }

    .divider {
      height: 1px;
      background: #e9ecef;
      margin: 25px 0;
    }

    .note {
      background: #fff3f3;
      padding: 15px;
      border-radius: 12px;
      font-size: 13px;
      color: #666;
      border: 1px solid #ffe0e0;
    }

    .note strong {
      color: #ff0000;
      display: block;
      margin-bottom: 8px;
    }

    .note code {
      background: white;
      padding: 8px 12px;
      border-radius: 8px;
      display: inline-block;
      font-family: monospace;
      font-size: 12px;
      color: #333;
      border: 1px solid #ffcccc;
      margin-top: 8px;
      word-break: break-all;
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
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>READTalk Profile</h1>
      <p>Informasi akun Anda</p>
    </div>
    
    <div class="content">
      <div class="info-group">
        <div class="label">User ID</div>
        <div class="value">${userId || 'Tidak ada'}</div>
      </div>
      
      <div class="info-group">
        <div class="label">Email</div>
        <div class="value">${decodedEmail}</div>
      </div>
      
      <div class="divider"></div>
      
      <div class="note">
        <strong>📋 Parameter URL</strong>
        Data diambil dari parameter berikut:
        <code>${url.searchParams.toString()}</code>
      </div>
    </div>
    
    <div class="footer">
      <a href="/">← Back</a>
    </div>
  </div>
</body>
</html>
  `;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html;charset=UTF-8' }
  });
}
