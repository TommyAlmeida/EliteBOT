const Discord = require("discord.js");
const request = require("request");
exports.run = (client, message, args) => {
    if (!args[0]) {
        return message.channel.send(`\`${message.author.tag}\` digite algum documento para eu procurar.`);
    }
    try {
        request({
            url: 'https://djsdocs.sorta.moe/v2/embed?src=stable&q=' + encodeURIComponent(args.join(' ') + '&force=false'),
            json: true
        }, (req, res, json) => {
            if (!json) {
            message.channel.send(`\`${message.author.tag}\` não foi possivel encontrar o documento especificado.`)
            }
            message.channel.send({
                embed: json
            })
        })

    } catch (error) {
        console.log(`ERROR: ${error.message}`)
    }
}


exports.help = {
    name: 'docs'
};