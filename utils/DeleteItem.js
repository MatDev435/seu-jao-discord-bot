const ServerShop = require('../database/models/ServerShop');

module.exports = async (interaction, item) => {
    try {
        const shopItem = await ServerShop.findOne({ serverId: interaction.guild.id, item });

        if(!shopItem) {
            return await interaction.reply({ content: `O item ${item} não existe. Tente um diferente.`, ephemeral: true });
        }

        shopItem.delete();

        return await interaction.reply({ content: 'Item exculido com sucesso!', ephemeral: true });
    } catch (err) {
        console.log(err);
    }
}