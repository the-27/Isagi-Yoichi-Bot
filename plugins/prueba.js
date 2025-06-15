import fs from 'fs';
import fetch from 'node-fetch';
import { xpRange } from '../lib/levelling.js';

let handler = async (m, { conn, usedPrefix }) => {
  try {
    let userId = m.sender;
    let taguser = '@' + userId.split("@s.whatsapp.net")[0];

    const name = conn.getName(m.sender);
    const fkontak = {
      key: {
        participants: "0@s.whatsapp.net",
        remoteJid: "status@broadcast",
        fromMe: false,
        id: "Halo"
      },
      message: {
        contactMessage: {
          displayName: name,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;${name};;;\nFN:${name}\nitem1.TEL;waid=${userId.split("@")[0]}:${userId.split("@")[0]}\nitem1.X-ABLabel:Mobile\nEND:VCARD`
        }
      },
      participant: "0@s.whatsapp.net"
    };

    let images = [
      'https://files.catbox.moe/pp7ncd.jpg',
      'https://files.catbox.moe/fcbeie.jpg',
      'https://files.catbox.moe/r0h0j5.jpg',
    ];
    let randomImage = images[Math.floor(Math.random() * images.length)];
    let emojis = '⚽';

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
- 🌸 *Menu logos*
  *_~✦═ೋ『★』ೋ═✦~_*

📌 Usa la lista para seleccionar una opción.

© ISAGI-YOICHI
`.trim();

    await conn.sendMessage(m.chat, {
      image: { url: randomImage },
      caption: menuText,
      contextInfo: { externalAdReply: { title: "Isagi-Yoichi Bot", body: "Menú list", thumbnailUrl: randomImage, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true } }
    }, { quoted: fkontak });

    let listMessage = {
      text: '✦⃟⛧┋ ➪ _I S A G I ⛧ U L T R A_ ⚽┋⃟✧',
      footer: '',
      title: "📋 ISAGI-YOICHI MENÚ 📚",
      buttonText: "ධ⃟🌹 𝐌𝐄𝐍𝐔 𝐋𝐈𝐒𝐓",
      sections: [
        {
          title: "📂 𝐒𝐄𝐋𝐄𝐂𝐂𝐈𝐎𝐍𝐄 𝐔𝐍𝐀 𝐎𝐏𝐂𝐈𝐎𝐍:",
          rows: [
            { title: "📥 𝑴𝒆𝒏𝒖 𝒅𝒆𝒔𝒄𝒂𝒓𝒈𝒂𝒔", rowId: `${usedPrefix}menudl`, description: "Descarga contenido de YouTube, Instagram, etc." },
            { title: "🔍 𝑴𝒆𝒏𝒖 𝒃𝒖𝒔𝒒𝒖𝒆𝒅𝒂𝒔", rowId: `${usedPrefix}menuse`, description: "Busca imágenes, videos, info y más." },
            { title: "🎮 𝑴𝒆𝒏𝒖 𝒓𝒑𝒈 | 𝒆𝒄𝒐𝒏𝒐𝒎𝒊𝒂", rowId: `${usedPrefix}menurpg`, description: "Aventura, niveles, dinero y más." },
            { title: "👑 𝑴𝒆𝒏𝒖 𝒐𝒘𝒏𝒆𝒓", rowId: `${usedPrefix}dev`, description: "Opciones especiales para el dueño." },
            { title: "👾 𝑴𝒆𝒏𝒖 𝒑𝒆𝒓𝒊𝒍", rowId: `${usedPrefix}perfildates`, description: "Ver y editar perfil del usuario." },
            { title: "🔗 𝑴𝒆𝒏𝒖 𝒂𝒅𝒎𝒊𝒏𝒔", rowId: `${usedPrefix}menugp`, description: "Lista de funciones para admins." },
            { title: "📜 𝑴𝒆𝒏𝒖 𝒂𝒖𝒅𝒊𝒐𝒔", rowId: `${usedPrefix}menu2`, description: "Audios automáticos sin escribir comando." },
          ]
        }
      ]
    };

    await conn.sendMessage(m.chat, listMessage, { quoted: fkontak });
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