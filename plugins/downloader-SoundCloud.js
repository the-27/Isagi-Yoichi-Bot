import fetch from 'node-fetch';
import axios from 'axios';

const getBuffer = async (url) => {
  try {
    const res = await axios.get(url, { responseType: 'arraybuffer'});
    return res.data;
  } catch (e) {
    console.error(`Error al obtener audio: ${e}`);
    return null;
  }
};

let handler = async (m, { conn, text}) => {
  if (!text) return conn.reply(m.chat, `🌷 Ingresa el nombre de la canción de *Soundcloud.*`, m);

  await m.react('🕒');

  try {
    let api = await fetch(`https://apis-starlights-team.koyeb.app/starlight/soundcloud-search?text=${encodeURIComponent(text)}`);
    let json = await api.json();

    if (!json || json.length === 0) throw new Error("❌ No se encontraron resultados.");

    let { url, title} = json[0];

    let api2 = await fetch(`https://apis-starlights-team.koyeb.app/starlight/soundcloud?url=${encodeURIComponent(url)}`);
    let json2 = await api2.json();

    if (!json2 ||!json2.link) throw new Error("❌ No se pudo obtener el audio.");

    let { link} = json2;

    const audioBuffer = await getBuffer(link);

    if (!audioBuffer) throw new Error('❌ No se pudo descargar el audio.');

    let txt = `🎵 *${title}*\n🔗 ${url}\n\n☁️ Procesando el audio, aguarde un momento...`;
    await conn.reply(m.chat, txt, m);

    await conn.sendMessage(m.chat, {
      audio: audioBuffer,
      fileName: `${title}.mp3`,
      mimetype: 'audio/mp3',
      quoted: m
  });

    await m.react('✅');
  } catch (e) {
    console.error('Error en handler SoundCloud:', e);
    await m.react('❌');
    return conn.reply(m.chat, `Error: ${e.message}`, m);
  }
};

handler.help = ['soundcloud', 'sound'];
handler.tags = ['descargas'];
handler.command = ['soundcloud', 'sound'];

export default handler;