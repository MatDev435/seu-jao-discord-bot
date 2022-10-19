const ServerShop = require('../database/models/ServerShop');

module.exports = async (interaction, itemType, itemDesc, item, itemPrice) => {
    try {
        const shopItem = await ServerShop.findOne({ serverId: interaction.guild.id, item });

        if(shopItem) {
            return await interaction.reply({ content: `O item ${item} já existe. Tente um diferente.`, ephemeral: true });
        }

        await ServerShop.create({
            item,
            itemDesc,
            itemPrice,
            itemType,
            serverId: interaction.guild.id,
        });

        return await interaction.reply({ content: `Item criado com sucesso! ${itemType}, ${item} ${itemDesc}, ${itemPrice}`, ephemeral: true });
    } catch (err) {
        console.log(err);
    }
}