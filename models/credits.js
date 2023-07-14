const mongoose = require('mongoose')

const creditsSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true,
        ref: 'User',
        unique: true
    },
    number: {
        type: String,
        required: true
    },
    holder: {
        type: String,
        required: true
    },
    exp: {
        type: String,
        required: true
    },
    cvv: {
        type: Number,
        reuired: true
    }
});

const creditsModel = mongoose.model('credits', creditsSchema);
module.exports = { creditsModel };