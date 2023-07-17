const fs = require("fs")
const mongoose = require("mongoose")
require("dotenv").config()
const logger = require("../utils/logger")
const albumService = require("../services/album")
const userService = require("../services/user")

function getPassword() {
    if (process.env.IS_PROD) {
        logger.info(`Password set to PROD environment`)
        return "jskdfna-asdbhb-932azx";
    } else {
        logger.warning(`Notice: Password set to NON PROD environment`)
        return "password";
    }
}

async function initializeUsers() {
    await userService.deleteUsers({});
    const password = getPassword();
    await userService.addUser("admin", password, "admin@admin.com");
    await userService.addUser("alon", password, "alon@thr.com");
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