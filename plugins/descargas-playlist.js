import yts from 'yt-search';

let handler = async (m, { conn, usedPrefix, text, command}) => {
    if (!text) {
        return conn.reply(m.chat,
            "🌴 *Por favor, escribe el nombre de un video o canal de YouTube.*",
            m.sender, m
        );
    }

    try {
        let result = await yts(text);
        let ytres = result.videos;

        if (!ytres || ytres.length === 0) {
            return conn.reply(m.chat, "❌ No se encontraron resultados para tu búsqueda.", m);
    }

        let listSections = ytres.map(v => ({
            title: "🔎 𝗥𝗲𝘀𝘂𝗹𝘁𝗮𝗱𝗼 𝗱𝗲 𝗹𝗮 𝗯𝘂𝘀𝗾𝘂𝗲𝗱𝗮",
            rows: [
                { 
                   title: "🎵 Audio",
                   description: `${v.title} | ${v.timestamp}`,
                   id: `${usedPrefix}yta ${v.url}`
                },
                { 
                   title: "🎥 Video",
                   description: `${v.title} | ${v.timestamp}`, 
                   id: `${usedPrefix}ytv ${v.url}`
                },
                { 
                   title: "📜 Audio (Doc)",
                   description: `${v.title} | ${v.timestamp}`,
                   id: `${usedPrefix}ytmp3doc ${v.url}`
                },
                { 
                   title: "📜 Video (Doc)", 
                   description: `${v.title} | ${v.timestamp}`, 
                   id: `${usedPrefix}ytmp4doc ${v.url}`
                }
            ]
    }));

        await conn.sendList(m.chat,
            "*📜 Resultados de búsqueda*",
            `🔍 𝙏𝙚𝙧𝙢𝙞𝙣𝙤: ${text}`,
            "✅ 𝚂𝙴𝙻𝙴𝙲𝙲𝙸𝙾𝙽𝙴 𝚄𝙽𝙰 𝙾𝙿𝙲𝙸𝙾𝙽:",
            listSections,
            m.sender
        );
    } catch (e) {
        await conn.sendButton(m.chat,
            "⚠️ Ha ocurrido un error. Por favor, repórtalo con el siguiente comando:",
            `#report ${usedPrefix + command}`,
            null,
            [["Enviar reporte", `#report ${usedPrefix + command}`]],
             m
        );
           console.error(e);
        }
    };

handler.help = ['playlist'];
handler.tags = ['descargas'];
handler.command = ['playlist', 'ytbuscar'];
//handler.limit = 1;
handler.level = 3;

export default handler;
