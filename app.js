const express = require("express")
const app = express()
const path = require("path")
const fs = require("fs")
const mongoose = require("mongoose")
require("dotenv").config()

const albumService = require("./services/album")
const userService = require("./services/user")

mongoose.connect(process.env.CONNECTION_STRING);

fs.readFile("data/top_albums.json", 'utf8', function (err, data) {
    try {
        albumService.uploadJson((JSON.parse(data)), override = true);
    }
    catch (err) {
        console.error("Problem reading albums json");
    }
});
userService.uploadJson(JSON.parse('{"_id":"5","_name":"user"}'), override = true);

app.use(express.static('public'))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(process.env.LISTE_PORT || 3000)
console.log(`Running at Port ${process.env.LISTEN_PORT || 3000}`);