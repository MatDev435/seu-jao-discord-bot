const mongoose = require('mongoose');

const schema = mongoose.Schema({
    serverId: {
        type: String,
        required: true,
        unique: true,
    },
    badgesChannel: {
        type: String,
    },
    petsChannel: {
        type: String,
    },
});

module.exports = mongoose.model('server', schema);