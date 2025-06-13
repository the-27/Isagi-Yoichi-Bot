let handler = async (m, { conn, args }) => {
    let userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    let user = global.db.data.users[userId]
    let img = 'https://files.catbox.moe/7m1fbp.jpg'
    let name = conn.getName(userId)
    let txt = `
        ・･ ⴕ⌛𝗕꯭𝐈፝𝚵꯭𝐍፝𝐕꯭𝜩፝𝐍꯭𝐈𝗗꯭፝𝚹꯭💊᳸ⴕ₊･・
                 ᮢ ۪۪۪۪۪۪֘࣪࣪͜⏜͜𑂶ּ࣪࣪࣪࣪︵᷼ᜒ𝆬࣪࣪࣪࣪࣪ ۪۪۪۪۪۪۪   ᮬ⃘࣭࣭࣭᷼❀⃘࣭࣭࣭᷼  ᜒ𝆬 ͜ᮬ۪۪۪۪۪۪۪࣪࣪࣪࣪࣪⏜͜𑂶ּ࣪࣪࣪࣪︵۪۪۪۪۪۪࣪࣪͜  ᷑ ᮢ
ֹི࣭࣭࣭࣭࣭࣮ׅ۪۪۪۪۪۪۪۪۪ٜ࣪࣪࣪࣪᷼✾ֹྀ࣭࣭࣭࣭࣭࣮ׅ۪۪۪۪۪۪۪۪۪ٜ࣪࣪࣪࣪᷼⏝𝐌𝐄𝐍𝐔 𝐒𝐄𝐀𝐑𝐂𝐇⏝ֹི࣭࣭࣭࣭࣭࣮ׅ۪۪۪۪۪۪۪۪۪ٜ࣪࣪࣪࣪᷼✾ֹྀ࣭࣭࣭࣭࣭࣮ׅ۪۪۪۪۪۪۪۪۪ٜ࣪࣪࣪࣪᷼
 ╈̷̸̳࣭࣪━╈̷̸̳࣭࣪━╈̷̸̳࣭࣪━╈̷̸̳࣭࣪━╈̷̸̳࣭࣪━╈̷̸̳࣭࣪━╈̷̸̳࣭࣪━╈̷̸̳࣭࣪━╈̷̸̳࣭࣪━━╈̷̸̳࣭࣪━╈̷̸̳࣭࣪━╈̷̸̳࣭࣪

> *Hola @${userId.split('@')[0]} aqui esta el menu search.*

*ㅤ╭┅»•»💀ᬼ«•«┅┅┅𓍼𓄼𓄹᭣𓏲┅┅┅╮*
               il.🅛̶̟̟̟͋͜͡🅘̶̟̟͋͜͡🅢̶̟͋͜͡🅣̶̟̟͋͜͡🅐̟̟̟̇͜.li
*ㅤ╰┅┅┅𓍼𓄼𓄹᭣𓏲┅┅ »•»💀ᬼ«•«┅╯*

━⃨⃛━╼─╍╍╍─╍▻◅╍─╍╍╼╼━⃨⃛╍╍
❥ 🌲 _.searchhentai_
❥ 🌲 _.cuevanasearch_
❥ 🌲 _.githubsearch_
❥ 🌲 _.google_
❥ 🌲 _.imagen *<query>*_
❥ 🌲 _.infoanime_
❥ 🌲 _.npmjs_
❥ 🌲 _.pinterest *<query>*_
❥ 🌲 _.pornhubsearch_
❥ 🌲 _.soundcloudsearch *<texto>*_
❥ 🌲 _.spotifysearch *<texto>*_
❥ 🌲 _.tiktoksearch *<txt>*_
❥ 🌲 _.tweetposts_
❥ 🌲 _.xnxxsearch *<query>*_
❥ 🌲 _.xvideossearch_
❥ 🌲 _.ytsearch_
❥ 🌲 _.ytsearch2 *<text>*_
❥ 🎃 _.mods *<query>*_

ֹི࣭࣭࣭࣭࣭࣮ׅ۪۪۪۪۪۪۪۪۪ٜ࣪࣪࣪࣪᷼✾ֹྀ࣭࣭࣭࣭࣭࣮ׅ۪۪۪۪۪۪۪۪۪ٜ࣪࣪࣪࣪᷼⏝𝐒𝐓𝐀𝐋𝐊⏝ֹི࣭࣭࣭࣭࣭࣮ׅ۪۪۪۪۪۪۪۪۪ٜ࣪࣪࣪࣪᷼✾ֹྀ࣭࣭࣭࣭࣭࣮ׅ۪۪۪۪۪۪۪۪۪ٜ࣪࣪࣪࣪᷼

❥ 📚 _.githubstalk *<query>*_
❥ 🔥 _.minestalk *<nombrejugador>*_
❥ 🏔️ _.kwaistalk *<usuario>*_
❥ 🍓 _.telegramstalk *<nombre_usuario>*_
❥ 🌿 _.tiktokstalk *<usuario>*_
❥ 🍬 _.youtubestalk *<nombre de usuario>*_
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

handler.help = ['menusearch']
handler.tags = ['main']
handler.command = ['menusearch', 'menuse']

export default handler
