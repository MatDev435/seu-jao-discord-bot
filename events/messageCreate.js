const User = require('../database/models/User');

module.exports = {
	name: 'messageCreate',
	async execute(message) {
		if(message.author.bot) return;

        try {
            const user = await User.findOne({ serverId: message.guild.id, userId: message.author.id });

            if(!user) return;

            await user.updateOne({ coins: user.coins += 10 });
        } catch (err) {
            console.log(err);
        }
	},
};