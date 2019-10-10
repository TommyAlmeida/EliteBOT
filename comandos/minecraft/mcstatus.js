const Discord = require('discord.js');
var request = require('request');

module.exports.run = async (client, message, args) => {
    server = args[0];
    let url = "http://mcapi.us/server/status?ip=" + server;
    request(url, function (err, response, body) {

        if (!server) return message.reply("um erro aconteceu, insira um ip valido!").then(msg => msg.delete(2000))

        body = JSON.parse(body);
        if(body.error == "invalid hostname or port") return message.reply("insira um IP valido.").then(msg => msg.delete(2000))
        const mensagem = {
            true: '✔️ Online',
            false: '❌ Offline'
        };
        const status = mensagem[body.online];


        let embed = new Discord.RichEmbed()
            .setAuthor(`${server}`, `https://eu.mc-api.net/v3/server/favicon/${server}`)
            .setThumbnail(`https://eu.mc-api.net/v3/server/favicon/${server}`)
            .addField("Versão:", body.server.name, true)
            .addField("MOTD:", body.motd, true)
            .addField("Status:", status)
            .addField("Jogadores online:", body.players.now + "/" + body.players.max, true)
            .setFooter(message.author.username, message.author.displayAvatarURL)
            .setTimestamp()
        message.channel.send(embed)
    })
}

exports.help = {
    name: "mcstatus"
}