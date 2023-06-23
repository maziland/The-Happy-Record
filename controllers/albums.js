const albumModel = require("../models/album").albumModel

async function mainAlbums(req, res) {
    const collection = albumModel.collection;
    const albums = await collection.find({}).toArray();
    res.render('albums.ejs', { albums });
};

async function homepage(req, res) {
    res.render("homepage.ejs");
};


// This function returns the albums.ejs only with albums
// found by the search query.
// Searching based on album name or artist name
async function search(req, res) {
    const searchString = req.query.q;
    const collection = albumModel.collection;
    const albums = await collection.find({
        $or: [
            { name: { $regex: searchString, $options: 'i' } },
            { artist: { $regex: searchString, $options: 'i' } }
        ]
    }).toArray();

    res.render('albums.ejs', { albums });
};

module.exports = { mainAlbums, homepage, search };