const express = require("express")
const app = express()
const path = require("path")
const fs = require("fs")
const mongoose = require("mongoose")
require("dotenv").config()
const session = require('express-session');

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
userService.uploadJson(JSON.parse('{"name":"admin","password":"123"}'), override = true);

// Set up app

// Setting a sessions middleware
const eightHours = 1000 * 60 * 60 * 8;
app.use(session({
    secret: process.env.SESSIONS_SECRET,
    saveUninitialized: true,
    cookie: { maxAge: eightHours },
    resave: false
}));

// Adding pre routes middlewares
app.use(require('./routes/middlewares/authenticated_check'));

// Extending the parsing abilities the server has
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use('/', require('./routes/router'));

app.use(require('./routes/middlewares/handle_404'));


app.listen(process.env.LISTEN_PORT || 3000);
console.log(`Running at Port ${process.env.LISTEN_PORT || 3000}`);