import ws from 'ws'
let handler = async (m, { conn, usedPrefix, isRowner}) => {
let _uptime = process.uptime() * 1000;
let totalreg = Object.keys(global.db.data.users).length
let totalchats = Object.keys(global.db.data.chats).length

let uptime = clockString(_uptime);
let users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])];
const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
const groupsIn = chats.filter(([id]) => id.endsWith('@g.us')) 
const totalUsers = users.length;
let old = performance.now()
let neww = performance.now()
let speed = neww - old
const used = process.memoryUsage()
let info = `╭╼⬪࣪      ✧.ɪɴғᴏʀᴍᴀᴄɪᴏɴ ᴅᴇ ${botname}.✧\n`
info += `┃֪࣪\n`
info += `├ׁ̟̇✎.਼ ⃝֟፝˖့᜔݊ᰔᩚ  *𝙲𝚁𝙴𝙰𝙳𝙾𝚁* ⇢ ${etiqueta}\n`
info += `├ׁ̟̇✎.਼ ⃝֟፝˖့᜔݊🜸  *𝙿𝚁𝙴𝙵𝙸𝙹𝙾* ⇢ [ ${usedPrefix} ]\n`
info += `├ׁ̟̇✎.਼ ⃝֟፝˖့᜔݊✧  *𝚅𝙴𝚁𝚂𝙸𝙾𝙽* ⇢ ${vs}\n`
info += `├ׁ̟̇✎.਼ ⃝֟፝˖့᜔݊❖  *𝙲𝙷𝚃𝙰𝚂 𝙿𝚁𝙸𝚅𝙰𝙳𝙾𝚂* ⇢ ${chats.length - groupsIn.length}\n`
info += `├ׁ̟̇✎.਼ ⃝֟፝˖့᜔݊✎  *𝚃𝙾𝚃𝙰𝙻 𝙳𝙴 𝙲𝙷𝙰𝚃𝚂* ⇢ ${chats.length}\n`
info += `├ׁ̟̇✎.਼ ⃝֟፝˖့᜔݊✦  *𝚄𝚁𝚄𝙰𝚁𝙸𝙾𝚂* ⇢ ${totalreg}\n`
info += `├ׁ̟̇✎.਼ ⃝֟፝˖့᜔݊❑  *𝙶𝚁𝚄𝙿𝙾𝚂* ⇢ ${groupsIn.length}\n`
info += `├ׁ̟̇✎.਼ ⃝֟፝˖့᜔݊✰  *𝙰𝙲𝚃𝙸𝚅𝙸𝙳𝙰𝙳* ⇢ ${uptime}\n`
info += `├ׁ̟̇✎.਼ ⃝֟፝˖့᜔݊ⴵ  *𝚅𝙴𝙻𝙾𝙲𝙸𝙳𝙰𝙳* ⇢ ${(speed * 1000).toFixed(0) / 1000}\n`
info += `├ׁ̟̇✎.਼ ⃝֟፝˖့᜔݊✦  *𝚂𝚄𝙱𝙱𝙾𝚃𝚂 𝙰𝙲𝚃𝙸𝚅𝙾𝚂*\n`
info += `├ׁ̟̇✎.਼ ⃝֟፝˖့᜔݊✎⇢ ${totalUsers || '0'}\n`
info += `╰╼⬪࣪ ּּּ ּ｡･ﾟ♡ﾟ･｡.｡･ﾟ♡ﾟ･｡.｡･ﾟ♡ﾟ･｡`
await conn.sendFile(m.chat, avatar, 'estado.jpg', info, fkontak)
}
handler.help = ['estado']
handler.tags = ['info']
handler.command = ['estado', 'status', 'estate', 'state', 'stado', 'stats']
handler.register = true

export default handler

function clockString(ms) {
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);
    let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    return `${hours}h ${minutes}m ${seconds}s`;
}
