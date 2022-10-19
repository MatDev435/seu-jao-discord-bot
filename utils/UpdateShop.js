const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const Server = require('../database/models/Server');
const ServerShop = require('../database/models/ServerShop');

module.exports = async (interaction, category) => {
    const emoji = category === 'Pet' ? '🐾' : '🛡️';

    try {
        const server = await Server.findOne({ serverId: interaction.guild.id });

        if(category === 'Emblema' && server.badgesChannel === '') {
            return await interaction.reply({ content: 'Você ainda não possui um canal de venda de emblemas', ephemeral: true });
        }

        if(category === 'Pet' && server.petsChannel === '') {
            return await interaction.reply({ content: 'Você ainda não possui um canal de venda de pets', ephemeral: true });
        }

        let channel = '';

        if(category === 'Emblema') {
            channel = interaction.client.channels.cache.get(server.badgesChannel);
        }

        if(category === 'Pet') {
            channel = interaction.client.channels.cache.get(server.petsChannel);
        }

        await channel.bulkDelete(100, true);

        const items = await ServerShop.find({ serverId: interaction.guild.id, itemType: category });

        if(!items) {
            return await interaction.reply('Este servidor não possui nenhum item na loja. Crie um novo item usando: /shop');
        }

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

        return await interaction.reply({ content: 'Loja atualizada!', ephemeral: true });
    }catch (err) {
        console.log(err);
    }
};