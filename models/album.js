const mongoose = require('mongoose')

const album = new mongoose.Schema({
    _id: String,
    _name: String,
    _date_created: Date,
    _price: Number
});

const albumModel = mongoose.model('albums', album);
module.exports = { albumModel };