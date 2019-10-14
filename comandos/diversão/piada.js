const axios = require("axios").default;
const Discord = require("discord.js");

exports.run = async (client, message, args) => {

    axios("https://us-central1-kivson.cloudfunctions.net/charada-aleatoria", {
            headers: {
                Accept: 'application/json'
            }
        })
        .then((r) => {
            let embed = new Discord.RichEmbed()
                .setColor('RANDOM')
                .addField(`**${r.data.pergunta}**`, r.data.resposta)
                .setTimestamp();
            message.channel.send(embed);
        })
}

exports.help = {
    name: 'piada'
}