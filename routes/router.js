
const express = require('express');
const router = express.Router();
const Auth = require("./middlewares/server_side_auth");

const albumsController = require("../controllers/albums");
const authController = require("../controllers/auth")
const userController = require("../controllers/user")
const apiController = require("../controllers/api")

// Main route
router.get("/", albumsController.homepage);

// Albums route
router.get("/albums", albumsController.mainAlbums);

// Auth routes
router.post("/login", authController.login);
router.get("/login", authController.renderLoginPage);
router.get("/register", authController.renderRegisterPage);
router.post("/register", authController.register);
router.get("/logout", Auth, authController.logout)
router.get("/search", Auth, albumsController.search);

// User routes
router.get("/myaccount", Auth, userController.renderAccountPage);
router.post("/myaccount/update", Auth, userController.updateAccount);

// API routes
router.post("/api/user/exists", apiController.userExists);
router.post("/api/email/exists", apiController.emailExists);
router.post("/api/email/updatecheck", apiController.checkEmail);

module.exports = router;