// /functions/profile.ts
export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  
  // Ambil parameter dari URL
  const userId = url.searchParams.get('userId');
  const email = url.searchParams.get('email');

  // HTML sederhana yang menampilkan userId dan email
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>READTalk Profile</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: white;
      margin: 0;
      padding: 40px 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    .card {
      max-width: 400px;
      width: 100%;
      padding: 30px;
      border: 1px solid #eee;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    h1 {
      color: #ff0000;
      margin-bottom: 20px;
      font-size: 24px;
    }
    .info {
      margin-bottom: 15px;
      padding: 10px;
      background: #f5f5f5;
      border-radius: 8px;
    }
    .label {
      font-weight: bold;
      color: #666;
      margin-bottom: 4px;
      font-size: 12px;
    }
    .value {
      font-size: 16px;
      word-break: break-all;
    }
    .note {
      color: #999;
      font-size: 12px;
      margin-top: 20px;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>READTalk Profile</h1>
    
    <div class="info">
      <div class="label">User ID:</div>
      <div class="value">${userId || 'Tidak ada'}</div>
    </div>
    
    <div class="info">
      <div class="label">Email:</div>
      <div class="value">${email || 'Tidak ada'}</div>
    </div>
    
    <p class="note">
      Data diambil dari parameter URL: <br>
      ${url.search}
    </p>
  </div>
</body>
</html>
  `;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html;charset=UTF-8' }
  });
}
