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
        if (membro.roles.has(roles[role])) return message.channel.send('Você já tem essa cor!').then(msg => msg.delete(8000));
        await membro.removeRoles([roles.azul, roles.vermelho, roles.amarelo, roles.verde, roles.roxo]);
        await membro.addRole(roles[role]);
        return message.channel.send(`Agora você tem a cor ${role}`).then(msg => msg.delete(8000));
    };
    switch (args[0]) {
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