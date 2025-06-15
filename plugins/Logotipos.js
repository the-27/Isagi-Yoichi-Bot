import fetch from 'node-fetch';

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) {
    return conn.reply(
      m.chat,
      `🎨 Ingresa el texto que deseas convertir en un logo.\nEjemplo:\n> *${usedPrefix + command} isagi yoichi*`,
      m
    );
  }

  if (!m.react) m.react = async () => {}; // fallback si no existe
  await m.react('🕓');

  try {
    const api = {
      "advancedglow": "advancedglow",
      "typography": "typography",
      "pixelglitch": "pixelglitch",
      "glitch": "glitch",
      "neonglitch": "neonglitch",
      "flag": "flag",
      "flag3d": "flag3d",
      "deleting": "deleting",
      "blackpink": "blackpink",
      "glowing": "glowing",
      "underwater": "underwater",
      "logomaker": "logomaker",
      "cartoon": "cartoon",
      "papercut": "papercut",
      "watercolor": "watercolor",
      "affectclouds": "affectclouds",
      "blackpinklogo": "blackpinklogo",
      "gradient": "gradient",
      "summerbeach": "summerbeach",
      "luxurygold": "luxurygold",
      "multicoloredneon": "multicoloredneon",
      "sandsummer": "sandsummer",
      "galaxywallpaper": "galaxywallpaper",
      "1917": "1917",
      "markingneon": "markingneon",
      "royal": "royal",
      "freecreate": "freecreate",
      "galaxy": "galaxy",
      "darkgreen": "darkgreen",
      "lighteffects": "lighteffects",
      "dragonball": "dragonball",
      "neondevil": "neondevil",
      "frozen": "frozen",
      "wooden3d": "wooden3d",
      "metal3d": "metal3d",
      "ligatures": "ligatures",
      "3druby": "3druby",
      "sunset": "sunset",
      "cemetery": "cemetery",
      "halloween": "halloween",
      "horror": "horror",
      "blood": "blood",
      "joker": "joker",
      "clouds": "clouds"
    };

    if (!(command in api)) {
      return conn.reply(m.chat, '❌ Comando no reconocido.', m);
    }

    const apiUrl = `https://carisys.online/api/logos/${api[command]}?texto=${encodeURIComponent(text)}`;

    const res = await fetch(apiUrl);

    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    
    const finalUrl = res.url;
    if (!finalUrl || !finalUrl.startsWith('http')) {
      throw new Error('La URL generada no es válida');
    }

    await conn.sendFile(m.chat, finalUrl, 'logo.png', '✨ Aquí tienes tu logo:', m);
    await m.react('✅');

  } catch (error) {
    console.error('❌ Error al generar logo:', error.message);
    await m.react('❌');
    await conn.reply(m.chat, '❌ Ocurrió un error al generar el logo. Intenta nuevamente más tarde.', m);
  }
};

handler.help = Object.keys(handler.command).map(cmd => `${cmd} *<texto>*`);
handler.tags = ['logotipos'];
handler.command = [
  'advancedglow', 'typography', 'pixelglitch', 'glitch', 'neonglitch', 'flag', 'flag3d', 'deleting', 'blackpink',
  'glowing', 'underwater', 'logomaker', 'cartoon', 'papercut', 'watercolor', 'affectclouds', 'blackpinklogo', 'gradient',
  'summerbeach', 'luxurygold', 'multicoloredneon', 'sandsummer', 'galaxywallpaper', '1917', 'markingneon', 'royal',
  'freecreate', 'galaxy', 'darkgreen', 'lighteffects', 'dragonball', 'neondevil', 'frozen', 'wooden3d', 'metal3d',
  'ligatures', '3druby', 'sunset', 'cemetery', 'halloween', 'horror', 'blood', 'joker', 'clouds'
];
handler.register = true;

export default handler;