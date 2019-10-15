const gameLoop = require('../utils/gameLoop');

exports.name = 'ready';
exports.run = (client) => {
    gameLoop.run(client);
    
    const guild = client.guilds.get('id');
    const avatars = ['avatar 1', 'avatar 2'];
    const random = Math.floor(Math.random() * avatars.length);
    
    setInterval(() => {
        try {
        guild.setIcon(avatars[random]);
        } catch (err) {
            console.error(err.message);
        }
    }, 1 * 1000)

    console.log(`O Bot foi iniciado completamente com ${client.users.size} usuarios em ${client.guilds.size} servidores`);
};
