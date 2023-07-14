const Orders = require("../models/orders").ordersModel;
const logger = require("../utils/logger");

async function renderOrdersPage(req, res) {
    var orders = await Orders.find({ owner: req.session.username }).sort({ createdAt: -1 });
    res.render("orders.ejs", { orders });
};

module.exports = { renderOrdersPage };