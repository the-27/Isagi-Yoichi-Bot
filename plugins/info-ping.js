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