let handler = async (m, { conn, text, mentionedJid }) => {
  let target

  if (mentionedJid.length > 0) {
    target = mentionedJid[0]
  } else if (text) {
    let num = text.replace(/[^0-9]/g, '')
    if (num.length < 8) return
    target = num + '@s.whatsapp.net'
  } else return

  let cleanNum = target.split('@')[0]

  await conn.sendMessage(m.chat, {
    text: `https://wa.me/${cleanNum}?text=report`,
    mentions: [target]
  }, { quoted: m })
}

handler.command = ['tumbar']
handler.owner = false
handler.mods = false
handler.premium = true
handler.group = false
handler.private = false
handler.admin = false
handler.botAdmin = false
handler.fail = null

export default handler