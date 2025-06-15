import axios from 'axios';

const handler = async (m, { args, conn }) => {
    if (!args.join(" ").includes("|")) {
        return m.reply('🎨 ¡Ingresa el título y el slogan separados por "|"!\nEjemplo: .logo WhatsApp Bot|isagiBot-MD');
    }

    const [tituloRaw, sloganRaw] = args.join(" ").split("|");
    const titulo = tituloRaw?.trim();
    const slogan = sloganRaw?.trim();

    if (!titulo) return m.reply('❗ El título no puede estar vacío.');
    
    try {
        await conn.sendMessage(m.chat, {
            react: {
                text: "⏱️",
                key: m.key,
            }
        });

        const payload = {
            ai_icon: [333276, 333279],
            height: 300,
            idea: `Un Icono ${titulo}`,
            industry_index: "N",
            industry_index_id: "",
            pagesize: 4,
            session_id: "",
            slogan: slogan || "",
            title: titulo,
            whiteEdge: 80,
            width: 400
        };

        const response = await axios.post("https://www.sologo.ai/v1/api/logo/logo_generate", payload);
        const logoList = response?.data?.data?.logoList;

        if (!logoList || logoList.length === 0) {
            return m.reply('🕸 Falló al crear el logo. Intenta con otro título/slogan.');
        }

        const logoUrls = logoList.map(logo => logo.logo_thumb);

        const mensaje = `🍬 *Generador de Logos*\n\n` +
                        `📌 *Título*: ${titulo}\n` +
                        `🐇 *Slogan*: ${slogan || "-"}\n` +
                        `🐚 *Logo generado correctamente*`;

        await conn.sendMessage(m.chat, {
            image: { url: logoUrls[0] },
            caption: mensaje
        }, { quoted: m });

        for (let i = 1; i < logoUrls.length; i++) {
            await conn.sendMessage(m.chat, {
                image: { url: logoUrls[i] }
            }, { quoted: m });
        }

        await conn.sendMessage(m.chat, {
            react: {
                text: "✅",
                key: m.key,
            }
        });

    } catch (error) {
        console.error("❌ Error al generar el logo:", error);
        m.reply('❌ Ocurrió un error inesperado al crear el logo.');
    }
};

handler.help = ['logo <título>|<slogan>'];
handler.tags = ['tools'];
handler.command = ["logogen", "generadordelogo"];

export default handler;