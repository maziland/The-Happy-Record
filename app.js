const express = require("express")
const app = express()
const path = require("path")
const fs = require("fs")
const mongoose = require("mongoose")
require("dotenv").config()

const albumService = require("./services/album")
const userService = require("./services/user")

// Connect to DB and insert data
mongoose.connect(process.env.CONNECTION_STRING);
fs.readFile("data/top_albums.json", 'utf8', function (err, data) {
    try {
        albumService.uploadJson((JSON.parse(data)), override = true);
    }
    catch (err) {
        console.error("Problem reading albums json");
    }
});
userService.uploadJson(JSON.parse('{"_id":"7","_name":"user"}'), override = true);

// Set up app

app.use(express.static('public'));

app.use('/', require('./routes/router'));

const mw = require('./routes/handle_404')
app.use(mw)
// app.use(require("./routes/handle_404"));

app.listen(process.env.LISTEN_PORT || 3000)
console.log(`Running at Port ${process.env.LISTEN_PORT || 3000}`);