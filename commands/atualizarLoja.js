const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const UpdateShop = require('../utils/UpdateShop');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('atualizarloja')
		.setDescription('Atualiza os anúncios nos canais de loja.')
        .addStringOption(option =>
            option.setName('categoria')
            .setDescription('Selecione qual loja você deseja atualizar.')
            .setRequired(true)
            .addChoices(
                { name: 'Emblema', value: 'Emblema' },
                { name: 'Pet', value: 'Pet' },
            ),
        )
        .setDefaultMemberPermissions('0'),
        async execute(interaction) {
            const category = interaction.options.getString('categoria');

            UpdateShop(interaction, category);
        }
};