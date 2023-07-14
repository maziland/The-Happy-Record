const mongoose = require('mongoose')
const ObjectID = mongoose.Schema.Types.ObjectId;

const ordersSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true,
        ref: 'User'
    },
    items: [{
        itemId: {
            type: ObjectID,
            ref: 'Album',
            required: true
        },
        name: String,
        artist: String,
        coverImage: String,
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1
        },
        price: Number
    }],
    bill: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
});

const ordersModel = mongoose.model('orders', ordersSchema);
module.exports = { ordersModel };