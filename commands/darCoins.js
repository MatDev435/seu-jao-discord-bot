const { SlashCommandBuilder } = require('discord.js');
const GiveCoins = require('../utils/GiveCoins');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('darcoins')
		.setDescription('Dar coins para um usuário.')
        .addUserOption(option => option.setName('usuário').setDescription('Quem você deseja presentear?').setRequired(true))
        .addNumberOption(option => option.setName('valor').setDescription('Qual o valor?').setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('usuário');
        const coinsValue = interaction.options.getNumber('valor');

        GiveCoins(interaction, target, coinsValue);
    }
};