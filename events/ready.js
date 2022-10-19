const connectDB = require('../database/db');
const serverSchema = require('../database/models/Server');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);

		connectDB();
	},
};