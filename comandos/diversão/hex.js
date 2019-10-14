const Discord = require('discord.js');
const superagent = require('superagent');

exports.run = async (client, message, args) => {
    if (!args[0] || args[0] === 'ajuda') return message.reply("insira uma cor hex sem usar #")
    var isOk = /^[0-9A-F]{6}$/i.test(args[0])
    if (isOk === false) return message.reply("insira uma cor hex sem usar #")

    const {
        body
    } = await superagent
        .get(`https://api.alexflipnote.dev/color/` + args[0]);

    const embed = new Discord.RichEmbed()
        .setColor(`#${body.hex}`)
        .setTitle(body.name)
        .addField("Hex:", body.hex)
        .addField("RGB:", body.rgb)
        .setThumbnail(body.image)
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL);
    message.channel.send({
        embed
    });
};

exports.help = {
    name: 'hex'
};