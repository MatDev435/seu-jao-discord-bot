const { SlashCommandBuilder } = require('discord.js');
const ShowTargetProfile = require('../utils/ShowTargetProfile');
const ShowUserProfile = require('../utils/ShowUserProfile');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('perfil')
		.setDescription('Exibe seu perfil')
        .addUserOption(option => option.setName('user').setDescription('De quem você gostaria de ver o perfil?')),
	async execute(interaction) {
        const target = interaction.options.getUser('user');

        if(!target) {
            ShowUserProfile(interaction);
        }else {
            ShowTargetProfile(interaction, target);
        }
	},
};