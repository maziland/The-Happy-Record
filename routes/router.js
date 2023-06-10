
const express = require('express');
const router = express.Router();

const albumsController = require("../controllers/albums");
const authController = require("../controllers/auth")

router.get("/", albumsController.homepage);
router.get("/albums", albumsController.mainAlbums);
router.post("/login", authController.login);
router.get("/login", authController.renderLoginPage);
router.post("/login", authController.login);
router.get("/register", authController.renderRegisterPage);
router.get("/register", authController.register);
// router.get("/myaccount", userController.myAccount);
router.get("/myaccount", authController.renderLoginPage);

module.exports = router;