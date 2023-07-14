const cartModel = require("../models/cart").cartModel;
const logger = require("../utils/logger");

async function deleteCarts() {
    await cartModel.deleteMany({});
    logger.debug("Deleted carts collection");
};

async function deleteCart(username) {
    await cartModel.deleteOne({ owner: username });
    logger.info(`Deleted cart for ${username}`);
};

module.exports = { deleteCarts, deleteCart };