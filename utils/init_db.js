const fs = require("fs")
const mongoose = require("mongoose")

const albumService = require("../services/album")
const userService = require("../services/user")

mongoose.connect(process.env.CONNECTION_STRING);
fs.readFile("./data/top_albums.json", 'utf8', function (err, data) {
    try {
        albumService.uploadJson((JSON.parse(data)), override = true);
    }
    catch (err) {
        console.error("Problem reading albums json");
    }
});
// userService.uploadJson(JSON.parse('{"name":"admin","email":"test@test.com","password":"123"}'), override = true);
userService.addUser("admin", "password", "admin@admin.com");

