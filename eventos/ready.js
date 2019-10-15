const gameLoop = require('../utils/gameLoop');
const c = require('../comandos/config.json')
const INTERVAL = 10 * 1000;

exports.name = 'ready';
exports.run = (client) => {
    gameLoop.run(client);

    const guild = client.guilds.get(c.guildID)
    const avatars = ["https://i.imgur.com/QDKX7zR.png", "https://i.imgur.com/JaCQELZ.png"]

    setInterval(async() => {
        const r = avatars[Math.floor(Math.random() * avatars.length)];
        await guild.setIcon(r);
    }, INTERVAL)

    console.log(`O Bot foi iniciado completamente com ${client.users.size} usuarios em ${client.guilds.size} servidores`);
};