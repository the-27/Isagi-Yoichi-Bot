import axios from 'axios';
import crypto from 'crypto';

const savetube = {
  api: {
    base: "https://media.savetube.me/api",
    cdn: "/random-cdn",
    info: "/v2/info",
    download: "/download"
  },

  headers: {
    'accept': '*/*',
    'content-type': 'application/json',
    'origin': 'https://yt.savetube.me',
    'referer': 'https://yt.savetube.me/',
    'user-agent': 'Postify/1.0.0'
  },

  crypto: {
    hexToBuffer: (hex) => Buffer.from(hex.match(/.{1,2}/g).join(''), 'hex'),

    decrypt: async (enc) => {
      try {
        const secretKey = 'C5D58EF67A7584E4A29F6C35BBC4EB12';
        const data = Buffer.from(enc, 'base64');
        const iv = data.slice(0, 16);
        const content = data.slice(16);
        const key = savetube.crypto.hexToBuffer(secretKey);

        const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
        let decrypted = decipher.update(content);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return JSON.parse(decrypted.toString());
      } catch (err) {
        throw new Error('❌ Error al descifrar la respuesta. SaveTube puede haber cambiado su cifrado.');
      }
    }
  },

  isUrl: (str) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  },

  youtube: (url) => {
    const patterns = [
      /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
      /youtu\.be\/([a-zA-Z0-9_-]{11})/
    ];
    for (let regex of patterns) {
      if (regex.test(url)) return url.match(regex)[1];
    }
    return null;
  },

  request: async (endpoint, data = {}, method = 'post') => {
    try {
      const { data: res } = await axios({
        method,
        url: `${endpoint.startsWith('http') ? '' : savetube.api.base}${endpoint}`,
        data: method === 'post' ? data : undefined,
        params: method === 'get' ? data : undefined,
        headers: savetube.headers
      });
      return { status: true, data: res };
    } catch (err) {
      return { status: false, error: err.message };
    }
  },

  getCDN: async () => {
    const res = await savetube.request(savetube.api.cdn, {}, 'get');
    return res.status ? { status: true, cdn: res.data.cdn } : res;
  },

  download: async (link) => {
    if (!link) return { status: false, error: "Falta el enlace de YouTube." };
    if (!savetube.isUrl(link)) return { status: false, error: "URL inválida." };

    const id = savetube.youtube(link);
    if (!id) return { status: false, error: "No se pudo extraer el ID del video." };

    try {
      const { cdn } = await savetube.getCDN();
      const info = await savetube.request(`https://${cdn}${savetube.api.info}`, {
        url: `https://www.youtube.com/watch?v=${id}`
      });

      if (!info.status) return info;

      const decrypted = await savetube.crypto.decrypt(info.data.data);

      const dl = await savetube.request(`https://${cdn}${savetube.api.download}`, {
        id,
        downloadType: 'audio',
        quality: '128',
        key: decrypted.key
      });

      if (!dl.status || !dl.data?.data?.downloadUrl) {
        return { status: false, error: "No se pudo obtener el enlace de descarga." };
      }

      return {
        status: true,
        result: {
          title: decrypted.title || "Audio",
          format: 'mp3',
          url: dl.data.data.downloadUrl,
          thumbnail: decrypted.thumbnail || `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
        }
      };
    } catch (err) {
      return { status: false, error: err.message };
    }
  }
};


const handler = async (m, { conn, args }) => {
  const url = args[0];
  if (!url) return m.reply(`*🌴 Ingresa una URL de YouTube.*`);
  if (!savetube.isUrl(url)) return m.reply(`*🌐 El enlace no es válido.*`);

  try {
    await m.react('🕒');
    const res = await savetube.download(url);

    if (!res.status) {
      await m.react('❌');
      return m.reply(`🌴 Error: ${res.error}`);
    }

    const { title, url: dlUrl } = res.result;

    await conn.sendMessage(m.chat, {
      audio: { url: dlUrl },
      mimetype: 'audio/mpeg',
      fileName: `${title}.mp3`
    }, { quoted: m });

    await m.react('✅');
  } catch (err) {
    console.error("Error MP3:", err);
    await m.react('❌');
    m.reply(`❌ Error al procesar la descarga. Puede que el archivo sea muy grande o la API haya fallado.`);
  }
};

handler.help = ['audio *<url>*'];
handler.tags = ['descargas'];
handler.command = ['audio', 'mp3'];

export default handler;