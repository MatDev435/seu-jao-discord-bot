const mongoose = require('mongoose');

const schema = mongoose.Schema({
    item: {
        type: String,
        required: true,
    },
    itemDesc: {
        type: String,
        required: true,
    },
    itemType: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    serverId: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('userItem', schema);