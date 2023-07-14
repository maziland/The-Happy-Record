const Orders = require("../models/orders").ordersModel;
const logger = require("../utils/logger")

async function getUserOrders(username) {
    try {
        const orders = await Orders.findOne({ owner: username });
        return orders;
    } catch (error) {
        logger.error(error);
        return null;
    }
}

async function addOrder(owner, items, bill) {
    try {
        let newOrder = new Orders();

        // Initialize newOrder object with request data 
        newOrder.owner = owner;
        newOrder.items = items;
        newOrder.bill = bill;
        return await newOrder.save()

    } catch (error) {
        logger.error(error);
        return null;
    }
}

module.exports = { addOrder, getUserOrders };