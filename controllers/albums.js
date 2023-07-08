const albumModel = require("../models/album").albumModel
function sortArrayByParameter(array, parameter) {
    switch (parameter) {
        case 'rank':
            return array.sort((a, b) => a.rank - b.rank);
        case 'title':
            return array.sort((a, b) => a.name.localeCompare(b.name));
        case 'artist':
            return array.sort((a, b) => a.artist.localeCompare(b.artist));
        case 'price_lth':
            return array.sort((a, b) => a.price - b.price);
        case 'price_htl':
            return array.sort((a, b) => b.price - a.price);
        default:
            return array;
    }
}
async function mainAlbums(req, res) {
    const collection = albumModel.collection;
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const sort = req.query.sort || 'rank'; // Default sorting option if not provided
    // Define the number of albums to display per page
    const albumsPerPage = 20;

    // Calculate the start and end indices of the albums to display
    const startIndex = (page - 1) * albumsPerPage;
    const endIndex = page * albumsPerPage;

    // Sort albums
    var allAlbums = await collection.find({}).toArray();
    sortedAlbums = sortArrayByParameter(allAlbums, sort);

    // Slice the albums array based on the calculated indices
    const displayedAlbums = sortedAlbums.slice(startIndex, endIndex);

    logger.debug(`Rendering albums with sorting: ${sort}, albums per page: ${albumsPerPage}`);
    res.render('albums.ejs', {
        albums: displayedAlbums,
        currentPage: page,
        totalPages: Math.ceil(sortedAlbums.length / albumsPerPage),
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
    const displayedAlbums = await collection.find({
        $or: [
            { name: { $regex: searchString, $options: 'i' } },
            { artist: { $regex: searchString, $options: 'i' } }
        ]
    }).toArray();

    res.render('albums.ejs', {
        albums: displayedAlbums,
        currentPage: 1,
        totalPages: 0,
        sortOption: "rank"
    });
};

module.exports = { mainAlbums, homepage, search };