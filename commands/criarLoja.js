const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const CreateShop = require('../utils/CreateShop');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('criarloja')
		.setDescription('Crie o seu canal de loja e comece a vender os itens.')
        .addChannelOption(option => option.setName('canal').setDescription('Onde você deseja que seja sua loja?').setRequired(true))
        .addStringOption(option =>
            option.setName('categoria')
                .setDescription('Qual tipo de item será vendido aqui?')
                .setRequired(true)
                .addChoices(
                    { name: 'Emblema', value: 'Emblema' },
                    { name: 'Pet', value: 'Pet' },
                ),
        )
        .setDefaultMemberPermissions('0'),
    async execute(interaction) {
        const channelOpt = interaction.options.getChannel('canal');
        const category = interaction.options.getString('categoria');
        const channel = interaction.client.channels.cache.get(channelOpt.id);

        CreateShop(interaction, channelOpt, category, channel);
    },
};