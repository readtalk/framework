// functions/[[username]].ts
import type { PagesFunction } from "@cloudflare/workers-types";

export const onRequest: PagesFunction = async (context) => {
  const username = context.params?.username as string | undefined;

  if (!username) {
    return new Response("Username tidak ditemukan", { status: 404 });
  }

  // Bersihkan @ kalau ada
  const cleanUsername = username.startsWith("@") ? username.slice(1) : username;

  // Contoh: fetch data user dari KV, D1, atau DO
  // Misal pakai KV (ganti dengan KV binding kamu)
  const userData = await context.env.USER_KV.get(cleanUsername);

  if (!userData) {
    return new Response(`User @${cleanUsername} tidak ditemukan`, { status: 404 });
  }

  const data = JSON.parse(userData);

  // Render halaman Linktree-style (HTML sederhana atau React SSR kalau mau)
  const html = `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>${data.displayName} | @${cleanUsername}</title>
      <link rel="stylesheet" href="/styles.css" /> <!-- kalau ada CSS terpisah -->
    </head>
    <body>
      <div class="container">
        <img src="${data.profilePic}" alt="${data.displayName}" class="profile-pic" />
        <h1>${data.displayName}</h1>
        <p>@${cleanUsername}</p>
        <p class="bio">${data.bio.replace(/\n/g, "<br>")}</p>

        <div class="links">
          ${data.links.map((link: any) => `
            <a href="${link.url}" target="_blank" class="link-button">
              ${link.icon} ${link.title}
            </a>
          `).join("")}
        </div>

        <footer>Powered by READTalk</footer>
      </div>
    </body>
    </html>
  `;

  return new Response(html, {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  });
};
