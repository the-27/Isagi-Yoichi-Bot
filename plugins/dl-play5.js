import fetch from "node-fetch";
import yts from "yt-search";

const handler = async (m, { conn, command, args, text, usedPrefix }) => {
  let emoji = '🎵';
  let pontexto = `*${emoji} Ingresa un título para buscar en YouTube.*`;
  let espere = '*🌴 _Buscando resultados, espere un momento..._*';
  let errorcode = `⚠︎ Ocurrió un error al buscar el video. Inténtalo de nuevo más tarde.`;

  if (!text) return conn.reply(m.chat, pontexto, m);
  await conn.reply(m.chat, espere, m);

  try {
    const yt_play = await search(args.join(' '));
    if (!yt_play.length) throw new Error('No se encontraron resultados');

    let txt = `
╔═ ❲ 🌲 𝙰𝚂𝚃𝚁𝙾 - 𝙱𝙾𝚃 ⚡ ❳ ═╗
║       🥥 PLAY LIST 🌴
╠═══════════════════╣
║💫 *𝚃𝙸𝚃𝚄𝙻𝙾:* ${yt_play[0].title}
╠═══════════════════╣
║🥞 *𝙿𝚄𝙱𝙻𝙸𝙲𝙰𝙳𝙾:* ${yt_play[0].ago}
╠═══════════════════╣
║🌹 *𝙳𝚄𝚁𝙰𝙲𝙸𝙾𝙽:* ${secondString(yt_play[0].duration.seconds)}
╠═══════════════════╣
║🍡 *𝙻𝙸𝙽𝙺:* ${yt_play[0].url}
╚═══════════════════╝`;

    let listSections = [{
      title: `𔒝 𝐋𝐈𝐒𝐓 𝐃𝐄 𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀𝐒 𔒝`,
      highlight_label: `𝐏𝐋𝐀𝐘𝐋𝐈𝐒𝐓`,
      rows: [
        {
          header: "⫶☰ 𝑷𝑳𝑨𝒀 𝑳𝑰𝑺𝑻",
          title: "𔓕 𝙱𝚄𝚂𝚀𝚄𝙴𝙳𝙰.",
          description: `✎ ᵇᵘˢᶜᵃʳ ᵐᵃˢ ᶜᵃⁿᶜⁱᵒⁿᵉˢ ᵈᵉˡ ᶜᵃⁿᵗᵃⁿᵗᵉ.`,
          id: `#playlist ${text}`,
        },
        {
          header: "⫹⫺ 𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀𝐑 𝐀𝐔𝐃𝐈𝐎",
          title: "𔓕 𝒅𝒆𝒔𝒄𝒂𝒓𝒈𝒂𝒓.",
          description: `✎ Audio en formato normal.`,
          id: `#audio ${yt_play[0].url}`,
        },
        {
          header: "⫹⫺ 𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀𝐑 𝐕𝐈𝐃𝐄𝐎",
          title: "𔓕 𝒅𝒆𝒔𝒄𝒂𝒓𝒈𝒂𝒓.",
          description: `✎ Video en formato normal.`,
          id: `#video ${yt_play[0].url}`,
        },
        {
          header: "⫹⫺ 𝐀𝐔𝐃𝐈𝐎 𝐃𝐎𝐂𝐔𝐌𝐄𝐍𝐓𝐎",
          title: "𔓕 𝒅𝒆𝒔𝒄𝒂𝒓𝒈𝒂𝒓.",
          description: `✎ Audio en formato de documento.`,
          id: `#ytmp3doc ${yt_play[0].url}`,
        },
        {
          header: "⫹⫺ 𝐕𝐈𝐃𝐄𝐎 : 𝐃𝐎𝐂𝐔𝐌𝐄𝐍𝐓𝐎",
          title: "𔓕 𝒅𝒆𝒔𝒄𝒂𝒓𝒈𝒂𝒓.",
          description: `✎ Video en formato de documento.`,
          id: `#ytmp4doc ${yt_play[0].url}`,
        },
      ]
    }];

    await conn.sendListB(m.chat, '', txt, `⁩🥞 𝙾𝙿𝙲𝙸𝙾𝙽𝙴𝚂`, yt_play[0].thumbnail, listSections, m);

  } catch (e) {
    console.error(e);
    await conn.reply(m.chat, errorcode, m);
  }
};

handler.command = ['play5'];
handler.register = true;
export default handler;

// Función para buscar en YouTube
async function search(query, options = {}) {
  const search = await yts.search({ query, hl: 'es', gl: 'ES', ...options });
  return search.videos;
}

// Formatea números con puntos
function MilesNumber(number) {
  const exp = /(\d)(?=(\d{3})+(?!\d))/g;
  const rep = '$1.';
  const arr = number.toString().split('.');
  arr[0] = arr[0].replace(exp, rep);
  return arr[1] ? arr.join('.') : arr[0];
}

// Convierte segundos a formato legible
function secondString(seconds) {
  seconds = Number(seconds);
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const dDisplay = d > 0 ? d + (d == 1 ? ' día, ' : ' días, ') : '';
  const hDisplay = h > 0 ? h + (h == 1 ? ' hora, ' : ' horas, ') : '';
  const mDisplay = m > 0 ? m + (m == 1 ? ' minuto, ' : ' minutos, ') : '';
  const sDisplay = s > 0 ? s + (s == 1 ? ' segundo' : ' segundos') : '';
  return dDisplay + hDisplay + mDisplay + sDisplay;
}