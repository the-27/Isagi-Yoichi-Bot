//código creado por Dioneibi-rip
import fetch from 'node-fetch';

const newsletterJid = '120363417186717632@newsletter';
const newsletterName = '⏤͟͞ू⃪፝͜⁞⟡『 𝙍𝙞𝙣-𝙄𝒕𝒐𝒔𝒉𝙞꯭ 』࿐⟡';

var handler = async (m, { conn, args, usedPrefix, command }) => {
  const emoji = '🎥';
  const contextInfo = {
    mentionedJid: [m.sender],
    isForwarded: true,
    forwardingScore: 999,
    forwardedNewsletterMessageInfo: {
      newsletterJid,
      newsletterName,
      serverMessageId: -1
    },
    externalAdReply: {
      title: namebot,
      body: dev,
      thumbnail: icons,
      sourceUrl: redes,
      mediaType: 1,
      renderLargerThumbnail: false
    }
  };

  if (!args[0]) {
    return conn.reply(
      m.chat,
      `${emoji} uso incorrecto.\n\nEjemplo de uso:\n*${usedPrefix + command} https://youtu.be/1MH4ewcrtMk?si=nP4AofYa0Hm6uPSh*`,
      m,
      { contextInfo, quoted: m }
    );
  }

  try {
    await conn.reply(
      m.chat,
      `🚀 *E S P E R E*\n> ⚽ Se está descargando su video, dame un momentito..`,
      m,
      { contextInfo, quoted: m }
    );

    const url = args[0];
    const api = `https://api.vreden.my.id/api/ytmp4?url=${encodeURIComponent(url)}`;
    const res = await fetch(api);
    const json = await res.json();

    if (json.status !== 200 || !json.result?.download?.url) {
      return conn.reply(
        m.chat,
        `❌ *No pude descargar el video.*\nRazón: ${json.message || 'Respuesta inválida.'}`,
        m,
        { contextInfo, quoted: m }
      );
    }

    const {
      title,
      description,
      timestamp,
      views,
      image,
      author,
      url: videoURL
    } = json.result.metadata;

    const {
      url: downloadURL,
      quality,
      filename
    } = json.result.download;

    const videoRes = await fetch(downloadURL);
    const videoBuffer = await videoRes.buffer();

    await conn.sendMessage(
      m.chat,
      {
        video: videoBuffer,
        caption: 
`${title}`,
        mimetype: 'video/mp4',
        fileName: filename
      },
      { contextInfo, quoted: m }
    );
  } catch (e) {
    console.error(e);
    await conn.reply(
      m.chat,
      `❌ *Ocurrió un error al procesar el video.*\nDetalles: ${e.message}`,
      m,
      { contextInfo, quoted: m }
    );
  }
};

handler.help = ['ytv'].map(v => v + ' <enlace>');
handler.tags = ['descargas'];
handler.command = ['ytv'];
handler.register = true;
handler.limit = true;
handler.coin = 3;

export default handler;
