const mongoose = require('mongoose')

const album = new mongoose.Schema({
    name: String,
    artist: String,
    rank: Number,
    coverImage: String,
    releaseYear: String,
    price: Number
});

const albumModel = mongoose.model('albums', album);
module.exports = { albumModel };