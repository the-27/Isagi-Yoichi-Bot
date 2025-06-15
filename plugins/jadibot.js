import { readdirSync, statSync, unlinkSync, existsSync, readFileSync, watch, rmSync, promises as fsPromises } from "fs";
const fs = { ...fsPromises, existsSync };
import path, { join } from 'path' 
import ws from 'ws';

let handler = async (m, { conn: _envio, command, usedPrefix, args, text, isOwner}) => {

let img = 'https://files.catbox.moe/7m1fbp.jpg';
  
const isCommand1 = /^(deletesesion|deletebot|deletesession|deletesesaion)$/i.test(command)  
const isCommand2 = /^(stop|pausarai|pausarbot)$/i.test(command)  
const isCommand3 = /^(bots|sockets|socket)$/i.test(command)   

async function reportError(e) {
await m.reply(`${msm} Ocurrió un error.`)
console.log(e)
}

switch (true) {       
case isCommand1:
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let uniqid = `${who.split`@`[0]}`
const path = `./${jadi}/${uniqid}`

if (!await fs.existsSync(path)) {
await conn.sendMessage(m.chat, { text: `${emoji} Usted no tiene una sesión, puede crear una usando:\n${usedPrefix + command}\n\nSi tiene una *(ID)* puede usar para saltarse el paso anterior usando:\n*${usedPrefix + command}* \`\`\`(ID)\`\`\`` }, { quoted: m })
return
}
if (global.conn.user.jid !== conn.user.jid) return conn.sendMessage(m.chat, {text: `${emoji2} Use este comando al *Bot* principal.\n\n*https://api.whatsapp.com/send/?phone=${global.conn.user.jid.split`@`[0]}&text=${usedPrefix + command}&type=phone_number&app_absent=0*`}, { quoted: m }) 
else {
await conn.sendMessage(m.chat, { text: `${emoji} Tu sesión como *Sub-Bot* se ha eliminado` }, { quoted: m })}
try {
fs.rmdir(`./${jadi}/` + uniqid, { recursive: true, force: true })
await conn.sendMessage(m.chat, { text : `${emoji3} Ha cerrado sesión y borrado todo rastro.` } , { quoted: m })
} catch (e) {
reportError(e)
}  
break

case isCommand2:
if (global.conn.user.jid == conn.user.jid) conn.reply(m.chat, `${emoji} Si no es *Sub-Bot* comuníquese al numero principal del *Bot* para ser *Sub-Bot*.`, m)
else {
await conn.reply(m.chat, `${emoji} ${botname} desactivado.`, m)
conn.ws.close()}  
break

case isCommand3:
//if (global.db.data.settings[conn.user.jid].jadibotmd) return m.reply(`${emoji} Este comando está desactivado por mi creador.`)
const users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])];
function convertirMsADiasHorasMinutosSegundos(ms) {
var segundos = Math.floor(ms / 1000);
var minutos = Math.floor(segundos / 60);
var horas = Math.floor(minutos / 60);
var días = Math.floor(horas / 24);
segundos %= 60;
minutos %= 60;
horas %= 24;
var resultado = "";
if (días !== 0) {
resultado += días + "D ";
}
if (horas !== 0) {
resultado += horas + "H ";
}
if (minutos !== 0) {
resultado += minutos + "M ";
}
if (segundos !== 0) {
resultado += segundos + "S";
}
return resultado;
}
const message = users.map((v, index) => `
╭━━━━━━━━━━━━━━━━╾
╰─⬣ SUB - BOT: \`${index + 1}\`
┃⁖ฺ۟̇࣪·֗٬̤⃟🤍  *𝙐𝙎𝙐𝘼𝙍𝙄𝙊:* ${v.user.name || '𝐒𝐔𝐁 𝐁𝐎𝐓 ☘︎'}
┃⁖ฺ۟̇࣪·֗٬̤⃟⚙️ *𝙊𝙉𝙇𝙄𝙉𝙀:* ${ v.uptime ? convertirMsADiasHorasMinutosSegundos(Date.now() - v.uptime) : 'Desconocido'}
┃⁖ฺ۟̇࣪·֗٬̤⃟🍃 *𝙇𝙄𝙉𝙆:* wa.me/${v.user.jid.replace(/[^0-9]/g, '')}?text=${usedPrefix}estado
╰━━▣`).join('\n\n');
const replyMessage = message.length === 0 ? `No hay Sub-Bots disponible.` : message;
const totalUsers = users.length;
const responseMessage = `
╭═━⬣ 𝐒𝐔𝐁𝐁𝐎𝐓𝐒 𝐉𝐀𝐃𝐈𝐁𝐎𝐓 🌹
┃ 🌴 𝕆ℕ𝕃𝕀ℕ𝔼: *${totalUsers ||'0'}* ⚽
╰═━━━━━━━━━━━━━━━━⬣\n
${replyMessage.trim()}\n═══════◆🎨◈🔗◆═══════`.trim();

await _envio.sendFile( m.chat, img, 'jadibot.jpg', responseMessage, m, null, fake, fkontak, false, { mentions: _envio.parseMention(responseMessage) })
break   
}}

handler.tags = ['serbot']
handler.help = ['sockets', 'deletesesion', 'pausarai']
handler.command = ['deletesesion', 'deletebot', 'deletesession', 'deletesession', 'stop', 'pausarai', 'pausarbot', 'bots', 'sockets', 'socket']

export default handler