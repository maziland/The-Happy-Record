
const express = require('express');
const router = express.Router();

const albumsController = require("../controllers/albums");
const authController = require("../controllers/auth")
const userController = require("../controllers/user")

router.get("/", albumsController.homepage);
router.get("/albums", albumsController.mainAlbums);

// Auth routes
router.post("/login", authController.login); albumsController
router.get("/login", authController.renderLoginPage);
router.post("/login", authController.login);
router.get("/register", authController.renderRegisterPage);
router.post("/register", authController.register);
router.get("/logout", authController.logout)
router.get("/search", albumsController.search);
router.get("/myaccount", userController.renderAccountPage);
router.post("/myaccount", userController.updateAccount);

module.exports = router;