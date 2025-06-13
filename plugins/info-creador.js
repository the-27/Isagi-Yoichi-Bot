function handler(m, { conn}) {
  const suittag = '51969214380';
  const name = 'BLACK.OFC';
  const packname = '✦⃟⛧┋ ➪ _ISAGI ⛧ YOICHI_ ⚽┋⃟✧';
  const dev = '© Modified by:  ꧁𓊈𒆜𝖙𝖍𝖊•𝒃𝒍𝒂𝒄𝒌𒆜𓊉꧂';
  const channel = 'https://whatsapp.com/channel/0029Vb6BDQc0lwgsDN1GJ31i';
  const banner = 'https://files.catbox.moe/pp7ncd.jpg';

  // Formato de vCard corregido
  const vcard = `BEGIN:VCARD
VERSION:3.0
N:;${name};;;
FN:${name}
ORG:BLACK
TEL;type=CELL;type=VOICE;waid=${suittag}
END:VCARD`;

  // Enviar contacto con mensaje adicional
  conn.sendMessage(m.chat, {
    text: `📌 *Información de contacto*\n\n👾 *Enlace Directo:* wa.link/uowz07\n👤 *Nombre:* ${name}\n📞 *WhatsApp:* +${suittag}\n🔗 *Canal:* [Click aquí](${channel})`,
    footer: dev,
    buttons: [{ buttonId: `.status`, buttonText: { displayText: "🌐 ESTADO - BOT"}, type: 1}],
    headerType: 1
}, { quoted: m});

  // Enviar el contacto de WhatsApp
  conn.sendMessage(m.chat, {
    contacts: {
      displayName: name,
      contacts: [{ vcard}]
  },
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true,
      externalAdReply: {
        showAdAttribution: true,
        title: packname,
        body: dev,
        thumbnailUrl: banner,
        mediaType: 1,
        mediaUrl: channel,
        sourceUrl: channel,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m});
}

handler.help = ['owner'];
handler.tags = ['main'];
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;
