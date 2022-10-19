const { SlashCommandBuilder } = require('discord.js');
const GivePet = require('../utils/GivePet');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('darpet')
		.setDescription('Dar pet para um usuário.')
        .addUserOption(option => option.setName('usuário').setDescription('Quem você deseja presentear?').setRequired(true))
        .addStringOption(option =>
            option.setName('pet')
                .setDescription('Qual o pet?')
                .setAutocomplete(true)
                .setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('usuário');
        const pet = interaction.options.getString('pet');

        GivePet(interaction, target, pet);
    }
};