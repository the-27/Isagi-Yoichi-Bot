
import fs from 'fs';
import fetch from 'node-fetch';
import { xpRange} from '../lib/levelling.js';

let handler = async (m, { conn, usedPrefix}) => {
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
- 🌴 *Menu de Audios *
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
            description: "🌴 ᥴ᥆mᥲᥒძ᥆s ძᥱ m᥆ძᥱrᥲᥴіóᥒ ᥡ ᥴ᥆ᥒ𝗍r᥆ᥣ ᥲ᥎ᥲᥒzᥲძ᥆ ⍴ᥲrᥲ ᥆ᥕᥒᥱrs. 👑",
            id: `${usedPrefix}dev`
          },
          {
            title: "✨ 𝗠𝗘𝗡𝗨 𝗥𝗣𝗚",
            description: "🎮 𝘾𝙧𝙚𝙖 𝙩𝙪 𝙖𝙫𝙚𝙣𝙩𝙪𝙧𝙖, 𝙧𝙚𝙘𝙤𝙜𝙚 𝙧𝙚𝙘𝙪𝙧𝙨𝙤𝙨, 𝙜𝙖𝙣𝙖 𝙤𝙧𝙤 𝙮 𝙙𝙤𝙢𝙞𝙣𝙖 𝙚𝙡 𝙢𝙪𝙣𝙙𝙤 𝙍𝙋𝙂 ⚔️",
            id: `${usedPrefix}menudl`
          },
          {
            title: "🔍 𝗠𝗘𝗡𝗨 𝗕𝗨𝗦𝗤𝗨𝗘𝗗𝗔𝗦",
            description: "⟡ 𝐂𝐨𝐦𝐚𝐧𝐝𝐨𝐬 𝐞𝐬𝐩𝐞𝐜𝐢𝐚𝐥𝐞𝐬 𝐩𝐚𝐫𝐚 𝐛𝐮𝐬𝐜𝐚𝐫 𝐢𝐧𝐟𝐨𝐫𝐦𝐚𝐜𝐢𝐨́𝐧, 𝐚𝐮𝐝𝐢𝐨𝐬, 𝐯𝐢𝐝𝐞𝐨𝐬 𝐲 𝐦𝐮𝐜𝐡𝐨 𝐦𝐚́𝐬 𝐞𝐧 𝐥𝐢́𝐧𝐞𝐚 🌍",
            id: `${usedPrefix}menuse`
          },
          {
            title: "📥 𝗠𝗘𝗡𝗨 𝗔𝗨𝗗𝗜𝗢𝗦",
            description: "⚜️ 𝐦𝐞𝐧𝐮 𝐚𝐮𝐝𝐢𝐨𝐬 𝐬𝐢𝐧 𝐩𝐫𝐞𝐟𝐢𝐣𝐨",
            id: `${usedPrefix}menu2`
          },
          {
            title: "👾 𝗠𝗘𝗡𝗨 𝗣𝗘𝗥𝗙𝗜𝗟",
            description: "🧩 𝙀𝙭𝙖𝙢𝙞𝙣𝙖 𝙩𝙪𝙨 𝙙𝙖𝙩𝙤𝙨, 𝙖𝙙𝙖𝙥𝙩𝙖 𝙩𝙪 𝙪𝙨𝙚𝙧 𝙖 𝙩𝙪 𝙨𝙩𝙮𝙡𝙚 𝙮 𝙢𝙖́𝙣𝙩𝙚𝙣 𝙩𝙪 𝙚𝙨𝙩𝙖𝙙𝙤 𝙖𝙘𝙩𝙪𝙖𝙡𝙞𝙯𝙖𝙙𝙤 💠",
            id: `${usedPrefix}perfildates`
        }
        ]
      }
    ];

    let buttons = [
      { buttonId: `${usedPrefix}owner`, buttonText: { displayText: "👑 Creador"}, type: 1},
      { buttonId: `${usedPrefix}code`, buttonText: { displayText: "🏔️ Servicios"}, type: 1}
    ];

    // 🔥 Primer envío: Imagen + Botones
    await conn.sendMessage(m.chat, {
      image: { url: randomImage},
      caption: menu,
      footer: " ✦⃟⛧┋ ➪ _K I L L U A ⛧ U L T R A_ ⚽┋⃟✧",
      viewOnce: true,
      buttons: buttons
    }, { quoted: m});

    // ⏳ Espera breve antes de enviar el menú tipo lista
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 📜 Segundo envío: Menú con lista interactiva
    await conn.sendMessage(m.chat, {
      text: "🍓 𝑺𝑬𝑳𝑬𝑪𝑪𝑰𝑶𝑵𝑬 𝑼𝑵𝑨 𝑶𝑷𝑪𝑰𝑶𝑵 𝑫𝑬𝑳 𝑴𝑬𝑵𝑼",
      footer: " ✦⃟⛧┋ ➪ _K I L L U A ⛧ U L T R A_ ⚽┋⃟✧",
      title: "📋 RIN-ITOSHI MENÚ 📚",
      buttonText: "ධ⃟🌹 𝐌𝐄𝐍𝐔 𝐋𝐈𝐒𝐓",
      sections: sections
    }, { quoted: m});

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