const cartModel = require("../models/cart").cartModel;
const logger = require("../utils/logger");

async function deleteCarts() {
    await cartModel.deleteMany({});
    logger.debug("Deleted carts collection");
};

module.exports = { deleteCarts };