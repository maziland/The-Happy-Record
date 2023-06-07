const ejs = require('ejs');
const albumService = require("../services/album")

async function mainAlbums(req, res) {
    const albumModel = require("../models/album").albumModel
    const collection = albumModel.collection;
    const albums = await collection.find({}).toArray();
    const renderedHtml = await ejs.renderFile('views/albums.ejs', { albums });
    res.send(renderedHtml);
};

async function homepage(req, res) {
    const albumModel = require("../models/album").albumModel
    const collection = albumModel.collection;
    const albums = await collection.find({}).toArray();
    const renderedHtml = await ejs.renderFile('views/homepage.ejs', { albums });
    res.send(renderedHtml);
};

module.exports = { mainAlbums, homepage };