let handler = async (m, { conn, usedPrefix, command, args}) => {
  if (!(m.chat in global.db.data.chats)) {
    return conn.reply(m.chat, `《✦》¡Este chat no está registrado!.`, m);
  }

  let chat = global.db.data.chats[m.chat];

  if (command === 'bot') {
    if (args.length === 0) {
      const estado = chat.isBanned? '✗ Desactivado': '✓ Activado';
      const info = `
> 「✦」Un administrador puede activar o desactivar a rin itoshi utilizando:

\`╭━━━━━━━━━━━━━━━━━━━╮\`
\`┃\` ⚙️ 𝗖𝗼𝗺𝗮𝗻𝗱𝗼𝘀 𝗗𝗶𝘀𝗽𝗼𝗻𝗶𝗯𝗹𝗲𝘀: ⚙️
\`┣━━━━━━━━━━━━━━━━━━━┫\`
\`┃\` 🪀 ${usedPrefix}𝗯𝗼𝘁 𝗼𝗻 – 𝒂𝒄𝒕𝒊𝒗𝒂𝒓
\`┃\` 🪀 ${usedPrefix}𝗯𝗼𝘁 𝗼𝗳𝗳 – 𝒅𝒆𝒔𝒂𝒄𝒕𝒊𝒗𝒂𝒓
\`┣━━━━━━━━━━━━━━━━━━━┫\`
\`┃\` 🌴 𝗘𝘀𝘁𝗮𝗱𝗼 𝗔𝗰𝘁𝘂𝗮𝗹: ${estado}
\`╰━━━━━━━━━━━━━━━━━━━╯\``;

      const buttons = [
        { buttonId: `${usedPrefix}bot on`, buttonText: { displayText: "🧩 ACTIVAR"}, type: 1},
        { buttonId: `${usedPrefix}bot off`, buttonText: { displayText: "⚙️ DESACTIVAR"}, type: 1},
      ];

      return await conn.sendMessage(m.chat, {
        text: info,
        buttons: buttons,
        footer: "✦⃟⛧┋ ➪ _ISAGI ⛧ YOICHI_ ⚽┋⃟✧",
      }, { quoted: m});
     }

    if (args[0] === 'off') {
      if (chat.isBanned) {
        return conn.reply(m.chat, `⭕ *ISAGI-YOICHI YA ESTABA DESACTIVADO!.*`, m, rcanal);
      }
      chat.isBanned = true;
      return conn.reply(m.chat, `🏔️ *ISAGI-YOICHI HA SIDO DESACTIVADO EN ESTE CHAT!.*`, m, rcanal);
    } else if (args[0] === 'on') {
      if (!chat.isBanned) {
        return conn.reply(m.chat, `⭕ *ISAGI-YOICHI YA ESTABA ACTIVO!.*`, m, rcanal);
      }
      chat.isBanned = false;
      return conn.reply(m.chat, `✅ *ISAGI-YOICHI HA SIDO ACTIVADO EN ESTE CHAT!.*`, m, rcanal);
    }
  }
};

handler.help = ['bot'];
handler.tags = ['grupo'];
handler.command = ['bot'];
handler.admin = true;

export default handler;