/*
import speed from 'performance-now'
import { spawn, exec, execSync } from 'child_process'

let handler = async (m, { conn }) => {
let timestamp = speed()
let sentMsg = await conn.reply(m.chat, '*🚀 Calculando ping...*', m)
let latency = speed() - timestamp
exec(`neofetch --stdout`, (error, stdout, stderr) => {
let child = stdout.toString("utf-8");
let ssd = child.replace(/Memory:/, "Ram:")

let result = `✰ *¡Pong!*\n╭────────────╮\n> Tiempo ⴵ ${latency.toFixed(4).split(".")[0]}ms\n${ssd}\n╰────────────╯`
conn.sendMessage(m.chat, { text: result, edit: sentMsg.key }, { quoted: m })
})
}
handler.help = ['ping']
handler.tags = ['info']
handler.command = ['ping', 'p']

export default handler
*/


import speed from 'performance-now'
import { exec } from 'child_process'

let handler = async (m, { conn }) => {
  let timestamp = speed();
  let latensi = speed() - timestamp;

  exec(`neofetch --stdout`, (error, stdout, stderr) => {
    let sysinfo = stdout.toString("utf-8").replace(/Memory:/, "Ram:");

    const ping = `
╭━━━⊰ 👾 *Isagi-Yoichi* ⚽ ⊱━━━╮
┃ 🍂 *Estado:* ¡Activo ! 
┃ 🕒 *Velocidad:* ${latensi.toFixed(4)} ms
┃ 📊 *Sistema:*
┃ ${sysinfo.split('\n').slice(1, 7).join('\n┃ ')}
╰━━━━━━━━━━━━━━━━━━━━━━━╯
`.trim();

    conn.reply(m.chat, ping, fkontak, rcanal);
  });
}

handler.help = ['ping']
handler.tags = ['info']
handler.command = ['ping', 'p']
handler.register = true

export default handler