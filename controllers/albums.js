const ejs = require('ejs');
const albumService = require("../services/album")

async function mainAlbums(req, res) {
    const albumModel = require("../models/album").albumModel
    const collection = albumModel.collection;
    const albums = await collection.find({}).toArray();
    res.render('albums.ejs', { albums });
};

async function homepage(req, res) {
    username = req.session.username;
    console.log(res.locals)
    res.render("homepage.ejs", { username });
};

module.exports = { mainAlbums, homepage };