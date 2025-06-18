const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command, usedPrefix }) => {
  if (usedPrefix.toLowerCase() === 'a') return;

  const customEmoji = global.db.data.chats[m.chat]?.customEmoji || '🌲';
  await m.react(customEmoji);

  if (!(isAdmin || isOwner)) {
    global.dfail?.('admin', m, conn);
    throw false;
  }

  const pesan = args.length ? args.join(' ') : 'Sin mensaje';
  const mj = `°◦⃝📑 *𝙼𝙴𝙽𝚂𝙰𝙹𝙴:*\n│ ${pesan}`;
  const groupName = await conn.getName(m.chat);
  const teksLines = [
    `╭══〔 🦠 𝒂𝒔𝒕𝒓𝒐 - 𝒃𝒐𝒕 💫 〕══╮`,
    `│ 🥥 𝑀𝐸𝑁𝐶𝐼𝑂𝑁 𝐺𝐸𝑁𝐸𝑅𝐴𝐿 🥞`,
    `│ 🧃 *𝙼𝙸𝙴𝙼𝙱𝚁𝙾𝚂*: ${participants.length}`,
    `│ 🍁 *𝙶𝚁𝚄𝙿𝙾*: ${groupName}`,
    `├─╰➤ ${mj}`,
    `╰═══════⬣\n`
  ];

  for (const mem of participants) {
    teksLines.push(`🥥 ${customEmoji} @${mem.id.split('@')[0]}`);
  }

  teksLines.push(`> ${dev}`);

  const teks = teksLines.join('\n');

  const quotedMsg = typeof fkontak !== 'undefined' ? fkontak : m;

  await conn.sendMessage(m.chat, {
    text: teks,
    mentions: participants.map(p => p.id)
  }, { quoted: quotedMsg });
};

handler.help = ['todos *<mensaje opcional>*'];
handler.tags = ['grupo'];
handler.command = ['todos', 'invocar', 'tagall', 'marcar'];
handler.admin = true;
handler.group = true;

export default handler;

/*const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command, usedPrefix }) => {
  if (usedPrefix == 'a' || usedPrefix == 'A') return;

  const customEmoji = global.db.data.chats[m.chat]?.customEmoji || '🌲';
  m.react(customEmoji);

  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  const pesan = args.join` `;
  const mj = `°◦⃝📑 *𝙼𝙴𝙽𝚂𝙰𝙹𝙴:*\n│ ${pesan}`;
  let teks = `╭══〔 🦠 𝒂𝒔𝒕𝒓𝒐 - 𝒃𝒐𝒕 💫 〕══╮ 
│ 🥥 𝑀𝐸𝑁𝐶𝐼𝑂𝑁 𝐺𝐸𝑁𝐸𝑅𝐴𝐿 🥞
│ 🧃 *𝙼𝙸𝙴𝙼𝙱𝚁𝙾𝚂*: ${participants.length}
│ 🍁 *𝙶𝚁𝚄𝙿𝙾*: ${await conn.getName(m.chat)}
├─╰➤ ${mj}
╰═══════⬣\n`;
  for (const mem of participants) {
    teks += `🥥 ${customEmoji} @${mem.id.split('@')[0]}\n`;
  }
  teks += `> ${dev}`;

  conn.sendMessage(m.chat, { text: teks, mentions: participants.map((a) => a.id) }, { quoted: fkontak });
};

handler.help = ['todos *<mensaje opcional>*'];
handler.tags = ['grupo'];
handler.command = ['todos', 'invocar', 'tagall', 'marcar']
handler.admin = true;
handler.group = true;

export default handler;
*/