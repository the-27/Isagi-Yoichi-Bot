let handler = async (m, { conn, args }) => {
    let userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    let user = global.db.data.users[userId]
   let img = 'https://files.catbox.moe/7m1fbp.jpg'
    let name = conn.getName(userId)
    let txt = `
        ・･ ⴕ⌛𝗕꯭𝐈፝𝚵꯭𝐍፝𝐕꯭𝜩፝𝐍꯭𝐈𝗗꯭፝𝚹꯭💊᳸ⴕ₊･・
                 ᮢ ۪۪۪۪۪۪֘࣪࣪͜⏜͜𑂶ּ࣪࣪࣪࣪︵᷼ᜒ𝆬࣪࣪࣪࣪࣪ ۪۪۪۪۪۪۪   ᮬ⃘࣭࣭࣭᷼❀⃘࣭࣭࣭᷼  ᜒ𝆬 ͜ᮬ۪۪۪۪۪۪۪࣪࣪࣪࣪࣪⏜͜𑂶ּ࣪࣪࣪࣪︵۪۪۪۪۪۪࣪࣪͜  ᷑ ᮢ
ֹི࣭࣭࣭࣭࣭࣮ׅ۪۪۪۪۪۪۪۪۪ٜ࣪࣪࣪࣪᷼✾ֹྀ࣭࣭࣭࣭࣭࣮ׅ۪۪۪۪۪۪۪۪۪ٜ࣪࣪࣪࣪᷼⏝𝐌𝐄𝐍𝐔 𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀𝐒⏝ֹི࣭࣭࣭࣭࣭࣮ׅ۪۪۪۪۪۪۪۪۪ٜ࣪࣪࣪࣪᷼✾ֹྀ࣭࣭࣭࣭࣭࣮ׅ۪۪۪۪۪۪۪۪۪ٜ࣪࣪࣪࣪᷼
 ╈̷̸̳࣭࣪━╈̷̸̳࣭࣪━╈̷̸̳࣭࣪━╈̷̸̳࣭࣪━╈̷̸̳࣭࣪━╈̷̸̳࣭࣪━╈̷̸̳࣭࣪━╈̷̸̳࣭࣪━╈̷̸̳࣭࣪━━╈̷̸̳࣭࣪━╈̷̸̳࣭࣪━╈̷̸̳࣭࣪

> *Hola @${userId.split('@')[0]} aqui esta el menu de descargas.*

*ㅤ╭┅»•»💀ᬼ«•«┅┅┅𓍼𓄼𓄹᭣𓏲┅┅┅╮*
ㅤㅤㅤ         il.🅛̶̟̟̟͋͜͡🅘̶̟̟͋͜͡🅢̶̟͋͜͡🅣̶̟̟͋͜͡🅐̟̟̟̇͜.li
*ㅤ ╰┅┅┅𓍼𓄼𓄹᭣𓏲┅┅ »•»💀ᬼ«•«┅╯*

━⃨⃛━╼─╍╍╍─╍▻◅╍─╍╍╼╼━⃨⃛╍╍
❥ 🎃 _.pinterestdl *<url>*_
❥ 🎃 _.tksearch *<búsqueda>*_
❥ 🎃 _.tkseguir_
❥ 🎃 _.facebook - fb_
❥ 🎃 _.gitclone *<url git>*_
❥ 🎃 _.instagram - ig_
❥ 🎃 _.mediafire - mf_
❥ 🎃 _.mega_
❥ 🎃 _.apk_
❥ 🎃 _.npmdl_
❥ 🎃 _.pinvid *<link>*_
❥ 🎃 _.playlist_
❥ 🎃 _.play_
❥ 🎃 _.play2_
❥ 🎃 _.spotify_
❥ 🎃 _.tiktokrandom_
❥ 🎃 _.snapchat_
❥ 🎃 _.tiktok - tt_
❥ 🎃 _.tt2_
❥ 🎃 _.tiktokimg_ 
❥ 🎃 _.tiktokmp3_ 
❥ 🎃 _.audio *<url>*_
❥ 🎃 _.video *<url>*_
❥ 🎃 _.tiktokhd_
❥ 🎃 _.twitter *<url>*_
❥ 🎃 _.xnxxdl_
❥ 🎃 _.xvideosdl_
❥ 🎃 _.ytmp4doc_ 
❥ 🎃 _.kwaidl_
❥ 🎃 _.likee *<url>*_
❥ 🎃 _.ytmp3doc_ 
❥ 🎃 _.aplay2_
❥ 🎃 _.capcut *<url>*_
❥ 🎃 _.yta_
❥ 🎃 _.ytv_
❥ 🎃 _.sound_
❥ 🎃 _.play3_
❥ 🎃 _.apk2_
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

handler.help = ['menudl']
handler.tags = ['main']
handler.command = ['menudescargas', 'menudl']

export default handler
