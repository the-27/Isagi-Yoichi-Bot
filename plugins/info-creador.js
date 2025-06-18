import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
  await m.react('👻');

  let who = m.mentionedJid && m.mentionedJid[0]
    ? m.mentionedJid[0]
    : m.fromMe
    ? conn.user.jid
    : m.sender;
  let name = await conn.getName(who);
  let edtr = `@${m.sender.split('@')[0]}`;
  let username = await conn.getName(m.sender);

  let suittag = '51969214380';
  let black = '꧁𓊈𒆜𝖙𝖍𝖊•𝒃𝒍𝒂𝒄𝒌𒆜𓊉꧂';
  let imageUrl = 'https://files.catbox.moe/pp7ncd.jpg';
  let dev = '© 𝘉𝘺 𝘉𝘓𝘈𝘊𝘒';

  // VCARD
  let list = [
    {
      displayName: `${black}`,
      vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${black}\nitem1.TEL;waid=${suittag}:${suittag}\nitem1.X-ABLabel:Número\nitem2.EMAIL;type=INTERNET:blackoficial2025@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:https://www.instagram.com/crowbot_wa\nitem3.X-ABLabel:Instagram\nitem4.ADR:;; Perú 🇵🇪;;;;\nitem4.X-ABLabel:Región\nEND:VCARD`
    }
  ];

  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: `${list.length} Contacto`,
      contacts: list
    },
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        title: 'һ᥆ᥣᥲ ᥴ᥆ᥒ𝗍ᥲᥴ𝗍᥆ ძᥱ mі ᥴrᥱᥲძ᥆r👑',
        body: dev,
        thumbnailUrl: imageUrl,
        sourceUrl: 'https://github.com/the-27',
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });

  let responseText = `┏━━━━━━━━━━━━━━━━━━━┓
┃ 🦠 𝒄𝒐𝒏𝒕𝒂𝒄𝒕𝒐 𝒅𝒆𝒍 𝒄𝒓𝒆𝒂𝒅𝒐𝒓 ⚡
┣﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌𝔁ꔫ
┃ 👤 *NOMBRE:* ${black}
┃࿙࿚࿙࿚࿙࿚࿙࿚࿙࿚࿙࿚࿙࿚࿙࿚࿙࿚࿙࿚࿙࿚࿙࿚
┃ 👾 *LINK:* wa.me/${suittag}
┃࿙࿚࿙࿚࿙࿚࿙࿚࿙࿚࿙࿚࿙࿚࿙࿚࿙࿚࿙࿚࿙࿚࿙࿚
┃ 🌴 wa.link/uowz07
┗━━━━━━━━━━━━━━━━━━━┛`.trim();
  await conn.reply(m.chat, responseText, fkontak);
};

handler.help = ['owner', 'creator'];
handler.tags = ['main'];
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;