const c = require('../comandos/config.json')

exports.name = 'MessageReactionAdd';
exports.run = async (messageReaction, user) => {
    if (messageReaction.message.partial) await messageReaction.message.fetch();

    if (!messageReaction.message.channel.type === "text" || !messageReaction.message.guild || !messageReaction.message.guild.available) return;
    if (!messageReaction.emoji.name === "📍") return;

    const settings = messageReaction.message.guild.settings = await messageReaction.message.guild.fetchSettings();

    if (!c.highlightChannel) return;
    if (settings.ignored.stars.includes(messageReaction.message.channel.id)) return;

    let count = messageReaction.count;
    if (messageReaction.users.get(messageReaction.message.author.id)) count--;

    if (count < settings.starboard.count) return;
    if (!messageReaction.message.guild.channels.has(c.highlightChannel)) return;

    const channel = messageReaction.message.guild.channels.get(c.highlightChannel);

    const messages = await channel.messages.fetch({
        limit: 100
    });
    const boardMsg = messages.find(m => m.embeds.length > 0 && m.embeds[0].footer.text.startsWith("📍") && m.embeds[0].footer.text.endsWith(messageReaction.message.id));

    if (boardMsg) {
        const image = boardMsg.embeds[0] ? boardMsg.embeds[0].image ? boardMsg.embeds[0].image.proxyURL ? boardMsg.embeds[0].image.proxyURL : null : null : null;

        const embed = new RichEmbed()
            .setColor('RANDOM')
            .addField("Autor", `<@!${messageReaction.message.author.id}>`, true)
            .addField("Canal", `<#${messageReaction.message.channel.id}>`, true)
            .addField("Message", messageReaction.message.content, false)
            .setThumbnail(messageReaction.message.author.avatarURL("png", 2048))
            .setTimestamp(messageReaction.message.createdAt)
            .setFooter(`📍 ${count} | ${messageReaction.message.id}`);

        if (image) {
            embed.setImage(image);
        } else {
            embed.addField("Message", messageReaction.message.content, false);
        }

        await boardMsg.edit({
            embed
        });
    } else {
        const image = messageReaction.message.attachments.size > 0 ? messageReaction.message.attachments.array()[0].url : null;

        const embed = new RichEmbed()
            .setColor('RANDOM   ')
            .addField("Autor", `<@!${messageReaction.message.author.id}>`, true)
            .addField("Canal", `<#${messageReaction.message.channel.id}>`, true)
            .addField("Message", messageReaction.message.content, false)
            .setThumbnail(messageReaction.message.author.avatarURL("png", 2048))
            .setTimestamp(messageReaction.message.createdAt)
            .setFooter(`📍 ${count} | ${messageReaction.message.id}`);

        if (image) {
            embed.setImage(image);
        } else {
            embed.addField("Message", messageReaction.message.content, false);
        }

        channel.send({
            embed
        });
    }
}