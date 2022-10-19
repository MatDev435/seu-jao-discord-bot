const { EmbedBuilder } = require('discord.js');
const User = require('../database/models/User');
const UserItem = require('../database/models/UserItem');

module.exports = async (interaction) => {
    try {
        const user = await User.findOne({ serverId: interaction.guild.id, userId: interaction.user.id });
        const userItems = await UserItem.find({ user: interaction.user.id, serverId: interaction.guild.id });
        let badges = '';
        let pets = '';

        if(!user) return await interaction.reply({ content: 'Você ainda não possui um perfil. Use: /criar para criar um perfil.', ephemeral: true });

        if(userItems.length >= 1) {
            userItems.map(item => {
                if(item.itemType === 'Emblema') {
                    badges += `${item.item} `;
                }else {
                    pets += `${item.item} `;
                }
            });
        }

        if(badges === '') badges = 'Nenhum';
        if(pets === '') pets = 'Nenhum';

        const perfil = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`🪙 ${user.coins}`)
            .setAuthor({ name: `Perfil de ${interaction.user.username}`, iconURL: interaction.user.avatarURL() })
            .setThumbnail(interaction.user.avatarURL())
            .addFields(
                { name: 'Sobre mim', value: `${user.userAbout}` },
                { name: 'Emblemas', value: `${badges}` },
                { name: 'Pets', value: `${pets}` },
            );

        await interaction.reply({ embeds: [perfil] });
    } catch (err) {
        console.log(err);
    }
}