
const express = require('express');
const router = express.Router();
const Auth = require("./middlewares/server_side_auth");
const adminAuth = require("./middlewares/server_side_admin_auth");

const albumsController = require("../controllers/albums");
const homepageController = require("../controllers/homepage");
const ordersController = require("../controllers/orders");
const authController = require("../controllers/auth")
const userController = require("../controllers/user")
const apiController = require("../controllers/api")
const cartController = require("../controllers/cart")
const adminController = require("../controllers/admin")

// Main route
router.get("/", homepageController.homepage);

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

// Cart routes
router.get("/cart", Auth, cartController.getCart);
router.post("/cart", Auth, cartController.addToCart);
router.get("/checkout", Auth, cartController.renderCheckoutPage);
router.post("/checkout", Auth, cartController.checkout);

// Orders routes
router.get("/orders", Auth, ordersController.renderOrdersPage);

// Admin panel routes
router.get("/admin", adminAuth, adminController.renderAdminPanel);
router.get("/admin/add-album", adminAuth, adminController.renderAddAlbumPage);
router.post("/admin/add-album", adminAuth, adminController.addAlbum);
router.get("/admin/users", adminAuth, adminController.renderUsersPage);
router.get("/admin/orders", adminAuth, adminController.renderOrdersPage);
router.get("/admin/stats", adminAuth, adminController.renderStatisticsPage);

// API routes
router.post("/api/user/exists", apiController.userExists);
router.post("/api/email/exists", apiController.emailExists);
router.post("/api/email/updatecheck", apiController.checkEmail);

module.exports = router;