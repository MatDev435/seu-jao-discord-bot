const { EmbedBuilder } = require('discord.js');
const User = require('../database/models/User');
const UserItem = require('../database/models/UserItem');

module.exports = async (interaction, target, pet) => {
    try {
        const user = await User.findOne({ serverId: interaction.guild.id, userId: interaction.user.id });
        const targetUser = await User.findOne({ serverId: interaction.guild.id, userId: target.id });
        const userPets = await UserItem.findOne({ serverId: interaction.guild.id, user: interaction.user.id, item: pet, itemType: 'Pet' });
        const targetPets = await UserItem.findOne({ serverId: interaction.guild.id, user: target.id, item: pet, itemType: 'Pet' });

        if(!user) return await interaction.reply({ content: 'Você não possui um perfil. Use: /criar para criar um para você.', ephemeral: true });
        if(!targetUser) return await interaction.reply({ content: `${target.username} não possui um perfil`, ephemeral: true });
        if(targetUser.userId === user.userId) return await interaction.reply({ content: 'Você não pode se dar coins', ephemeral: true });
        if(!userPets) return await interaction.reply({ content: 'Você não possui esse pet', ephemeral: true });
        if(targetPets) return await interaction.reply({ content: `${target.username} já possui esse pet`, ephemeral: true });

        await userPets.updateOne({ user: target.id });

        const givePetEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`🎊 ${target.username} recebeu um novo Pet!`)
            .setAuthor({ name: `${target.username}`, iconURL: target.avatarURL() })
            .setThumbnail(target.avatarURL())
            .addFields(
                { name: 'Pet recebido', value: `${pet}` },
            )
            .setTimestamp()
            .setFooter({ text: `Enviado por ${interaction.user.username}`, iconURL: interaction.user.avatarURL() });

        const message = await interaction.reply({ embeds: [givePetEmbed], fetchReply: true });

        message.react('❤️');
    } catch (err) {
        console.log(err);
    }
}