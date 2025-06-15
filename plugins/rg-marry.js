import fs from 'fs/promises';
import path from 'path';

const marriagesFile = path.resolve('./src/database/casados.json');
let proposals = {};
let marriages = {};
const confirmation = {};

async function loadMarriages() {
  try {
    const content = await fs.readFile(marriagesFile, 'utf8');
    marriages = JSON.parse(content || '{}');
  } catch {
    marriages = {};
  }
}

async function saveMarriages() {
  try {
    await fs.writeFile(marriagesFile, JSON.stringify(marriages, null, 2));
  } catch (e) {
    console.error('❌ Error al guardar marriages:', e);
  }
}

function getSpouse(user) {
  return marriages[user] ? `@${marriages[user].split('@')[0]}` : 'Nadie';
}

const handler = async (m, { conn, command }) => {
  const isPropose = /^marry$/i.test(command);
  const isDivorce = /^divorce$/i.test(command);
  const isAccept = /^si$/i.test(command);
  const isDecline = /^no$/i.test(command);

  const userIsMarried = (user) => marriages[user] !== undefined;

  try {
    await loadMarriages();

    if (isPropose) {
      const proposee = m.quoted?.sender || m.mentionedJid?.[0];
      const proposer = m.sender;

      if (!proposee) {
        if (userIsMarried(proposer)) {
          return await conn.reply(
            m.chat,
            `《✧》 Ya estás casado con *${await conn.getName(marriages[proposer])}*\n> Puedes divorciarte con el comando: *#divorce*`,
            m
          );
        } else {
          return await conn.reply(
            m.chat,
            'Debes mencionar o responder a alguien para proponer matrimonio.\n> Ejemplo » *#marry @usuario*',
            m
          );
        }
      }

      if (proposer === proposee)
        return await conn.reply(m.chat, '¡No puedes proponerte matrimonio a ti mismo!', m);

      if (userIsMarried(proposer))
        return await conn.reply(m.chat, `Ya estás casado con ${await conn.getName(marriages[proposer])}.`, m);

      if (userIsMarried(proposee))
        return await conn.reply(m.chat, `${await conn.getName(proposee)} ya está casado con ${await conn.getName(marriages[proposee])}.`, m);

      proposals[proposer] = proposee;
      const proposerName = await conn.getName(proposer);
      const proposeeName = await conn.getName(proposee);
      const confirmationMessage = `ᥫᩣ ${proposerName} te ha propuesto matrimonio. ${proposeeName} ¿aceptas? ʕ•ᴥ•ʔ\n\n*Debes responder con:*\n> ✎ *#si* » para aceptar\n> ✎ *#no* » para rechazar.`;

      await conn.reply(m.chat, confirmationMessage, m, { mentions: [proposee, proposer] });

      confirmation[proposee] = {
        proposer,
        timeout: setTimeout(() => {
          conn.sendMessage(m.chat, { text: '*〘⌛〙Se acabó el tiempo. La propuesta de matrimonio fue cancelada.*' }, { quoted: m });
          delete confirmation[proposee];
          delete proposals[proposer];
        }, 300000) // 5 minutos
      };
    }

    else if (isDivorce) {
      if (!userIsMarried(m.sender)) throw new Error('No estás casado con nadie.');

      const partner = marriages[m.sender];
      delete marriages[m.sender];
      delete marriages[partner];
      await saveMarriages();

      await conn.reply(m.chat, `✐ ${await conn.getName(m.sender)} y ${await conn.getName(partner)} se han divorciado. ×᷼×`, m);
    }

    else if (isAccept) {
      if (!(m.sender in confirmation)) throw new Error('No tienes ninguna propuesta de matrimonio pendiente.');

      const { proposer, timeout } = confirmation[m.sender];

      marriages[proposer] = m.sender;
      marriages[m.sender] = proposer;

      delete confirmation[m.sender];
      delete proposals[proposer];
      clearTimeout(timeout);
      await saveMarriages();

      await conn.sendMessage(m.chat, {
        text: `◎ ─━──━─❖─━──━─ ◎\n¡Se han Casado! ฅ^•ﻌ•^ฅ*:･ﾟ✧\n\n*•.¸♡  ${await conn.getName(proposer)} y ${await conn.getName(m.sender)}\n\n\`Felicidades, disfruten su luna de miel\`\n◎ ─━──━─❖─━──━─ ◎`,
        mentions: [proposer, m.sender]
      }, { quoted: m });
    }

    else if (isDecline) {
      if (!(m.sender in confirmation)) throw new Error('No tienes ninguna propuesta de matrimonio pendiente.');

      const { proposer, timeout } = confirmation[m.sender];

      delete confirmation[m.sender];
      delete proposals[proposer];
      clearTimeout(timeout);

      await conn.sendMessage(m.chat, { text: '*《✧》Han rechazado tu propuesta de matrimonio.*' }, { quoted: m });
    }

  } catch (error) {
    await conn.reply(m.chat, `《✧》 ${error.message}`, m);
  }
};

handler.tags = ['fun'];
handler.help = ['marry *@usuario*', 'divorce', 'si', 'no'];
handler.command = ['marry', 'divorce', 'si', 'no'];
handler.group = true;

export default handler;