const mongoose = require('mongoose');
const config = require('../config.json');

module.exports = async () => {
    await mongoose.connect(config.mongoDBURL, {
        keepAlive: true,
    });

    console.log('MongoDB connected.');
};