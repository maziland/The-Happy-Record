const Orders = require("../models/orders").ordersModel;
const Albums = require("../models/album").albumModel;
const Users = require("../models/user").User;

const logger = require("../utils/logger");


async function renderAdminPanel(req, res) {
    try {
        logger.debug(`Admin panel was opened!`);

        // show admin panel
        return res.render('admin.ejs');
    } catch (error) {
        // Handle error
        logger.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function renderAddAlbumPage(req, res) {
    try {
        return res.render('add_album.ejs');
    } catch (error) {
        // Handle error
        logger.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function addAlbum(req, res) {
    try {
        if (req.get('Content-Type') === 'application/x-www-form-urlencoded') {
            const { name, artist, rank, image, year, price } = req.body;

            const album = new Albums({
                name: name,
                artist: artist,
                rank: rank,
                coverImage: image,
                releaseYear: year,
                price: price,
            });
            logger.info(`Adding the album: ${album}`);
            await album.save();
            return res.redirect("/albums");
        } else {
            res.status(400).send('Wrong Content-Type');
        }

    } catch (error) {
        // Handle error
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function renderUsersPage(req, res) {
    try {
        const users = await Users.find({});
        return res.render('users.ejs', { users });
    } catch (error) {
        // Handle error
        logger.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function renderOrdersPage(req, res) {
    try {
        var orders = await Orders.find({}).sort({ createdAt: -1 });
        res.locals.showAll = true;
        res.render("orders.ejs", { orders });
    } catch (error) {
        // Handle error
        logger.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function renderStatisticsPage(req, res) {
    try {
        logger.debug("Presenting graphs");

        // get all orders
        var allOrders = await Orders.find({}).sort({ createdAt: -1 });

        // GroupBy to store orders by date
        var ordersByDate = await Orders.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                    },
                    count: { $sum: 1 }
                }
            }
        ]);
        const sales = allOrders.map(order => ({
            bill: order.bill,
            createdAt: new Date(order.createdAt),
        }));

        return res.render('stats.ejs', { data: { sales: sales, orders: ordersByDate } });
    } catch (error) {
        logger.error(error)
        res.status(500).send('Internal server error');
    }
}
module.exports = { renderAdminPanel, renderAddAlbumPage, addAlbum, renderUsersPage, renderOrdersPage, renderStatisticsPage };