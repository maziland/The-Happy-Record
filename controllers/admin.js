const usersService = require("../services/user")
const logger = require("../utils/logger");

async function renderAdminPanel(req, res) {
    try {
        logger.debug(`Admin panel was opened!`);

        // show admin panel
        return res.render('admin.ejs');
    } catch (error) {
        // Handle error
        logger.error(error);
        res.status(500).send('Internal Server Error');
    }
}


async function renderAddAlbumPage(req, res) {
    try {
        logger.debug(`Admin panel was opened!`);
        return res.render('admin.ejs');
    } catch (error) {
        // Handle error
        logger.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function renderAddAlbumPage(req, res) {
    try {
        logger.debug(`Admin panel was opened!`);
        return res.render('admin.ejs');
    } catch (error) {
        // Handle error
        logger.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function addAlbum(req, res) {
    try {
        logger.debug(`Admin panel was opened!`);
        return res.render('admin.ejs');
    } catch (error) {
        // Handle error
        logger.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function renderUsersPage(req, res) {
    try {
        logger.debug(`Admin panel was opened!`);
        return res.render('admin.ejs');
    } catch (error) {
        // Handle error
        logger.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function renderOrdersPage(req, res) {
    try {
        logger.debug(`Admin panel was opened!`);
        return res.render('admin.ejs');
    } catch (error) {
        // Handle error
        logger.error(error);
        res.status(500).send('Internal Server Error');
    }
}
module.exports = { renderAdminPanel, renderAddAlbumPage, addAlbum, renderUsersPage, renderOrdersPage };