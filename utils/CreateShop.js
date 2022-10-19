const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const Server = require('../database/models/Server');
const ServerShop = require('../database/models/ServerShop');

module.exports = async (interaction, channelOpt, category, channel) => {
    const emoji = category === 'Pet' ? '🐾' : '🛡️';

    try {
        const items = await ServerShop.find({ serverId: interaction.guild.id, itemType: category });

        if(!items) {
            return await interaction.reply({ content: 'Este servidor não possui nenhum item na loja. Crie um novo item usando: /shop', ephemeral: true });
        }

        await Server.findOneAndUpdate({ serverId: interaction.guild.id }, category === 'Pet' ? { petsChannel: channelOpt.id } : { badgesChannel: channelOpt.id });

        interaction.reply({ content: `Sucesso! Encontrei um total de ${items.length} itens. Estou criando os anúncios, isso pode levar alguns segundos...`, ephemeral: true });

        items.map(async item => {
            const itemTemplate = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(item.item)
                .setAuthor({ name: `${emoji} ${item.itemType}` })
                .addFields(
                    { name: 'Descrição', value: `${item.itemDesc}` },
                );

            const buyButton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`buy ${item.item}`)
                        .setLabel(`${item.itemPrice}`)
                        .setStyle(ButtonStyle.Primary),
                );

            await channel.send({ embeds: [itemTemplate], components: [buyButton] });
        });
    } catch (err) {
        console.log(err);
    }
}