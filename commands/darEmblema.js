const { SlashCommandBuilder } = require('discord.js');
const GiveBadge = require('../utils/GiveBadge');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('daremblema')
		.setDescription('Dar emblema para um usuário.')
        .addUserOption(option => option.setName('usuário').setDescription('Quem você deseja presentear?').setRequired(true))
        .addStringOption(option =>
            option.setName('emblema')
                .setDescription('Qual o emblema?')
                .setAutocomplete(true)
                .setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('usuário');
        const badge = interaction.options.getString('emblema');

        GiveBadge(interaction, target, badge);
    }
};