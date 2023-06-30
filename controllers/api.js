const usersService = require("../services/user")
const logger = require("../utils/logger");

async function userExists(req, res) {
    try {
        if (req.body.username) {
            logger.info(`Got API getUser request for '${req.body.username}'`);
            if (await usersService.getUserByUsername(req.body.username)) {
                return res.json(true)
            }
            return res.json(false);
        } else {
            return res.send("got invalid API request")
        }
    } catch (error) {
        // Handle error
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

async function emailExists(req, res) {
    try {
        if (req.body.email) {
            logger.info(`Got API emailExists request for '${req.body.email}'`);
            if (await usersService.getUserByEmail(req.body.email)) {
                return res.json(true)
            }
            return res.json(false);
        } else {
            return res.send("got invalid API request")
        }
    } catch (error) {
        // Handle error
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

// This function checks if the new email is valid for the user
async function checkEmail(req, res) {
    try {
        if (req.body.email) {
            logger.info(`API checkEmail request for email: ${req.body.email}'`);
            logger.info(`username: ${req.session.username}`);
            if (await usersService.updateEmailForUsernameCheck(req.body.email)) {
                // The email can be changed
                return res.json(true)
            }
            // The email can NOT be changed
            return res.json(false);
        } else {
            return res.send("got invalid API request")
        }
    } catch (error) {
        // Handle error
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { userExists, emailExists, checkEmail };