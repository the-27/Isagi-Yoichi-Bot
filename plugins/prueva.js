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

    let menu = `
           *_~✦═ೋ『★』ೋ═✦~_*
       [𔓕꯭(꯭𝗞).꯭𝗜.꯭𝗟-꯭𝗟.꯭𝗨.꯭𝗔꯭꯭𔓕]
    *_~✦═ೋ『★』ೋ═✦~_*
⚙️ *Opciones disponibles:*
- 📥 *Menú de Descargas*
- 🔍 *Menú de Búsquedas*
- 🎮 *Menu rpg + Economia*
- 👑 *Menu de Owner*
- 👾 *Menu Perfil*
- 🌴 *Menu de Audios*
- 🏔️ *Servicios*
- 📜 *Audios*

📌 Usa los botones o el selector de lista para navegar.

© RIN-ITOSHI
`.trim();

    let sections = [
      {
        title: "𝐒𝐄𝐋𝐄𝐂𝐂𝐈𝐎𝐍𝐄 𝐔𝐍𝐀 𝐎𝐏𝐂𝐈𝐎𝐍:",
        rows: [
          {
            title: "📥 𝗠𝗘𝗡𝗨 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦",
            description: "Descarga contenido de YouTube, Facebook, Instagram, etc.",
            id: `${usedPrefix}menudl`
          },
          {
            title: "🌲 𝗠𝗘𝗡𝗨 𝗢𝗪𝗡𝗘𝗥",
            description: "Comandos avanzados para owners.",
            id: `${usedPrefix}dev`
          },
          {
            title: "✨ 𝗠𝗘𝗡𝗨 𝗥𝗣𝗚",
            description: "Crea tu aventura RPG.",
            id: `${usedPrefix}menurpg`
          },
          {
            title: "🔍 𝗠𝗘𝗡𝗨 𝗕𝗨𝗦𝗤𝗨𝗘𝗗𝗔𝗦",
            description: "Busca información, audios, videos y más.",
            id: `${usedPrefix}menuse`
          },
          {
            title: "📜 𝗠𝗘𝗡𝗨 𝗔𝗨𝗗𝗜𝗢𝗦",
            description: "Audios sin prefijo",
            id: `${usedPrefix}menu2`
          },
          {
            title: "👾 𝗠𝗘𝗡𝗨 𝗣𝗘𝗥𝗙𝗜𝗟",
            description: "Mira y edita tu perfil.",
            id: `${usedPrefix}Perfildates`
          }
        ]
      }
    ];

    let buttons = [
      { buttonId: `${usedPrefix}owner`, buttonText: { displayText: "👑 Creador" }, type: 1 },
      { buttonId: `${usedPrefix}code`, buttonText: { displayText: "🏔️ Servicios" }, type: 1 }
    ];

    // Enviar imagen con botones
    await conn.sendMessage(m.chat, {
      image: { url: randomImage },
      caption: menu,
      footer: " ✦⃟⛧┋ ➪ _K I L L U A ⛧ U L T R A_ ⚽┋⃟✧",
      viewOnce: true,
      buttons: buttons
    }, { quoted: m });

    // Espera 2 segundos
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Enviar menú tipo lista
    await conn.sendMessage(m.chat, {
      text: "🍓 𝑺𝑬𝑳𝑬𝑪𝑪𝑰𝑶𝑵𝑬 𝑼𝑵𝑨 𝑶𝑷𝑪𝑰𝑶𝑵 𝑫𝑬𝑳 𝑴𝑬𝑵𝑼",
      footer: " ✦⃟⛧┋ ➪ _K I L L U A ⛧ U L T R A_ ⚽┋⃟✧",
      title: "📋 RIN-ITOSHI MENÚ 📚",
      buttonText: "ධ⃟🌹 𝐌𝐄𝐍𝐔 𝐋𝐈𝐒𝐓",
      sections: sections
    }, { quoted: m });

    await m.react(emojis);
  } catch (e) {
    await m.reply(`✘ Ocurrió un error al enviar el menú\n\n${e}`);
    await m.react(error);
  }
};

handler.help = ['menu1'];
handler.tags = ['main'];
handler.command = ['menu1'];
handler.register = true;

export default handler;