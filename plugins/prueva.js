import fs from 'fs';
import fetch from 'node-fetch';
import { xpRange } from '../lib/levelling.js';

let handler = async (m, { conn, usedPrefix }) => {
  try {
    let userId = m.sender;
    let taguser = '@' + userId.split("@s.whatsapp.net")[0];

    let images = [
      'https://files.catbox.moe/pp7ncd.jpg',
      'https://files.catbox.moe/fcbeie.jpg',
      'https://files.catbox.moe/r0h0j5.jpg',
    ];
    let randomImage = images[Math.floor(Math.random() * images.length)];
    let emojis = '⚽';
    let error = '❌';

    let menuText = `
*_~✦═ೋ『★』ೋ═✦~_*
⚙️ *Opciones disponibles:*
- 📥 *Menú de Descargas*
- 🔍 *Menú de Búsquedas*
- 🎮 *Menú RPG + Economía*
- 👑 *Menú de Owner*
- 👾 *Menú Perfil*
- 🌴 *Menú de Audios*
- 🏔️ *Menu grupos*

📌 Usa la lista para seleccionar una opción.

© ISAGI-YOICHI
`.trim();

    let listMessage = {
      text: menuText,
      footer: " ✦⃟⛧┋ ➪ _I S A G I ⛧ U L T R A_ ⚽┋⃟✧",
      title: "📋 ISAGI-YOICHI MENÚ 📚",
      buttonText: "🌟 ABRIR MENÚ 🌟",
      sections: [
        {
          title: "📂 𝐒𝐄𝐋𝐄𝐂𝐂𝐈𝐎𝐍𝐄 𝐔𝐍𝐀 𝐎𝐏𝐂𝐈𝐎𝐍:",
          rows: [
            { title: "📥 Menú de Descargas", rowId: `${usedPrefix}menudl`, description: "Descarga contenido de YouTube, Instagram, etc." },
            { title: "🔍 Menú de Búsquedas", rowId: `${usedPrefix}menuse`, description: "Busca imágenes, videos, info y más." },
            { title: "🎮 Menú RPG + Economía", rowId: `${usedPrefix}menurpg`, description: "Aventura, niveles, dinero y más." },
            { title: "👑 Menú de Owner", rowId: `${usedPrefix}dev`, description: "Opciones especiales para el dueño." },
            { title: "👾 Menú de Perfil", rowId: `${usedPrefix}perfildates`, description: "Ver y editar perfil del usuario." },
            { title: "📜 Audios sin Prefijo", rowId: `${usedPrefix}menu2`, description: "Audios automáticos sin escribir comando." },
          ]
        }
      ]
    };

    await conn.sendFile(m.chat, randomImage, 'menu.jpg', 'ධ⃟🌹 𝐌𝐄𝐍𝐔 𝐋𝐈𝐒𝐓', m);

    await conn.sendMessage(m.chat, listMessage, { quoted: m });

    await m.react(emojis);
  } catch (e) {
    await m.reply(`✘ Ocurrió un error al enviar el menú\n\n${e}`);
    await m.react('❌');
  }
};

handler.help = ['menu1'];
handler.tags = ['main'];
handler.command = ['menu1'];
handler.register = true;

export default handler;