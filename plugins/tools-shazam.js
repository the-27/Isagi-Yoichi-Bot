import acrcloud from 'acrcloud';
import { writeFile, unlink } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';
import { randomUUID } from 'crypto';

let acr = new acrcloud({
  host: 'identify-eu-west-1.acrcloud.com',
  access_key: 'c33c767d683f78bd17d4bd4991955d81',
  access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu',
});

let handler = async (m, { conn, command, usedPrefix }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || q.mediaType || '';

  if (/audio|video/.test(mime)) {
    try {
      await m.react('🎧');
      let buffer = await q.download();
      if (!buffer) throw '❌ No se pudo descargar el archivo.';
      if (buffer.length > 1024 * 1024 * 5) throw '⚠️ El archivo es muy grande. Usa uno menor a 5MB.';

      let filename = `${randomUUID()}.mp3`;
      let filepath = join(tmpdir(), filename);
      await writeFile(filepath, buffer);

      let res = await acr.identify(buffer);
      await unlink(filepath);

      if (!res.status.msg === 'Success') throw '❌ No se encontró coincidencia.';

      let meta = res.metadata?.music?.[0];
      if (!meta) throw '❌ No se detectó ninguna canción.';

      let txt = '╭─⬣「 *Whatmusic - tools* 」⬣\n';
      txt += `│  ≡◦ *🍭 Título ∙* ${meta.title || 'Desconocido'}\n`;
      txt += `│  ≡◦ *👤 Artista ∙* ${meta.artists?.[0]?.name || 'Desconocido'}\n`;
      txt += `│  ≡◦ *📚 Álbum ∙* ${meta.album?.name || 'Desconocido'}\n`;
      txt += `│  ≡◦ *🕜 Lanzamiento ∙* ${meta.release_date || 'Desconocido'}\n`;
      txt += '╰─⬣';

      conn.reply(m.chat, txt, m);
    } catch (e) {
      console.error(e);
      conn.reply(m.chat, `❌ Error: ${e}`, m);
    }
  } else {
    conn.reply(m.chat, `🥥 Etiqueta un audio o video con el comando *${usedPrefix + command}* para reconocer la música.`, m);
  }
};

handler.help = ['whatmusic'];
handler.tags = ['tools'];
handler.command = ['whatmusic', 'shazam'];
handler.register = true;

export default handler;



/*
import fs from 'fs'
import acrcloud from 'acrcloud'

let acr = new acrcloud({
  host: 'identify-eu-west-1.acrcloud.com',
  access_key: 'c33c767d683f78bd17d4bd4991955d81',
  access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu'
})

let handler = async (m) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!/audio|video/.test(mime)) {
    return m.reply(`*${xtools} Por favor, responde a un audio o video para identificar la música.*`)
  }

  let file = ''
  try {
    await m.react('🔍') // Reacción de "procesando"
    
    let media = await q.download()
    if (!media) throw '*✖️ No se pudo descargar el archivo de audio/video.*'

    let ext = mime.split('/')[1]
    if (!fs.existsSync('./tmp')) fs.mkdirSync('./tmp')
    file = `./tmp/${m.sender}-${Date.now()}.${ext}`
    fs.writeFileSync(file, media)

    let res = await acr.identify(fs.readFileSync(file))
    let { code, msg } = res.status

    if (code !== 0) {
      if (msg.toLowerCase().includes('no result')) {
        throw '*⚠️ No se encontró ninguna coincidencia de música.*\n*Asegurate de que el audio o vídeo este claro y no ruidoso.*'
      }
      throw `*✖️ Error del servidor ACRCloud:* ${msg}`
    }

    if (!res.metadata?.music?.length) {
      throw '*⚠️ No se encontró ninguna coincidencia de música.*'
    }

    let info = res.metadata.music[0]
    let { title, artists, album, genres, release_date } = info

    let txt = `
\`\`\`乂 RESULTADO - ACRCLOUD\`\`\`

≡ *🌴 Título:* ${title}
≡ *👤 Artista:* ${artists?.map(v => v.name).join(', ') || 'Desconocido'}
≡ *🌿 Álbum:* ${album?.name || 'Desconocido'}
≡ *🌵 Género:* ${genres?.map(v => v.name).join(', ') || 'Desconocido'}
≡ *🌳 Lanzamiento:* ${release_date || 'Desconocido'}
    `.trim()

    m.reply(txt)
  } catch (e) {
    let msg = typeof e === 'string' ? e : `*❌ Error:* ${e.message || e}`
    m.reply(msg)
  } finally {
    if (file) try { fs.unlinkSync(file) } catch {}
  }
}

handler.help = ['whatmusic <audio/video>']
handler.tags = ['tools']
handler.command = ['shazam', 'whatmusic']
export default handler
*/