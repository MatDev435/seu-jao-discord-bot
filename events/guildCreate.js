const serverSchema = require('../database/models/Server');

module.exports = {
	name: 'guildCreate',
	once: true,
	async execute(guild) {
        await new serverSchema({
            serverId: guild.id,
        }).save();
	},
};