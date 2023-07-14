const fs = require("fs")
const mongoose = require("mongoose")

const albumService = require("../services/album")
const userService = require("../services/user")
const cartService = require("../services/cart")


async function initializeUsers() {
    await userService.deleteUsers({});
    await userService.addUser("admin", "password", "admin@admin.com");
    await userService.addUser("admin2", "password", "admin2@admin.com");
}

async function initializeCarts() {
    await cartService.deleteCarts({});
}

mongoose.connect(process.env.CONNECTION_STRING);
initializeUsers();
// initializeCarts();



fs.readFile("./data/top_albums.json", 'utf8', function (err, data) {
    try {
        // albumService.uploadJson((JSON.parse(data)), override = true);
    }
    catch (err) {
        console.error("Problem reading albums json");
    }
});

