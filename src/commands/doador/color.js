const Discord = require('discord.js')

exports.run = (client, message, args) => {
    if (!message.member.roles.find(role => role.name === "Doador")) {
        return message.channel.send(`${message.author}, esse comando é exclusivos para **doadores**!`).then(msg => msg.delete(8000))
    }
    const roles = {
        amarelo: '631974312370503680',
        azul: '631974546085511178',
        verde: '631974656123076627',
        vermelho: '631975507394691085',
        roxo: '631974753720336394',
    }
    async function trocarRole(membro, role) {
        if (membro.roles.has(roles[role])) return message.reply('você já tem essa cor!').then(msg => msg.delete(8000));
        await membro.removeRoles([roles.azul, roles.vermelho, roles.amarelo, roles.verde, roles.roxo]);
        await membro.addRole(roles[role]);
        return message.reply(`agora você tem a cor ${role}`).then(msg => msg.delete(8000));
    };

    if (!(args[0])) return message.reply('use `!cor lista` para ver a lista de cores.')

    switch (args[0]) {
        default:
            message.reply('não encontrei essa cor, use `!cor lista` para ver a lista de cores.').then(msg => msg.delete(8000))
            break;
        case 'lista':
            const embed = new Discord.RichEmbed()
                .setTitle('Lista de cores')
                .addField('Use `!cor <cor>` para mudar a cor do seu nick.', '» Amarelo \n» Azul \n» Verde \n» Vermelho \n» Roxo')
                .setColor('RANDOM')
                .setFooter('O comando de cor é exclusivo para doadores!')
                .setTimestamp()
            message.channel.send(embed)
            break;
        case 'amarelo':
            trocarRole(message.member, 'amarelo');
            break;
        case 'azul':
            trocarRole(message.member, 'azul');
            break;
        case 'verde':
            trocarRole(message.member, 'verde');
            break;
        case 'vermelho':
            trocarRole(message.member, 'vermelho');
            break;
        case 'roxo':
            trocarRole(message.member, 'roxo');
            break;
    };
}

exports.help = {
    name: "cor"
}