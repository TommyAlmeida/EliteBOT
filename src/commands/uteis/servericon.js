const Discord = require("discord.js");
const bot = new Discord.Client();

exports.run = (client, message, args) => {
      let user = message.mentions.users.first() || message.author
      const embed = new Discord.RichEmbed()
            .setTitle(`🖼️ ${message.guild.name}`)
            .setImage(message.guild.iconURL)
            .setColor('RANDOM')
    message.channel.send({embed})
}
exports.help = {
    name: 'servericon',
    description: 'Mostra o avatar do grupo'
};