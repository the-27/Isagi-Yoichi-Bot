let handler = async (m, { conn, usedPrefix }) => {
  let img = `https://files.catbox.moe/3gxuzq.jpg`;
  let txt = `╭ - - - - - - -✎ 🌹   ❜ ⊹
*︵₊˚꒰Ꮺ Manual para editar tu perfil*
*꒰ ୨⚔️୧─・┈・୨⚡୧・┈・─୨⚔️୧ ꒱*
₊˚୨🍧 *${usedPrefix}setbirth* ✦ Edita tu fecha de cumpleaños 🎂.
₊˚୨💥 *${usedPrefix}delbirth* ✦ Elimina tu fecha de cumpleaños 🎂.
₊˚୨⚔️ *${usedPrefix}setdesc* ♡ Edita la descripción de tu perfil.
₊˚୨🍁 *${usedPrefix}deldesc* ♡ Elimina la descripción de tu perfil.
₊˚୨🌲 *${usedPrefix}setgenre* ✐ Edita tu género en tu perfil.
₊˚୨🏜️ *${usedPrefix}delgenre* ✐ Elimina tu género en tu perfil.
₊˚୨❄️ *${usedPrefix}marry* ᰔᩚ Cásate con una persona.
₊˚୨🍥 *${usedPrefix}divorce* ঔ Divórciate de una persona.
╰───────────────⋆`;

  const buttons = [
    { 
      buttonId: `${usedPrefix}profile`,
      buttonText: { displayText: "🏔️ ⍴ᥱr𝖿іᥣ" }, type: 1
    },
    { 
      buttonId: `${usedPrefix}p`,
      buttonText: { displayText: "🏓 ⍴іᥒg" }, type: 1
    },
  ];

  // Crear el fkontak válido
  const fkontak = {
    key: {
      participants: "0@s.whatsapp.net",
      remoteJid: "status@broadcast",
      fromMe: false,
      id: "Halo"
    },
    message: {
      contactMessage: {
        displayName: "✦⃟⛧ ISAGI",
        vcard: "BEGIN:VCARD\nVERSION:3.0\nN:;✦⃟⛧ ISAGI;;;\nFN:✦⃟⛧ ISAGI\nitem1.TEL;waid=1234567890:+12 3456-7890\nitem1.X-ABLabel:Ponsel\nEND:VCARD"
      }
    },
    participant: "0@s.whatsapp.net"
  };

  await conn.sendMessage(m.chat, {
    image: { url: img },
    caption: txt,
    footer: " ✦⃟⛧┋ ➪ _ISAGI ⛧ U L T R A_ ⚽┋⃟✧",
    buttons: buttons,
    viewOnce: true,
    contextInfo: { forwardingScore: 999, isForwarded: true, ...fkontak }
  }, { quoted: m });

  await m.react('👻');
};

handler.command = ['perfildates', 'pedates', 'perd'];
handler.tag = ['rg'];
handler.help = ['perfildates'];
handler.coin = 2;

export default handler;