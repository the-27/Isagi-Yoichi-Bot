let handler = async (m, { conn, args }) => {
    let userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    let user = global.db.data.users[userId]
    let img = 'https://files.catbox.moe/7m1fbp.jpg'
    let name = conn.getName(userId)
    let txt = `
                 ᮢ ۪۪۪۪۪۪֘࣪࣪͜⏜͜𑂶ּ࣪࣪࣪࣪︵᷼ᜒ𝆬࣪࣪࣪࣪࣪ ۪۪۪۪۪۪۪   ᮬ⃘࣭࣭࣭᷼❀⃘࣭࣭࣭᷼  ᜒ𝆬 ͜ᮬ۪۪۪۪۪۪۪࣪࣪࣪࣪࣪⏜͜𑂶ּ࣪࣪࣪࣪︵۪۪۪۪۪۪࣪࣪͜  ᷑ ᮢ
ֹི࣭࣭࣭࣭࣭࣮ׅ۪۪۪۪۪۪۪۪۪ٜ࣪࣪࣪࣪᷼✾ֹྀ࣭࣭࣭࣭࣭࣮ׅ۪۪۪۪۪۪۪۪۪ٜ࣪࣪࣪࣪᷼⏝𝐌𝐄𝐍𝐔 𝐑𝐏𝐆 - 𝐄𝐂𝐎𝐍𝐎𝐌𝐈𝐀⏝ֹི࣭࣭࣭࣭࣭࣮ׅ۪۪۪۪۪۪۪۪۪ٜ࣪࣪࣪࣪᷼✾ֹྀ࣭࣭࣭࣭࣭࣮ׅ۪۪۪۪۪۪۪۪۪ٜ࣪࣪࣪࣪᷼
 ╈̷̸̳࣭࣪━╈̷̸̳࣭࣪━╈̷̸̳࣭࣪━╈̷̸̳࣭࣪━╈̷̸̳࣭࣪━╈̷̸̳࣭࣪━╈̷̸̳࣭࣪━╈̷̸̳࣭࣪━╈̷̸̳࣭࣪━━╈̷̸̳࣭࣪━╈̷̸̳࣭࣪━╈̷̸̳࣭࣪

> 💰🎮⊹ 𝐂𝐨𝐦𝐚𝐧𝐝𝐨𝐬 𝐝𝐞 𝐞𝐜𝐨𝐧𝐨𝐦𝐢́𝐚 𝐲 𝐑𝐏𝐆 𝐩𝐚𝐫𝐚 𝐠𝐚𝐧𝐚𝐫 𝐝𝐢𝐧𝐞𝐫𝐨 𝐲 𝐨𝐭𝐫𝐨𝐬 𝐫𝐞𝐜𝐮𝐫𝐬𝐨𝐬 🏆💎⊹


━⃨⃛━╼─╍╍╍─╍▻◅╍─╍╍╼╼━⃨⃛╍╍
❖─┅─┅〈 𝑹 𝑷 𝑮
┃𐇛 .aventura
┃𐇛 .baltop
┃𐇛 .berburu
┃𐇛 .bank
┃𐇛 .cofre
┃𐇛 .depositar
┃𐇛 .explorar
┃𐇛 .gremio
┃𐇛 .halloween
┃𐇛 .heal
┃𐇛 .inventario
┃𐇛 .mazmorra
┃𐇛 .monthly
┃𐇛 .retirar
┃𐇛 .navidad
┃𐇛 .robar
┃𐇛 .protituirse
┃𐇛 .weekly
┃𐇛 .pay
╰━≡

❖─┅─┅〈 𝑬𝑪𝑶𝑵𝑶𝑴𝑰𝑨
┃⛨ .canjear <código>
┃⛨ .wallet
┃⛨ .apostar *<cantidad>*
┃⛨ .cf
┃⛨ .crimen
┃⛨ .daily
┃⛨ .minar
┃⛨ .robarxp
┃⛨ .buy - Buyall
┃⛨ .ruleta *<cantidad> <color>*
┃⛨ .trabajar
┃⛨ .slot <apuesta>
╰━≡
━⃨⃛━╼─╍╍╍─╍▻◅╍─╍╍╼╼━⃨⃛╍╍
`.trim()

  await conn.sendMessage(m.chat, { 
      text: txt,
      contextInfo: {
          mentionedJid: [m.sender, userId],
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
              newsletterJid: channelRD.id,
              newsletterName: channelRD.name,
              serverMessageId: -1,
          },
          forwardingScore: 999,
          externalAdReply: {
              title: botname,
              body: textbot,
              thumbnailUrl: img,
              sourceUrl: redes,
              mediaType: 1,
              showAdAttribution: true,
              renderLargerThumbnail: true,
          },
      },
  }, { quoted: m })

}

handler.help = ['menurpg']
handler.tags = ['main']
handler.command = ['menur', 'menurpg']

export default handler
