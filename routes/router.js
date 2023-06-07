
const express = require('express');
const router = express.Router();

const albumsController = require("../controllers/albums");

router.get("/", albumsController.homepage);
router.get("/albums", albumsController.mainAlbums);

module.exports = router;