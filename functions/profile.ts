// /functions/profile.ts
export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  
  // Ambil parameter dari URL (dikirim dari App.tsx setelah form)
  const userId = url.searchParams.get('userId');
  const email = url.searchParams.get('email');
  const yourname = url.searchParams.get('yourname');
  const avatar = url.searchParams.get('avatar');

  // Validasi parameter wajib
  if (!userId || !email || !yourname) {
    return new Response(JSON.stringify({ 
      error: 'Missing required parameters' 
    }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // SET COOKIE / HEADER (untuk localStorage di browser)
  const headers = new Headers();
  
  // Cookie untuk autentikasi (HttpOnly = tidak bisa diakses JS)
  headers.append('Set-Cookie', `userId=${userId}; Path=/; HttpOnly; Secure; Max-Age=2592000; SameSite=Lax`);
  headers.append('Set-Cookie', `email=${encodeURIComponent(email)}; Path=/; HttpOnly; Secure; Max-Age=2592000; SameSite=Lax`);
  
  // Cookie untuk data profil (bisa diakses JS)
  headers.append('Set-Cookie', `yourname=${encodeURIComponent(yourname)}; Path=/; Secure; Max-Age=2592000; SameSite=Lax`);
  
  if (avatar) {
    headers.append('Set-Cookie', `avatar=${encodeURIComponent(avatar)}; Path=/; Secure; Max-Age=2592000; SameSite=Lax`);
  }

  // Opsional: Simpan juga di Cloudflare KV (untuk akses antar worker)
  if (context.env && context.env.PAGES_KV) {
    await context.env.PAGES_KV.put(`user:${userId}`, JSON.stringify({
      userId,
      email,
      yourname,
      avatar: avatar || '',
      lastLogin: Date.now()
    }), {
      expirationTtl: 60 * 60 * 24 * 30 // 30 hari
    });
  }

  // Redirect ke halaman chat (dengan iframe)
  return new Response(null, {
    status: 302,
    headers: {
      ...headers,
      'Location': '/chat'  // Halaman yang berisi iframe
    }
  });
}
