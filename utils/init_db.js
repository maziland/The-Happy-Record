const fs = require("fs")
const mongoose = require("mongoose")
const logger = require("../utils/logger")
const albumService = require("../services/album")
const userService = require("../services/user")
const cartService = require("../services/cart")


async function initializeUsers() {
    await userService.deleteUsers({});
    await userService.addUser("admin", "password", "admin@admin.com");
    await userService.addUser("alon", "password", "alon@thr.com");
}

mongoose.connect(process.env.CONNECTION_STRING);
initializeUsers();



fs.readFile("./data/top_albums.json", 'utf8', function (err, data) {
    try {
        logger.info("Loaded albums from json");
        albumService.uploadJson((JSON.parse(data)), override = true);
    }
    catch (err) {
        logger.error("Problem reading albums json");
    }
});