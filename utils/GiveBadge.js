const { EmbedBuilder } = require('discord.js');
const User = require('../database/models/User');
const UserItem = require('../database/models/UserItem');

module.exports = async (interaction, target, badge) => {
    try {
        const user = await User.findOne({ serverId: interaction.guild.id, userId: interaction.user.id });
        const targetUser = await User.findOne({ serverId: interaction.guild.id, userId: target.id });
        const userBadges = await UserItem.findOne({ serverId: interaction.guild.id, user: interaction.user.id, item: badge, itemType: 'Emblema' });
        const targetBadges = await UserItem.findOne({ serverId: interaction.guild.id, user: target.id, item: badge, itemType: 'Emblema' });

        if(!user) return await interaction.reply({ content: 'Você não possui um perfil. Use: /criar para criar um para você.', ephemeral: true });
        if(!targetUser) return await interaction.reply({ content: `${target.username} não possui um perfil`, ephemeral: true });
        if(targetUser.userId === user.userId) return await interaction.reply({ content: 'Você não pode se dar coins', ephemeral: true });
        if(!userBadges) return await interaction.reply({ content: 'Você não possui esse emblema', ephemeral: true });
        if(targetBadges) return await interaction.reply({ content: `${target.username} já possui esse emblema`, ephemeral: true });

        await userBadges.updateOne({ user: target.id });

        const giveBadgeEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`🎊 ${target.username} recebeu um novo emblema!`)
            .setAuthor({ name: `${target.username}`, iconURL: target.avatarURL() })
            .setThumbnail(target.avatarURL())
            .addFields(
                { name: 'Emblema recebido', value: `${badge}` },
            )
            .setTimestamp()
            .setFooter({ text: `Enviado por ${interaction.user.username}`, iconURL: interaction.user.avatarURL() });

        const message = await interaction.reply({ embeds: [giveBadgeEmbed], fetchReply: true });

        message.react('❤️');
    } catch (err) {
        console.log(err);
    }
}