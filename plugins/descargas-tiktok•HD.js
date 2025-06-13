import axios from "axios";
import FormData from "form-data";
import cheerio from "cheerio";

let handler = async (m, { conn, usedPrefix, command, text, args }) => {
  if (!text) {
    return conn.reply(m.chat, '*`Ingresa el link del vídeo a descargar 🤍`*', m);
  }

  try {
    await m.react('🕓');

    let data = await tiktokdl(text);
    if (!data?.status || !data.server1?.url) {
      throw new Error('No se pudo obtener el video.');
    }

    const capNormal = '*`[ TIKTOK CALIDAD NORMAL ]`*';
    const capHD = '*`[ TIKTOK CALIDAD HD ]`*';

    // Calidad normal
    await conn.sendMessage(m.chat, {
      video: { url: data.server1.url },
      caption: capNormal
    }, { quoted: m });

    // Calidad HD (si está disponible)
    if (data.serverHD?.url) {
      await conn.sendMessage(m.chat, {
        video: { url: data.serverHD.url },
        caption: capHD
      }, { quoted: m });
    }

    await m.react('✅');
  } catch (err) {
    console.error(err);
    await m.react('✖️');
    conn.reply(m.chat, '*`Ocurrió un error al intentar descargar el video.`*', m);
  }
};

handler.help = ['tiktokhd *<url>*'];
handler.tags = ['descargas'];
handler.command = ['tiktokhd'];

export default handler;

// ────────────────────────────────────────

async function tiktokdl(url) {
  const result = {};
  const form = new FormData();
  form.append("q", url);
  form.append("lang", "id");

  try {
    const { data } = await axios("https://savetik.co/api/ajaxSearch", {
      method: "post",
      data: form,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "User-Agent": "PostmanRuntime/7.32.2"
      }
    });

    const $ = cheerio.load(data.data);

    result.status = true;
    result.caption = $("div.video-data .content h3").text();
    result.server1 = {
      quality: "MEDIUM",
      url: $("div.video-data .tik-right > div > p:nth-child(1) > a").attr("href")
    };
    result.serverHD = {
      quality: $("div.video-data .tik-right > div > p:nth-child(3) > a").text()?.split("MP4 ")[1],
      url: $("div.video-data .tik-right > div > p:nth-child(3) > a").attr("href")
    };
    result.audio = $("div.video-data .tik-right > div > p:nth-child(4) > a").attr("href");

  } catch (error) {
    console.error("Error en tiktokdl:", error);
    result.status = false;
    result.message = error.message;
  }

  return result;
}