import fs from 'fs';
import path from 'path';

const marriagesFile = path.resolve('./src/database/casados.json');
let proposals = {};

// Cargar matrimonios
function loadMarriages() {
  if (fs.existsSync(marriagesFile)) {
    const data = fs.readFileSync(marriagesFile, 'utf-8');
    return JSON.parse(data);
  }
  return {};
}

// Guardar matrimonios
function saveMarriages(data) {
  fs.writeFileSync(marriagesFile, JSON.stringify(data, null, 2));
}

let marriages = loadMarriages();

function isYaemoriBotMD() {
  try {
    const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
    return pkg.name === 'Isagi-Yoichi' && pkg.repository?.url === 'git+https://github.com/the-27/Isagi-Yoichi-Bot.git';
  } catch (e) {
    console.error('Error al leer package.json:', e);
    return false;
  }
}

let handler = async (m, { conn, command, usedPrefix, args }) => {
  if (!isYaemoriBotMD()) {
    await m.reply('✧ Comando no disponible por el momento.');
    return;
  }

  const sender = m.sender;
  const mentioned = m.mentionedJid?.[0];

  if (/^marry$/i.test(command)) {
    let user = global.db.data.users[sender];

    if (user.age < 18) {
      await m.reply('✧ Debes ser mayor de 18 años para casarte.');
      return;
    }

    if (marriages[sender]) {
      await conn.reply(m.chat, `✧ Ya estás casado/a con *@${marriages[sender].split('@')[0]}*\nPuedes divorciarte con *#divorce*`, m, {
        mentions: [marriages[sender]],
      });
      return;
    }

    if (!mentioned) {
      await conn.reply(m.chat, `✧ Debes mencionar a alguien para proponer matrimonio.\n> Ejemplo: *${usedPrefix + command} @usuario*`, m);
      return;
    }

    if (marriages[mentioned]) {
      await conn.reply(m.chat, `✧ @${mentioned.split('@')[0]} ya está casado/a con *@${marriages[mentioned].split('@')[0]}*`, m, {
        mentions: [mentioned, marriages[mentioned]],
      });
      return;
    }

    if (sender === mentioned) {
      await m.reply('✧ ¡No puedes proponerte matrimonio a ti mismo!');
      return;
    }

    if (proposals[mentioned] === sender) {
      // Matrimonio aceptado
      delete proposals[mentioned];
      marriages[sender] = mentioned;
      marriages[mentioned] = sender;
      saveMarriages(marriages);

      global.db.data.users[sender].partner = conn.getName(mentioned);
      global.db.data.users[mentioned].partner = conn.getName(sender);

      await conn.reply(m.chat, `✩.･:｡≻───── ⋆♡⋆ ─────.•:｡✩\n¡Se han Casado! ฅ^•ﻌ•^ฅ*:･ﾟ✧\n\n*•.¸♡ Esposo/a @${sender.split('@')[0]}\n*•.¸♡ Esposo/a @${mentioned.split('@')[0]}\n\nDisfruten de su luna de miel\n✩.･:｡≻───── ⋆♡⋆ ─────.•:｡✩`, m, {
        mentions: [sender, mentioned],
      });
    } else {
      proposals[sender] = mentioned;
      await conn.reply(m.chat, `♡ @${mentioned.split('@')[0]}, @${sender.split('@')[0]} te ha propuesto matrimonio. ¿Aceptas?\n> ✐ Aceptar » *${usedPrefix + command}*`, m, {
        mentions: [sender, mentioned],
      });
    }
  } else if (/^divorce$/i.test(command)) {
    if (!marriages[sender]) {
      await m.reply('✧ Tú no estás casado/a con nadie.');
      return;
    }

    const partner = marriages[sender];
    delete marriages[sender];
    delete marriages[partner];
    saveMarriages(marriages);

    global.db.data.users[sender].partner = '';
    global.db.data.users[partner].partner = '';

    await conn.reply(m.chat, `✧ @${sender.split('@')[0]} y @${partner.split('@')[0]} se han divorciado.`, m, {
      mentions: [sender, partner],
    });
  }
};

handler.help = ['marry', 'divorce'];
handler.tags = ['rg'];
handler.command = ['marry', 'divorce', 'divorciarse'];
handler.group = true;
handler.register = true;

export default handler;