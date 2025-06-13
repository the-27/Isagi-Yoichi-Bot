// Bank Editado Por Cuervo
//★彡[ᴄʀᴇᴀᴛᴇ ʙʏ ᴄᴜᴇʀᴠᴏ-ᴛᴇᴀᴍ-ꜱᴜᴘʀᴇᴍᴇ]彡★
// Respeten credito xddddd (ratas inmundas)

import fetch from 'node-fetch'
import db from '../lib/database.js'
let img = 'https://files.catbox.moe/x81ait.jpg'
let handler = async (m, {conn, usedPrefix}) => {
   let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender
   if (who == conn.user.jid) return m.react('✖️')
   if (!(who in global.db.data.users)) return m.reply(`*${emoji4} El usuario no se encuentra en mi base de datos.*`)
   let user = global.db.data.users[who]
   let name = conn.getName(who);
   let txt = (`${who == m.sender ? `⪛⌬ \`🄱🄰🄽🄲🄾 - 🄲🄴🄽🅃🅁🄰🄻\` ✭⪜\n╭╼━━▣\n┇ᰔᩚ ᥙsᥙᥲrі᥆ » *${name}*\n┇⛀ ძіᥒᥱr᥆ » *${user.coin} ${moneda}*\n┇⚿ ᑲᥲᥒᥴ᥆ » *${user.bank} ${moneda}*\n┇あ E᥊⍴ᥱrіᥱᥒᥴіᥲ » *${user.exp}*\n┇◭ ᥒі᥎ᥱᥣ » *${user.level}*\n┇⚡︎ Rᥲᥒg᥆ » ${user.role}\n┇ ⎙ 𝖿ᥱᥴһᥲ » *${new Date().toLocaleString('id-ID')}*\n╰╼━━▣\n> *⍴ᥲrᥲ ⍴r᥆𝗍ᥱgᥱr 𝗍ᥙ ძіᥒᥱr᥆, ¡ძᥱ⍴ósі𝗍ᥲᥣ᥆ ᥱᥒ ᥱᥣ ᑲᥲᥒᥴ᥆ ᥙsᥲᥒძ᥆*\n> » *#deposit*` : `╭━〔  ${packname}  〕⬣\n┋ 👤 *Usuario:* @${who.split('@')[0]}\n┋ 💸 *${moneda} En Cartera*: ${user.coin}\n┋ 🏦 *${moneda} En Banco*: ${user.bank}\n┋ *✨ Experiencia:* ${user.exp}\n┋ 🆙 *Nivel:* ${user.level}\n┋ ⚜️ *Rol:* ${user.role}\n┋ 📅 *Fecha:* ${new Date().toLocaleString('id-ID')}\n╰━━━━━━━━━━━━⬣`}`)
await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, fkontak, null, {mentions: [who] })
}

handler.help = ['bank']
handler.tags = ['rpg']
handler.command = ['bal', 'balance', 'bank']
handler.register = true 
handler.group = true

export default handler 
