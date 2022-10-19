const mongoose = require('mongoose');

const schema = mongoose.Schema({
    item: {
        type: String,
        required: true,
    },
    itemDesc: {
        type: String,
        required: true,
        default: 'Apenas um item',
    },
    itemPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    itemType: {
        type: String,
        required: true,
        default: 'badge',
    },
    serverId: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('serverShop', schema);