const { SlashCommandBuilder } = require('discord.js');
const DeleteItem = require('../utils/DeleteItem');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deletaritem')
        .setDescription('Adicionar um novo item à loja')
        .addStringOption(option =>
            option.setName('item')
            .setDescription('Qual item você deseja deletar?')
            .setAutocomplete(true)
            .setRequired(true),
        )
        .setDefaultMemberPermissions('0'),
    execute(interaction) {
        const item = interaction.options.getString('item');

        DeleteItem(interaction, item);
    },
};
