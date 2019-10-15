const c = require('../comandos/config.json');

exports.name = 'userUpdate';

exports.run = async function onUserUpdate(oldUser, newUser) {
    try {

        this.guilds.filter(g => g.members.has(oldUser.id)).forEach(async guild => {
            const guildDocument = message.guild.channels.get(c.logChannel);

            if (!guildDocument.logs) return;
            if (!guildDocument.logschannel) return;
            if (oldUser.bot && newUser.bot) return;

            const channel = guild.channels.get(guildDocument.logschannel);

            if (oldUser.username !== newUser.username) {

                const userName = new RichEmbed(newUser);

                userName.setAuthor(guild.name, guild.iconURL);
                userName.setDescription(`
                ${Constants.NEXT} O membro **${newUser.username}** alterou o seu nome. [ \`${oldUser.username}\` | \`${newUser.username}\` ]`);
                userName.addField('Anteriormente:', [
                    `- Nome: \`${oldUser.username}\``
                ].join("\n"), false);
                userName.addField('Posteriormente:', [
                    `- Nome: \`${newUser.username}\``
                ].join("\n"), false);
                userName.setThumbnail(newUser.avatarURL);

                channel.send(userName);

            } else if (oldUser.avatarURL !== newUser.avatarURL) {

                const userAvatar = new RichEmbed(newUser);

                userAvatar.setAuthor(guild.name, guild.iconURL);
                userAvatar.setDescription(`
                ${Constants.NEXT} O membro **${newUser.username}** alterou o seu avatar. [ [\`Antigo\`](${oldUser.avatarURL}) | [\`Novo\`](${newUser.avatarURL}) ]`);
                userAvatar.addField('Anteriormente:', [
                    `- Avatar: [\`Antigo\`](${oldUser.avatarURL})`
                ].join("\n"), false);
                userAvatar.addField('Posteriormente:', [
                    `- Avatar: [\`Novo\`](${newUser.avatarURL})`
                ].join("\n"), false);
                userAvatar.setThumbnail(newUser.avatarURL);

                channel.send(userAvatar);

            } else if (oldUser.discriminator !== newUser.discriminator) {

                const userDiscriminator = new RichEmbed(newUser);

                userDiscriminator.setAuthor(guild.name, guild.iconURL);
                userDiscriminator.setDescription(`
                ${Constants.NEXT} O membro **${newUser.username}** alterou o seu discriminator. [ \`${oldUser.discriminator}\` | \`${newUser.discriminator}\` ]`);
                userDiscriminator.addField('Anteriormente:', [
                    `- Discriminator: \`${oldUser.discriminator}\``
                ].join("\n"), false);
                userDiscriminator.addField('Posteriormente:', [
                    `- Discriminator: \`${newUser.discriminator}\``
                ].join("\n"), false);
                userDiscriminator.setThumbnail(newUser.avatarURL);

                channel.send(userDiscriminator);
            }
        })
    } catch (err) {
        console.log(err);
    }
}