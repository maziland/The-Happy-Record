
const express = require('express');
const router = express.Router();

const albumsController = require("../controllers/albums");
const authController = require("../controllers/auth")

router.get("/", albumsController.homepage);
router.get("/albums", albumsController.mainAlbums);

// Auth routes
router.post("/login", authController.login);
router.get("/login", authController.renderLoginPage);
router.post("/login", authController.login);
router.get("/register", authController.renderRegisterPage);
router.post("/register", authController.register);
router.get("/logout", authController.logout)
// router.get("/myaccount", userController.myAccount);
router.get("/myaccount", authController.renderLoginPage);
router.get("/search", albumsController.search);

module.exports = router;