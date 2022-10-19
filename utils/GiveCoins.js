const { EmbedBuilder } = require('discord.js');
const User = require('../database/models/User');

module.exports = async (interaction, target, coinsValue) => {
    try {
        const user = await User.findOne({ serverId: interaction.guild.id, userId: interaction.user.id });
        const targetUser = await User.findOne({ serverId: interaction.guild.id, userId: target.id });

        if(!user) return await interaction.reply({ content: 'Você não possui um perfil. Use: /criar para criar um para você.', ephemeral: true });
        if(!targetUser) return await interaction.reply({ content: `${target.username} não possui um perfil`, ephemeral: true });
        if(targetUser.userId === user.userId) return await interaction.reply({ content: 'Você não pode se dar coins', ephemeral: true });

        if(user.coins >= coinsValue) {
            await user.updateOne({ coins: user.coins -= coinsValue });
            await targetUser.updateOne({ coins: targetUser.coins += coinsValue });

            const giveCoinsEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(`🎊 ${target.username} recebeu coins!`)
                .setAuthor({ name: `${target.username}`, iconURL: target.avatarURL() })
                .setThumbnail(target.avatarURL())
                .addFields(
                    { name: 'Valor', value: `🪙 ${coinsValue}` },
                )
                .setTimestamp()
                .setFooter({ text: `Enviado por ${interaction.user.username}`, iconURL: interaction.user.avatarURL() });

            const message = await interaction.reply({ embeds: [giveCoinsEmbed], fetchReply: true });

            message.react('❤️');
        }else {
            return await interaction.reply({ content: 'Você não tem coins suficientes', ephemeral: true });
        }
    } catch (err) {
        console.log(err);
    }
}