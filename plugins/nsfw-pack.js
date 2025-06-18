/* Pack By WillZek 
- Free Codes Titan
- https://whatsapp.com/channel/0029ValMlRS6buMFL9d0iQ0S
- https://github.com/WillZek 
- Editado por theBlack
*/
import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix}) => {
  await m.react('🕑');

  let txt = "Pack🔥🔥🔥\n\n> Usa '.pack' nuevamente para ver el siguiente ✨";
  let img = "https://delirius-apiofc.vercel.app/nsfw/girls"; 
  let footerText = `${dev}`;

  const buttons = [
    {
      buttonId: `${usedPrefix}pack`,
      buttonText: { displayText: "🔁 Siguiente"},
      type: 1
   }
  ];

  await conn.sendMessage(m.chat, {
    image: { url: img},
    caption: txt,
    footer: footerText,
    buttons: buttons,
    viewOnce: true
}, { quoted: m});

  await m.react('✅'); 
};

handler.help = ['pack'];
handler.tag = ['nsfw'];
handler.command = ['pack'];

export default handler;