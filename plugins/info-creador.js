import { promisify } from 'util';
const delay = promisify(setTimeout);

function handler(m, { conn }) {
  const suittag = "51969214380";
  const ownerNumber = suittag + "@s.whatsapp.net";
  const name = 'BLACK.OFC';
  const packname = '✦⃟⛧┋ ➪ _ISAGI ⛧ YOICHI_ ⚽┋⃟✧';
  const dev = '© Modified by: ꧁𓊈𒆜𝖙𝖍𝖊•𝒃𝒍𝒂𝒄𝒌𒆜𓊉꧂';
  const channel = 'https://whatsapp.com/channel/0029Vb6BDQc0lwgsDN1GJ31i';
  const banner = 'https://files.catbox.moe/pp7ncd.jpg';

  const vcard = `BEGIN:VCARD
VERSION:3.0
N:${name};;;;
FN:${name}
ORG:BLACK
TEL;type=CELL;type=VOICE;waid=${suittag}:${suittag}
EMAIL:blackoficial2025@gmail.com
ADR:;;Lima;;;Peru
END:VCARD`;

  conn.sendMessage(m.chat, {
    text: `📌 *Información de contacto*\n\n👾 *Link:* wa.link/uowz07\n👤 *Nombre:* ${name}\n📞 *WhatsApp:* +${suittag}\n🔗 *Canal:* [Click aquí](${channel})`,
    footer: dev,
    buttons: [
      { buttonId: `.status`, buttonText: { displayText: "🌐 ESTADO - BOT" }, type: 1 }
    ],
    headerType: 1
  }, { quoted: m });

  
  await delay(1500);

  conn.sendMessage(m.chat, {
    contacts: {
      displayName: name,
      contacts: [
        { vcard }
      ]
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
  }, { quoted: m });
}

handler.help = ['owner'];
handler.tags = ['main'];
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;