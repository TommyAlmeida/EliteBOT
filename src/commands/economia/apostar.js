var database = require("../../backend/database.js/index.js")

exports.run = (client, message, args) => {

    let razaou = args.slice(0).join(' ');
    let razaod = args.slice(1).join(' ');
    let razaot = args.slice(2).join(' ');
    var coldown = new Set()
    var porcentagem = Math.round(Math.random() * 100)

    database.Users.findOne({
        "_id": message.author.id
    }, function (erro, documento) {

        if (documento) {


            if (!razaou.length < 1) {

                if (!razaod.length < 1) {

                    if (coldown.has(message.author.id)) return message.reply("Aguarde um momento...");

                    if (message.content.startsWith("!apostar")) {

                        if (parseInt(args[0]) > 0) {

                            if (parseInt(args[0]) < 150001) {

                                if (args[0] < documento.coins) {

                                    if (porcentagem < 70) {

                                        documento.coins -= parseInt(args[0])
                                        documento.save();
                                        message.reply("você perdeu a aposta. :confused:");
                                        coldown.add(message.author.id)
                                        setTimeout(function () {
                                            coldown.delete(message.author.id)
                                        }, 15 * 1000)

                                    } else {

                                        documento.coins += parseInt(args[0])
                                        documento.save();
                                        message.reply(`você ganhou a aposta, e ganhou ${(parseInt(args[0]))} coins`);
                                        coldown.add(message.author.id)
                                        setTimeout(function () {
                                            coldown.delete(message.author.id)
                                        }, 15 * 1000)

                                    }

                                } else {
                                    message.reply("você não tem esse dinheiro.");
                                }

                            } else {
                                message.reply("não pode ser mais que 150k. :moneybag:");
                            }

                        } else {
                            message.reply("não pode ser menor que 0. :confused:");
                        }

                    }

                    if (message.content.startsWith("!apostar 2x")) {

                        if (parseInt(args[1]) > 0) {

                            if (parseInt(args[1]) < 150001) {

                                if (args[1] < documento.coins) {

                                    if (porcentagem < 90) {

                                        documento.coins -= parseInt(args[1])
                                        documento.save();
                                        message.reply("você perdeu a aposta. :confused:");
                                        coldown.add(message.author.id)
                                        setTimeout(function () {
                                            coldown.delete(message.author.id)
                                        }, 15 * 1000)

                                    } else {

                                        documento.coins += parseInt(args[1]) * 2
                                        documento.save();
                                        message.reply(`você ganhou a aposta, e ganhou ${(parseInt(args[1]) * 2)} coins`);
                                        coldown.add(message.author.id)
                                        setTimeout(function () {
                                            coldown.delete(message.author.id)
                                        }, 15 * 1000)

                                    }

                                } else {
                                    message.reply("você não tem esse dinheiro.");
                                }

                            } else {
                                message.reply("não pode ser mais que 150k. :moneybag:");
                            }

                        } else {
                            message.reply("não pode ser menor que 0. :confused:");
                        }
                    }

                } else {
                    message.reply("diga quanto quer apostar. :confused:");
                }

            } else {
                const embed = new Discord.RichEmbed()
                    .setColor('RANDOM')
                    .setTitle('Como apostar:')
                    .addField("Use `!apostar <quantidade>", 'Você pode usar `!apostar 2x <quantidade> para apostar duas vezes')
                    .setThumbnail(message.author.displayAvatarURL)
                    .setFooter(`${message.author.tag}`, message.author.displayAvatarURL)
                    .setTimestamp()
                message.channel.send(embed);
            }


        } else {
            var user = new database.Users({
                _id: message.author.id,
                coins: 0,
            })

            user.save()

        }

    })

}

exports.help = {
    name: 'apostar'
};