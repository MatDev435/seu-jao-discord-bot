const { SlashCommandBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, ModalBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('editarperfil')
		.setDescription('Edita as informações do seu perfil.'),
	async execute(interaction) {
		const modal = new ModalBuilder()
			.setCustomId('perfil')
			.setTitle(`Perfil de ${interaction.user.username}`);

        const aboutInput = new TextInputBuilder()
			.setCustomId('about')
			.setLabel('Sobre mim')
			.setStyle(TextInputStyle.Short);

        const aboutActionRow = new ActionRowBuilder().addComponents(aboutInput);

        modal.addComponents(aboutActionRow);

        await interaction.showModal(modal);
	},
};