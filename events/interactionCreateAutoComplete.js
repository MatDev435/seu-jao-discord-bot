const UserItem = require('../database/models/UserItem');
const ServerShop = require('../database/models/ServerShop');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
        if(!interaction.isAutocomplete()) return;

        if (interaction.commandName === 'daremblema') {
            try {
                const userBadges = await UserItem.find({ serverId: interaction.guild.id, user: interaction.user.id, itemType: 'Emblema' }).select('item');
                const badges = [];

                userBadges.map(badge => {
                    badges.push(badge.item);
                });

                const focusedValue = interaction.options.getFocused();
                const choices = badges;
                const filtered = choices.filter(choice => choice.startsWith(focusedValue));

                await interaction.respond(
                    filtered.map(choice => ({ name: choice, value: choice })),
                );
            } catch (err) {
                console.log(err);
            }
        }

        if (interaction.commandName === 'darpet') {
            try {
                const userPets = await UserItem.find({ serverId: interaction.guild.id, user: interaction.user.id, itemType: 'Pet' }).select('item');
                const pets = [];

                userPets.map(pet => {
                    pets.push(pet.item);
                });

                const focusedValue = interaction.options.getFocused();
                const choices = pets;
                const filtered = choices.filter(choice => choice.startsWith(focusedValue));

                await interaction.respond(
                    filtered.map(choice => ({ name: choice, value: choice })),
                );
            } catch (err) {
                console.log(err);
            }
        }

        if (interaction.commandName === 'deletaritem') {
            try {
                const serverItems = await ServerShop.find({ serverId: interaction.guild.id });
                const items = [];

                serverItems.map(item => {
                    items.push(item.item);
                });

                const focusedValue = interaction.options.getFocused();
                const choices = items;
                const filtered = choices.filter(choice => choice.startsWith(focusedValue));

                await interaction.respond(
                    filtered.map(choice => ({ name: choice, value: choice })),
                );
            } catch (err) {
                console.log(err);
            }
        }
	},
};