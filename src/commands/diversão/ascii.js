const discord = require('discord.js');
const fetch = require("node-fetch");

exports.run = async (message, args, texts) => {
    let text = args[0]
    if (!text) return message.reply("Você precisa informar um texto e uma fonte. \n Use `!ascii fontes` para ver a lista de fontes.")
    let font = args.slice(1).join(" ")
    if (!font) return message.reply("Você precisa informar um texto e uma fonte. \n Use `!ascii fontes` para ver a lista de fontes.")
    
    const tooLong = "O texto é muito longo, tente um texto menor.";

    fetch(`http://artii.herokuapp.com/make?text=${text}&font=${font}`)
        .then(res => res.text())
        .then(body => {
            if (body.length > 2000) return message.channel.send(tooLong);
            return message.reply(body, {
                code: "fix"
            });
        })
        .catch(error => {
            this.client.logger.error(error);
            return message.reply(texts.general.error.replace(/{{err}}/g, error.message));
        });
}

exports.help = {
    name: 'ascii'
}