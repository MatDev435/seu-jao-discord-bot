const { SlashCommandBuilder } = require('discord.js');
const User = require('../database/models/User');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('criar')
		.setDescription('Cria um perfil para que você possa utilizar os comandos e fazer compras.'),
	async execute(interaction) {
		if(interaction.user.bot) return;

		try {
			const user = await User.findOne({ serverId: interaction.guild.id, userId: interaction.user.id });

			if(user) {
				return await interaction.reply({ content: 'Você já possui um perfil.', ephemeral: true });
			}

			await User.create({
				userId: interaction.user.id,
				username: interaction.user.username,
				userAbout: 'Meu perfil',
				serverId: interaction.guild.id,
			});

			return await interaction.reply({ content: `Boa ${interaction.user.username}! Seu perfil foi criado com sucesso.`, ephemeral: true });
		} catch (err) {
			console.log(err);
		}
	},
};