import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix }) => {
  if (usedPrefix === 'a' || usedPrefix === 'A') return;

  try {
    const videoUrl = "https://files.catbox.moe/g26rhu.mp4";
    const d = new Date(new Date() + 3600000);
    const locale = 'es-ES';
    const week = d.toLocaleDateString(locale, { weekday: 'long' });
    const date = d.toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' });

    await conn.sendMessage(m.chat, { react: { text: '⚽', key: m.key } });

    const str = `
┈──────────────────────│
           ⏤͟͟͞͞ᵡ    *M E N U   L O G O S*   ᵡ͟͟͞͞⏤
┈──────────────────────│
   │ • _!advancedglow_
   │ • _!typography_
   │ • _!pixelglitch_
   │ • _!glitch_
   │ • _!neonglitch_
   │ • _!flag_
   │ • _!flag3d_
   │ • _!deleting_
   │ • _!blackpink_
   │ • _!glowing_
   │ • _!underwater_
   │ • _!logomaker_
   │ • _!cartoon_
   │ • _!papercut_
   │ • _!watercolor_
   │ • _!affectclouds_
   │ • _!blackpinklogo_
   │ • _!gradient_
   │ • _!summerbeach_
   │ • _!luxurygold_
   │ • _!multicoloredneon_
   │ • _!sandsummer_
   │ • _!galaxywallpaper_
   │ • _!1917_
   │ • _!markingneon_
   │ • _!royal_
   │ • _!freecreate_
   │ • _!galaxy_
   │ • _!darkgreen_
   │ • _!lighteffects_
   │ • _!dragonball_
   │ • _!neondevil_
   │ • _!frozen_
   │ • _!wooden3d_
   │ • _!metal3d_
   │ • _!ligatures_
   │ • _!3druby_
   │ • _!sunset_
   │ • _!cemetery_
   │ • _!halloween_
   │ • _!horror_
   │ • _!blood_
   │ • _!joker_
   │ • _!clouds glitchtext_
   │ • _!writetext_
   │ • _!typographytext_
   │ • _!amongustext_
   │ • _!rainytext_
   │ • _!graffititext_
   │ • _!colorfulltext_
   │ • _!equalizertext_
   │ • _!narutotext_
   │ • _!angeltxt_
   │ • _!starlight_
   ╰━━━━━━━━━⬣`;

    const contactMessage = {
      key: {
        fromMe: false,
        participant: '0@s.whatsapp.net',
        remoteJid: 'status@broadcast'
      },
      message: {
        contactMessage: {
          displayName: 'Bot',
          vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:Bot\nTEL;type=CELL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nEND:VCARD`
        }
      }
    };

    // Enviar mensaje con video y menú
    await conn.sendMessage(
      m.chat,
      {
        video: { url: videoUrl },
        caption: str.trim(),
        mentions: [...str.matchAll(/@(\d{5,16})/g)].map(v => v[1] + '@s.whatsapp.net')
      },
      { quoted: contactMessage }
    );

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, '*🧩 Error al enviar el menú de logos.*', m);
  }
};

handler.command = ['menulogos', 'logotiposmenu', 'menulogotipos', 'menulog'];
handler.register = false;

export default handler;