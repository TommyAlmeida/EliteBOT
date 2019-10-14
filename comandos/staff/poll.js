const Discord = require('discord.js')

const agree = "👍";
const disagree = "👎";

exports.run = async (client, message, args) => {
    if (!args || args[0] === 'ajuda') return message.reply("use `!enquete <pergunta>`.")

    let embed = new Discord.RichEmbed()

        .setColor("RANDOM")
        .setTitle('Votação criada, reaja para votar')
        .setDescription(message.content.split(" ").splice(1).join(" "))
        .setFooter(`Enquete criada por ${message.author.username}`)
        .setTimestamp()
    client.channels.get(`633171474567528458`).send(embed).then(async msg => {

        msg.react(agree);
        msg.react(disagree);

        const reactions = await msg.awaitReactions(reaction => reaction.emoji.name === agree || reaction.emoji.name === disagree, {
            time: 100
        });
        msg.delete();

        var disagreeCount = reactions.get(disagree).count;
        if (disagreeCount == undefined) {
            var disagreeCount = 1;
        } else {
            var disagreeCount = reactions.get(disagree).count;
        }

        var agreeCount = reactions.get(agree);
        if (agreeCount == undefined) {
            var agreeCount = 1;
        } else {
            var agreeCount = reactions.get(agree).count;
        }

        var results = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setTitle('Votação finalizada')
            .addField(`${message.content.split(" ").splice(1).join(" ")}`, `👍 ${agreeCount-1} \n 👎 ${disagreeCount}`)
            .setFooter(`Enquete criada por ${message.author.username}`)
            .setTimestamp()
        await message.channel.send(results);
    })
}

exports.help = {
    name: 'enquete'
};