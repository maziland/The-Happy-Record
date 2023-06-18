const ejs = require('ejs');
const albumService = require("../services/album")

async function mainAlbums(req, res) {
    const albumModel = require("../models/album").albumModel
    const collection = albumModel.collection;
    const albums = await collection.find({}).toArray();
    res.render('albums.ejs', { albums });
};

async function homepage(req, res) {
    res.render("homepage.ejs");
};

module.exports = { mainAlbums, homepage };