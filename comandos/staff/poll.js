const Discord = require('discord.js')

exports.run = async (client, message, args) => {
    let razaou = args.slice(0).join(' ');

    if (!message.member.hasPermission(["ADMINISTRATOR"])) return message.reply("você não tem permissão para isso.");

    if (!razaou.length < 1) {

        message.delete();
        var embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setTitle('Votação iniciada:')
            .setDescription(args.slice(0).join(' '))
            .setFooter(`Enquete criada por ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
        message.channel.send(embed).then(votacao => {

            setTimeout(() => {
                votacao.react('👍');
            }, 500);
            setTimeout(() => {
                votacao.react('👎');
            }, 1000);
            setTimeout(() => {
                votacao.react('🤷');
            }, 1500);

            var sim = 0;
            var nao = 0;
            var talvez = 0;

            const collector = votacao.createReactionCollector((r, u) => (r.emoji.name === '👍' || r.emoji.name === '👎' || r.emoji.name === '🤷') && u.id !== client.user.id);

            collector.on('collect', r => {
                switch (r.emoji.name) {
                    case '👍':
                        sim = sim + 1
                        break;
                    case '👎':
                        nao = nao + 1
                        break;
                    case '🤷':
                        talvez = talvez + 1
                        break;
                }
            })

            if (votacao.reaction("👍").remove) {
                sim = sim - 1
            }

            if (votacao.reaction("👎").remove) {
                nao = nao - 1
            }

            if (votacao.reaction("🤷").remove) {
                talvez = talvez - 1
            }

            setTimeout(() => {
                votacao.delete()
                var embed = new Discord.RichEmbed()
                    .setColor("RANDOM")
                    .setTitle('Votação iniciada:')
                    .addField(`${args.slice(0).join(' ')}`, `**Resultado:**\n👍 **${sim}** votos\n👎 **${nao}** votos\n🤷 **${talvez}** votos `)
                    .setFooter(`Enquete criada por ${message.author.username}`, message.author.displayAvatarURL)
                    .setTimestamp()
                message.channel.send(embed)
            }, 5 * 60 * 1000);

        })

    } else {
        message.reply("insira um texto para a enquete.");
    }

}

exports.help = {
    name: 'enquete'
};