const ServerShop = require('../database/models/ServerShop');
const User = require('../database/models/User');
const UserItem = require('../database/models/UserItem');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if(!interaction.isButton()) return;

        const idArgs = interaction.component.data.custom_id.split(' ');

        if(idArgs[0] === 'buy') {
            try {
                const user = await User.findOne({ serverId: interaction.guild.id, userId: interaction.user.id });
                const item = await ServerShop.findOne(({ serverId: interaction.guild.id, item: idArgs[1] }));
                const userItem = await UserItem.findOne({ serverId: interaction.guild.id, user: interaction.user.id, item: idArgs[1] });

                if(!item) return;
                if(!user) return interaction.reply({ content: `${interaction.user.username}, você ainda não possui um perfil. Use: /criar para criar um para você`, ephemeral: true });
                if(userItem) return await interaction.reply({ content: `${interaction.user.username}, você já possui esse item.`, ephemeral: true });

                if(user.coins >= item.itemPrice) {
                    user.coins -= item.itemPrice;

                    await User.findOneAndUpdate({ serverId: interaction.guild.id, userId: interaction.user.id }, { coins: user.coins });

                    await UserItem.create({
                        item: item.item,
                        itemDesc: item.itemDesc,
                        itemType: item.itemType,
                        user: interaction.user.id,
                        serverId: interaction.guild.id,
                    });

                    return await interaction.reply({ content: `Boa ${interaction.user.username}, você acabou de comprar um novo ${item.itemType}!`, ephemeral: true });
                } else {
                    return await interaction.reply({ content: `Puts ${interaction.user.username}, você não tem dinheiro suficiente.`, ephemeral: true });
                }
            } catch (err) {
                console.log(err);
            }
        }
	},
};