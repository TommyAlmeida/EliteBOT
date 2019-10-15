exports.name = 'guildAvatar';
exports.run = (client, message) => {

    const avatars = ["https://i.imgur.com/QDKX7zR.png", "https://i.imgur.com/JaCQELZ.png"]
    const avatarRandom = Math.floor(Math.random() * avatars.length);

    setInterval(function () {
        message.guild.setIcon(avatars[avatarRandom])
        .catch(console.error)
    }, 1 * 1000)
}