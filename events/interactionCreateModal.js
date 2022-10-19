const User = require('../database/models/User');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.isModalSubmit()) return;

        if(interaction.customId === 'perfil') {
            const about = interaction.fields.getTextInputValue('about');

            try {
                const user = await User.findOne({ serverId: interaction.guild.id, userId: interaction.user.id });

                if(!user) return await interaction.reply({ content: 'Você não possui um perfil. Use: /criar para criar um perfil', ephemeral: true });

                await user.updateOne({ userAbout: about });

                await interaction.reply({ content: `Sucesso! Seu sobre mim foi alterado para: "${about}". Use /perfil para visualiza-lo`, ephemeral: true });
            } catch (err) {
                console.log(err);
            }
        }
	},
};