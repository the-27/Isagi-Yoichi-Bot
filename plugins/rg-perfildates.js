let handler = async (m, { conn, usedPrefix}) => {
  let img = `https://files.catbox.moe/191v1r.jpg`;
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
       buttonText: { displayText: "🏔️ ⍴ᥱr𝖿іᥣ"}, type: 1
     },
     { 
       buttonId: `${usedPrefix}p`,
       buttonText: { displayText: "🏓 ⍴іᥒg"}, type: 1
     },
  ];

  await conn.sendMessage(m.chat, {
    image: { url: img},
    caption: txt,
    footer: " ✦⃟⛧┋ ➪ _ISAGI ⛧ U L T R A_ ⚽┋⃟✧",
    buttons: buttons,
    viewOnce: true,
}, { quoted: m});

  await m.react('👻');
};

handler.command = ['perfildates', 'pedates', 'perd'];
handler.tag = ['rg'];
handler.help = ['perfildates'];
handler.coin = 2;

export default handler;