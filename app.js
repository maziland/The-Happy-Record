const express = require("express")
const app = express()
require("dotenv").config()
const session = require('express-session');
logger = require("./utils/logger");

// Connect to DB and insert data
if (process.env.INIT_DB == "true") {
    require("./utils/init_db");
}

// Setting a sessions middleware
const eightHours = 1000 * 60 * 60 * 8;
app.use(session({
    secret: process.env.SESSIONS_SECRET,
    saveUninitialized: true,
    cookie: { maxAge: eightHours },
    resave: false
}));

// Adding pre routes middlewares
app.use(require('./routes/middlewares/client_side_auth'));

// Extending the parsing abilities the server has
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use('/', require('./routes/router'));

app.use(require('./routes/middlewares/handle_404'));


app.listen(process.env.LISTEN_PORT || 3000);
logger.info(`Running at Port ${process.env.LISTEN_PORT || 3000}`);