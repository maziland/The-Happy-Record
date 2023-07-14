const logger = require("../utils/logger");
const Cart = require("../models/cart").cartModel;
const creditsService = require("../services/credits");
const albumService = require("../services/album");

async function getCart(req, res) {
    try {
        logger.info(`got getCart request from ${req.session.username}`)
        const owner = req.session.username;
        const cart = await Cart.findOne({ owner });
        if (cart && cart.items.length > 0) {
            res.status(200).send(cart);
        } else {
            res.send(null);
        }
    } catch (error) {
        logger.error(`getCart failed`)
        res.status(500).send('Internal Server Error');
    }
};

async function addToCart(req, res) {
    try {
        logger.info(`got addToCart request from ${req.session.username}`)
        const owner = req.session.username;
        const { itemId, quantity } = req.body;
        const cart = await Cart.findOne({ owner });
        const item = await albumService.findById(itemId);
        if (!item) {
            res.status(404).send({ message: "item not found" });
            return;
        }
        const { name, artist, coverImage, price } = item;
        //If cart already exists for user,
        if (cart) {
            const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);
            //check if product exists or not
            if (itemIndex > -1) {
                let product = cart.items[itemIndex];
                product.quantity += Number(quantity);
                if (product.quantity == 0) {
                    // Remove item from array
                    cart.items.splice(itemIndex, 1);
                    await cart.save();
                    res.status(200).send(cart);
                    return;
                }
                // Recalculate the cart's bill
                cart.bill = cart.items.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price;
                }, 0)
                cart.items[itemIndex] = product;
                await cart.save();
                res.status(200).send(cart);
            } else {
                cart.items.push({ itemId, name, artist, coverImage, quantity, price });
                // Recalculate the cart's bill
                cart.bill = cart.items.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price;
                }, 0)
                await cart.save();
                res.status(200).send(cart);
            }
        } else {
            //no cart exists, create one
            const newCart = await Cart.create({
                owner,
                items: [{ itemId, name, artist, coverImage, quantity, price }],
                bill: quantity * price,
            });
            return res.status(201).send(newCart);
        }
    } catch (error) {
        logger.error(`addToCart failed with "${error}"`)
        res.status(500).send("something went wrong");
    }
};

async function renderCheckoutPage(req, res) {
    try {
        // Check if there is a saved credit card for the user
        var creditCard = await creditsService.getCreditCardByUsername(req.session.username);
        // Show user's checkout page
        return res.render('checkout.ejs', { creditCard });
    } catch (error) {
        // Handle error
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function checkout(req, res) {
    try {
        const { cardholder, cardnumber, expiration, cvv } = req.body;
        cardExists = await creditsService.getCreditCardByUsername(req.session.username);
        if (!cardExists) {
            // Save user's card on DB
            await creditsService.addCreditCardForUser(req.session.username, cardnumber, cardholder, expiration, cvv);
        };
        // Delete the cart
        await Cart.deleteOne({ owner: req.session.username })
        logger.info(`Deleted cart for ${req.session.username}`);

        // Add to orders

        return res.send(555).send("Still not implemented");
    } catch (error) {
        // Handle error
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
}

module.exports = { addToCart, getCart, renderCheckoutPage, checkout };