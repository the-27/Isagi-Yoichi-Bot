import gplay from 'google-play-scraper';
import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) {
        return conn.reply(m.chat, `❌ Ingresa un enlace de la Play Store.\n📌 Ejemplo:\n${usedPrefix + command} https://play.google.com/store/apps/details?id=com.whatsapp`, m);
    }

    await m.react('⏳');

    let url = args[0];
    let packageName;

    try {
        const parsedUrl = new URL(url);
        packageName = parsedUrl.searchParams.get("id");
        if (!packageName) throw new Error("ID inválido");
    } catch (e) {
        return conn.reply(m.chat, `❌ URL inválida. Asegúrate de que sea del tipo:\nhttps://play.google.com/store/apps/details?id=...`, m);
    }

    let appInfo;
    try {
        appInfo = await gplay.app({ appId: packageName });
    } catch (error) {
        console.error('Error al obtener app:', error);
        return conn.reply(m.chat, `❌ No se encontró la aplicación. Revisa si el ID es correcto.`, m);
    }

    const appTitle = appInfo.title;
    const apkLink = `https://d.apkpure.com/b/APK/${appInfo.appId}?version=latest`;

    await conn.sendFile(m.chat, apkLink, `${appTitle}.apk`, '', m, false, {
        mimetype: 'application/vnd.android.package-archive',
        asDocument: true
    });

    await m.react('✅');
    return conn.reply(m.chat, `✅ Enviando *${appTitle}*...\n🔗 APK descargada desde APKPure`, m);
};

handler.help = ['playstore <url>'];
handler.tags = ['descargas'];
handler.command = /^playstore$/i; 

export default handler;