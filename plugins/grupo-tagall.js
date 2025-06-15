const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command, usedPrefix }) => {
  if (usedPrefix == 'a' || usedPrefix == 'A') return;

  const customEmoji = global.db.data.chats[m.chat]?.customEmoji || '🌲';
  m.react(customEmoji);

  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  const pesan = args.join` `;
  const oi = `*⚽ » INFO :* ${pesan}`;
  let teks = `   ╭━━⬣
 ╭┤👑 *!  MENCION GENERAL  !*
 ┃│🍬 *PARA ${participants.length} MIEMBROS*
 ┃│ ${oi} 
 ┃╰━━⬣
 ╰════════⬣\n`;
  for (const mem of participants) {
    teks += `┃${customEmoji} @${mem.id.split('@')[0]}\n`;
  }
  teks += `╰══⌬\n> ${dev}`;

  conn.sendMessage(m.chat, { text: teks, mentions: participants.map((a) => a.id) }, { quoted: fkontak });
};

handler.help = ['todos *<mensaje opcional>*'];
handler.tags = ['grupo'];
handler.command = ['todos', 'invocar', 'tagall', 'marcar']
handler.admin = true;
handler.group = true;
//handler.coin = 4; 

export default handler;