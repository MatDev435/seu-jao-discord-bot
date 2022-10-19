const { EmbedBuilder } = require('discord.js');
const User = require('../database/models/User');
const UserItem = require('../database/models/UserItem');

module.exports = async (interaction, target) => {
    try {
        const user = await User.findOne({ serverId: interaction.guild.id, userId: target.id });
        const userItems = await UserItem.find({ user: target.id, serverId: interaction.guild.id });
        let badges = '';
        let pets = '';

        if(!user) return await interaction.reply({ content: `${target.username} não possui um perfil.`, ephemeral: true });

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
            .setAuthor({ name: `Perfil de ${target.username}`, iconURL: target.avatarURL() })
            .setThumbnail(target.avatarURL())
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