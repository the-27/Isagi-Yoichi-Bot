import yts from 'yt-search';

const handler = async (m, { conn, text, usedPrefix, command}) => {
  if (!text) {
    return conn.reply(m.chat, `*${emoji} Ingresa un título para buscar en YouTube.*`, m, fake);
  }

  try {
    const search = await yts(text);
    const videoInfo = search.all?.[0];

    if (!videoInfo) {
      return conn.reply(m.chat, '⚠︎ Ocurrió un error al buscar el video. Inténtalo de nuevo más tarde.', m);
  }

    const body = `> 𑁯᧙ 🍓 *Título:* ${videoInfo.title}
> 𑁯᧙ 📏 *Duración:* ${videoInfo.timestamp}
> 𑁯᧙ 👁️ *Vistas:* ${videoInfo.views.toLocaleString()}
> 𑁯᧙ 🎨 *Autor:* ${videoInfo.author.name}
> 𑁯᧙ 🕰️ *Publicado:* ${videoInfo.ago}
> 𑁯᧙ 📝 *Enlace:* ${videoInfo.url}`;

    await conn.sendMessage(
      m.chat,
      {
        image: { url: videoInfo.thumbnail},
        caption: body,
        footer: 'Elige una opción para descargar:',
        buttons: [
          { buttonId: `${usedPrefix}audio ${videoInfo.url}`, buttonText: { displayText: '🎵 ᥲᥙძі᥆'}, type: 1},
          { buttonId: `${usedPrefix}video ${videoInfo.url}`, buttonText: { displayText: '📽️ ᥎іძᥱ᥆'}, type: 1},
        ],
        viewOnce: true,
        headerType: 4,
      },
      { quoted: m}
    );

    await m.react('✅'); // Reacción de éxito
  } catch (error) {
    console.error(error);
    return conn.reply(m.chat, `❗ Ocurrió un error: ${error.message}`, m);
 }
};

handler.command = ['play3'];
handler.tags = ['descargas'];
//handler.group = true;
handler.limit = 6;

export default handler;
