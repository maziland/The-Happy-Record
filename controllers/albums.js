const ejs = require('ejs');
const albumService = require("../services/album")

async function mainAlbums(req, res) {
    const albumModel = require("../models/album").albumModel
    const collection = albumModel.collection;
    const albums = await collection.find({}).toArray();
    const renderedHtml = await ejs.renderFile('public/index.ejs', { albums });
    res.send(renderedHtml);
};

module.exports = { mainAlbums };