const mongoose = require('mongoose');

const schema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    userAbout: {
        type: String,
    },
    perfilColor: {
        type: String,
        required: true,
        default: '0x0099FF',
    },
    coins: {
        type: Number,
        required: true,
        default: 0,
    },
    serverId: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('user', schema);