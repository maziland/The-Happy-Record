const fs = require("fs")
const mongoose = require("mongoose")

const albumService = require("../services/album")
const userService = require("../services/user")


async function initializeUsers() {
    await userService.deleteUsers({});
    await userService.addUser("admin", "password", "admin@admin.com");
    await userService.addUser("admin2", "password", "admin2@admin.com");
}

mongoose.connect(process.env.CONNECTION_STRING);
initializeUsers();



fs.readFile("./data/top_albums.json", 'utf8', function (err, data) {
    try {
        albumService.uploadJson((JSON.parse(data)), override = true);
    }
    catch (err) {
        console.error("Problem reading albums json");
    }
});

