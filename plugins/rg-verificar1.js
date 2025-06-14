import db from '../lib/database.js'
import fs from 'fs'
import PhoneNumber from 'awesome-phonenumber'
import { createHash } from 'crypto'  
import fetch from 'node-fetch'
import moment from 'moment-timezone' // Asegúrate de tener esto instalado

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async function (m, { conn, text, usedPrefix, command }) {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let mentionedJid = [who]

  let sinDefinir = '🦥 Es privada'
  let bio = sinDefinir
  let fechaBio = "Fecha no disponible"
  let statusData = await conn.fetchStatus(m.sender).catch(() => null)

  if (statusData && statusData.status !== null) {
    bio = statusData.status || sinDefinir
    fechaBio = statusData.setAt ? new Date(statusData.setAt).toLocaleDateString("es-ES", {
      day: "2-digit", month: "2-digit", year: "numeric"
    }) : "Fecha no disponible"
  }

  let perfil = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://files.catbox.moe/9di0ft.jpg')
  let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://i.ibb.co/Jww0n5FY/file.jpg')

  let user = global.db.data.users[m.sender]
  let name2 = await conn.getName(m.sender)

  if (user.registered === true)
    return m.reply(`『✦』𝗬𝗮 𝗲𝘀𝘁𝗮𝘀 𝗿𝗲𝗴𝗶𝘀𝘁𝗿𝗮𝗱𝗼.\n\n¿𝗤𝘂𝗶𝗲𝗿𝗲𝘀 𝘃𝗼𝗹𝘃𝗲𝗿 𝗮 𝗿𝗲𝗴𝗶𝘀𝘁𝗿𝗮𝗿𝘁𝗲?\n\n𝘂𝘀𝗮 *${usedPrefix}unreg*`)

  if (!Reg.test(text))
    return m.reply(`『✦』𝙵𝙾𝚁𝙼𝙰𝚃𝙾 𝙸𝙽𝙲𝙾𝚁𝚁𝙴𝙲𝚃𝙾.\n\n𝚄𝚂𝙾: *${usedPrefix + command} nombre.edad*\n𝗘𝗝𝗘𝗠𝗣𝗟𝗢 : *${usedPrefix + command} ${name2}.18*`)

  let [_, name, , age] = text.match(Reg)
  if (!name) return m.reply('『✦』El nombre no puede estar vacío.')
  if (!age) return m.reply('『✦』La edad no puede estar vacía.')
  if (name.length >= 100) return m.reply('『✦』Nombre demasiado largo.')

  age = parseInt(age)
  if (isNaN(age) || age < 5 || age > 1000) return m.reply('『✦』Edad incorrecta.')

  user.name = name.trim() + '✓'
  user.age = age
  user.descripcion = bio
  user.regTime = +new Date()
  user.registered = true
  user.coin = (user.coin || 0) + 40
  user.exp = (user.exp || 0) + 300
  user.joincount = (user.joincount || 0) + 20

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
        title: '୧⍤⃝⋆⌣⋆ 𝑼𝒔𝒖𝒂𝒓𝒊𝒐 𝑽𝒆𝒓𝒆𝒇𝒊𝒄𝒂𝒅𝒐 ❛░⃟ ⃟°˟',
        body: textbot,
        thumbnailUrl: pp,
        sourceUrl: channel,
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m })

  let chtxt = `⚔️ੈ₊˚༅༴│.👤 *🅄USER* » ${m.pushName || 'Anónimo'}
⚡ੈ₊˚༅༴│.🍰 *🅅ERIFICACION* » ${user.name}
🍬ੈ₊˚༅༴│.⚙️ *🄴DAD* » ${user.age} años
☁️ੈ₊˚༅༴│.⌨️ *🄳ESCRIPCION* » ${user.descripcion}
🍫ੈ₊˚༅༴│.📆 *🄵ECHA* » ${moment.tz('America/Bogota').format('DD/MM/YY')}
❄️ੈ₊˚༅༴│.🌸 *🄽UMERO DE REGISTRO* » ⤷ ${sn}`

  let channelID = '120363420779887484@g.us'
  await conn.sendMessage(channelID, {
    text: chtxt,
    contextInfo: {
      externalAdReply: {
        title: "【 🍃 𝐍𝐎𝐓𝐈𝐅𝐈𝐂𝐀𝐂𝐈𝐎́𝐍 𝐃𝐄 𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐎 🏔️ 】",
        body: '😞 ¡𝚄𝚗 𝚞𝚜𝚞𝚊𝚛𝚒𝚘 𝚗𝚞𝚎𝚟𝚘 𝚎𝚗 𝚖𝚒 𝚋𝚊𝚜𝚎 𝚍𝚎 𝚍𝚊𝚝𝚘𝚜!',
        thumbnailUrl: perfil,
        sourceUrl: redes,
        mediaType: 1,
        showAdAttribution: false,
        renderLargerThumbnail: false
      }
    }
  }, { quoted: null })
}

handler.help = ['reg1']
handler.tags = ['rg']
handler.command = ['reg1']

export default handler