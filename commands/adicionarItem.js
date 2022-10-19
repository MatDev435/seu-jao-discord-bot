const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const CreateItem = require('../utils/CreateItem');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('adicionaritem')
        .setDescription('Adicionar um novo item à loja')
        .addStringOption(option =>
            option.setName('categoria')
            .setDescription('Selecione o tipo do item.')
            .setRequired(true)
            .addChoices(
                { name: 'Emblema', value: 'Emblema' },
                { name: 'Pet', value: 'Pet' },
            ),
        )
        .addStringOption(option => option.setName('item').setDescription('Insira o emoji que você deseja adicionar a loja.').setRequired(true))
        .addStringOption(option => option.setName('descrição').setDescription('Insira uma descrição.').setRequired(true))
        .addNumberOption(option => option.setName('preço').setDescription('Insira o preço do item.').setRequired(true))
        .setDefaultMemberPermissions('0'),
    async execute(interaction) {
        const itemType = interaction.options.getString('categoria');
        const itemDesc = interaction.options.getString('descrição');
        const item = interaction.options.getString('item');
        const itemPrice = interaction.options.getNumber('preço');

        CreateItem(interaction, itemType, itemDesc, item, itemPrice);
    },
};
