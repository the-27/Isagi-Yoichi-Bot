/*
import db from '../lib/database.js'
import fs from 'fs'
import PhoneNumber from 'awesome-phonenumber'
import { createHash } from 'crypto'  
import fetch from 'node-fetch'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async function (m, { conn, text, usedPrefix, command }) {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let mentionedJid = [who]
  let pp = await conn.profilePictureUrl(who, 'image').catch((_) => 'https://files.catbox.moe/xr2m6u.jpg')
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)
  if (user.registered) {
    return conn.sendMessage(m.chat, {
      text: `『✦』𝗬𝗮 𝗲𝘀𝘁𝗮𝘀 𝗿𝗲𝗴𝗶𝘀𝘁𝗿𝗮𝗱𝗼.\n\n¿𝗤𝘂𝗶𝗲𝗿𝗲𝘀 𝘃𝗼𝗹𝘃𝗲𝗿 𝗮 𝗿𝗲𝗴𝗶𝘀𝘁𝗿𝗮𝗿𝘁𝗲?\n\n𝘂𝘀𝗮 𝗲𝗹 𝗰𝗼𝗺𝗮𝗻𝗱𝗼 𝗽𝗮𝗿𝗮 𝗲𝗹𝗶𝗺𝗶𝗻𝗮𝗿 𝘀𝘂 𝗿𝗲𝗴𝗶𝘀𝘁𝗿𝗼.`,
      footer: "🏔️ ISAGI - ULTRA ⚽",
      buttons: [{ buttonId: `${usedPrefix}unreg`, buttonText: { displayText: '⋆🌿 ᥙᥒrᥱg'}, type: 1}],
      headerType: 1
    }, { quoted: m});
  }
  if (!Reg.test(text)) return m.reply(`『✦』𝙵𝙾𝚁𝙼𝙰𝚃𝙾 𝙸𝙽𝙲𝙾𝚁𝚁𝙴𝙲𝚃𝙾.\n\n𝚄𝚂𝙾 𝙳𝙴𝙻 𝙲𝙾𝙼𝙰𝙽𝙳𝙾: *${usedPrefix + command} nombre.edad*\n𝗘𝗝𝗘𝗠𝗣𝗟𝗢 : *${usedPrefix + command} ${name2}.18*`)
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) return m.reply(`『✦』𝑬𝒍 𝒏𝒐𝒎𝒃𝒓𝒆 𝒏𝒐 𝒑𝒖𝒆𝒅𝒆 𝒆𝒔𝒕𝒂𝒓 𝒗𝒂𝒄𝒊𝒐.`)
  if (!age) return m.reply(`『✦』𝑳𝒂 𝒆𝒅𝒂𝒅 𝒏𝒐 𝒑𝒖𝒆𝒅𝒆 𝒆𝒔𝒕𝒂𝒓 𝒗𝒂𝒄𝒊𝒂.`)
  if (name.length >= 100) return m.reply(`『✦』El nombre es demasiado largo.`)
  age = parseInt(age)
  if (age > 1000) return m.reply(`『✦』 *ʟᴀ ᴇᴅᴀᴅ ɪɴɢʀᴇsᴀᴅᴀ ᴇs ɪɴᴄᴏʀʀᴇᴄᴛᴀ*.`)
  if (age < 5) return m.reply(`『✦』 *ʟᴀ ᴇᴅᴀᴅ ɪɴɢʀᴇsᴀᴅᴀ ᴇs ɪɴᴄᴏʀʀᴇᴄᴛᴀ*.`)
  user.name = name + '✓'.trim()
  user.age = age
  user.regTime = + new Date      
  user.registered = true
  global.db.data.users[m.sender].coin += 40
  global.db.data.users[m.sender].exp += 300
  global.db.data.users[m.sender].joincount += 20
  let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 20)
let regbot = `┏━┅═┅═━❏\n`
regbot += `│┏─────┈\n`
regbot += `│┆ 𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐎 - 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐎 \n`
regbot += `│└───────────────┈\n`
regbot += `│Ự⵿꤬ᩚ̸̷͠ᩘ𝑵𝒐𝒎𝒃𝒓𝒆̷̸ᩚ⃨⢾ ${name}\n`
regbot += `│ൃശ⵿꤬ᩚ̸̷͠ᩘ𝑬𝒅𝒂𝒅̷̸ᩚ⃨⢾ ${age} años\n`
regbot += `│========= • ✠ • =========\n`
regbot += `│ ❂ 🎁 𝗥𝗲𝗰𝗼𝗺𝗽𝗲𝗻𝘀𝗮𝘀:\n`
regbot += `│========= • ✠ • =========\n`
regbot += `│ ۚ𑁯ׂᰍ ⛁ ᳴ ׅ ׄʚ ̶ \`𝙲𝙾𝙸𝙽𝚂:\` 40\n`
regbot += `│ ۚ𑁯ׂᰍ ✰ ᳴ ׅ ׄʚ ̶̶ \`𝙴𝚇𝙿𝙴𝚁𝙸𝙴𝙽𝙲𝙸𝙰:\` 300\n`
regbot += `│ ۚ𑁯ׂᰍ ❖ ᳴ ׅ ׄʚ ̶ \`𝚃𝙾𝙺𝙴𝙽𝚂'\` 20\n`
regbot += `┗━━━━━━━━━━━━━━━━━┛\n`
regbot += `> ׄ 𝅄ׁ֢◯⃟▒ ꕀ▿⃟⃞🌴 ◯⃝◦・ׄ. _Usa #𝗽𝗲𝗿𝗳𝗶𝗹 para ver tu perfil. 🔥_`
await m.react('📩')

await conn.sendMessage(m.chat, {
        text: regbot,
        contextInfo: {
            externalAdReply: {
                title: '୧⍤⃝⋆⌣⋆ 𝑼𝒔𝒖𝒓𝒂𝒓𝒊𝒐 𝑽𝒆𝒓𝒆𝒇𝒊𝒄𝒂𝒅𝒐 ❛░⃟ ⃟°˟',
                body: textbot,
                thumbnailUrl: pp,
                sourceUrl: channel,
                mediaType: 1,
                showAdAttribution: true,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });    
}; 
handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar'] 

export default handler
*/

import db from '../lib/database.js'
import fs from 'fs'
import PhoneNumber from 'awesome-phonenumber'
import { createHash } from 'crypto'  
import fetch from 'node-fetch'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async function (m, { conn, text, usedPrefix, command }) {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let mentionedJid = [who]
  let pp = await conn.profilePictureUrl(who, 'image').catch((_) => 'https://files.catbox.moe/xr2m6u.jpg')
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)

  if (user.registered) {
    return conn.sendMessage(m.chat, {
      text: `『✦』𝗬𝗮 𝗲𝘀𝘁𝗮𝘀 𝗿𝗲𝗴𝗶𝘀𝘁𝗿𝗮𝗱𝗼.\n\n¿𝗤𝘂𝗶𝗲𝗿𝗲𝘀 𝘃𝗼𝗹𝘃𝗲𝗿 𝗮 𝗿𝗲𝗴𝗶𝘀𝘁𝗿𝗮𝗿𝘁𝗲?\n\n𝘂𝘀𝗮 𝗲𝗹 𝗰𝗼𝗺𝗮𝗻𝗱𝗼 𝗽𝗮𝗿𝗮 𝗲𝗹𝗶𝗺𝗶𝗻𝗮𝗿 𝘀𝘂 𝗿𝗲𝗴𝗶𝘀𝘁𝗿𝗼.`,
      footer: "🏔️ ISAGI - ULTRA ⚽",
      buttons: [{ buttonId: `${usedPrefix}unreg`, buttonText: { displayText: '⋆🌿 ᥙᥒrᥱg' }, type: 1 }],
      headerType: 1
    }, { quoted: m });
  }

  if (!Reg.test(text)) {
    return conn.sendMessage(m.chat, {
      text: `『✦』𝙵𝙾𝚁𝙼𝙰𝚃𝙾 𝙸𝙽𝙲𝙾𝚁𝚁𝙴𝙲𝚃𝙾.\n\n𝚄𝚂𝙾 𝙳𝙴𝙻 𝙲𝙾𝙼𝙰𝙽𝙳𝙾: *${usedPrefix + command} nombre.edad*\n𝗘𝗝𝗘𝗠𝗣𝗟𝗢 : *${usedPrefix + command} ${name2}.18*`,
      footer: "🏔️ ISAGI - ULTRA ⚽",
      buttons: [{ buttonId: `#register ${name2}.18`, buttonText: { displayText: '⋆🍓 ᥎ᥱrі𝖿іᥴᥲr' }, type: 1 }],
      headerType: 1
    }, { quoted: m });
  }

  let [_, name, splitter, age] = text.match(Reg)
  if (!name) return m.reply(`『✦』𝑬𝒍 𝒏𝒐𝒎𝒃𝒓𝒆 𝒏𝒐 𝒑𝒖𝒆𝒅𝒆 𝒆𝒔𝒕𝒂𝒓 𝒗𝒂𝒄𝒊𝒐.`)
  if (!age) return m.reply(`『✦』𝑳𝒂 𝒆𝒅𝒂𝒅 𝒏𝒐 𝒑𝒖𝒆𝒅𝒆 𝒆𝒔𝒕𝒂𝒓 𝒗𝒂𝒄𝒊𝒂.`)
  if (name.length >= 100) return m.reply(`『✦』El nombre es demasiado largo.`)
  age = parseInt(age)
  if (age > 1000 || age < 5) return m.reply(`『✦』 *ʟᴀ ᴇᴅᴀᴅ ɪɴɢʀᴇsᴀᴅᴀ ᴇs ɪɴᴄᴏʀʀᴇᴄᴛᴀ*.`)

  user.name = name + '✓'.trim()
  user.age = age
  user.regTime = +new Date      
  user.registered = true
  global.db.data.users[m.sender].coin += 40
  global.db.data.users[m.sender].exp += 300
  global.db.data.users[m.sender].joincount += 20

  let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 20)

  let regbot = `┏━┅═┅═━❏\n`
  regbot += `│┏─────┈\n`
  regbot += `│┆ 𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐎 - 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐎 \n`
  regbot += `│└───────────────┈\n`
  regbot += `│Ự⵿꤬ᩚ̸̷͠ᩘ𝑵𝒐𝒎𝒃𝒓𝒆̷̸ᩚ⃨⢾ ${name}\n`
  regbot += `│ൃശ⵿꤬ᩚ̸̷͠ᩘ𝑬𝒅𝒂𝒅̷̸ᩚ⃨⢾ ${age} años\n`
  regbot += `│========= • ✠ • =========\n`
  regbot += `│ ❂ 🎁 𝗥𝗲𝗰𝗼𝗺𝗽𝗲𝗻𝘀𝗮𝘀:\n`
  regbot += `│========= • ✠ • =========\n`
  regbot += `│ ۚ𑁯ׂᰍ ⛁ \`𝙲𝙾𝙸𝙽𝚂:\` 40\n`
  regbot += `│ ۚ𑁯ׂᰍ ✰ \`𝙴𝚇𝙿𝙴𝚁𝙸𝙴𝙽𝙲𝙸𝙰:\` 300\n`
  regbot += `│ ۚ𑁯ׂᰍ ❖ \`𝚃𝙾𝙺𝙴𝙽𝚂:\` 20\n`
  regbot += `┗━━━━━━━━━━━━━━━━━┛\n`
  regbot += `> ꕀ▿⃟⃞🌴 Usa *#perfil* para ver tu perfil.`

  await m.react('📩')

  await conn.sendMessage(m.chat, {
    text: regbot,
    contextInfo: {
      externalAdReply: {
        title: '୧⍤⃝⋆⌣⋆ 𝑼𝒔𝒖𝒂𝒓𝒊𝒐 𝑽𝒆𝒓𝒊𝒇𝒊𝒄𝒂𝒅𝒐 ❛░⃟ ⃟°˟',
        body: dev,
        thumbnailUrl: pp,
        sourceUrl: channel,
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });
};

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar']

export default handler