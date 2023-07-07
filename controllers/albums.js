const albumModel = require("../models/album").albumModel

async function mainAlbums(req, res) {
    const collection = albumModel.collection;
    const allAlbums = await collection.find({}).toArray();
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const sort = req.query.sort || 'default'; // Default sorting option if not provided

    // Define the number of albums to display per page
    const albumsPerPage = 20;

    // Calculate the start and end indices of the albums to display
    const startIndex = (page - 1) * albumsPerPage;
    const endIndex = page * albumsPerPage;

    // Slice the albums array based on the calculated indices
    const displayedAlbums = allAlbums.slice(startIndex, endIndex);

    logger.debug(`Rendering albums with sorting: ${sort}, albums per page: ${albumsPerPage}`);
    res.render('albums.ejs', {
        albums: displayedAlbums,
        currentPage: page,
        totalPages: Math.ceil(allAlbums.length / albumsPerPage),
        sortOption: sort
    });
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