const gameLoop = require('../utils/gameLoop');
const c = require('../comandos/config.json')
const INTERVAL = 10 * 1000;

exports.name = 'ready';
exports.run = (client) => {
    gameLoop.run(client);

    console.log(`O Bot foi iniciado completamente com ${client.users.size} usuarios em ${client.guilds.size} servidores`);
};