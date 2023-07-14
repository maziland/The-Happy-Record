const Credits = require("../models/credits").creditsModel;
const logger = require("../utils/logger")

// function to find a credit card by its owner.
// returns null if no cards are found
async function getCreditCardByUsername(name) {
    try {
        const card = await Credits.findOne({ owner: name });
        return card;
    } catch (error) {
        logger.error(error);
        return null;
    }
}

async function addCreditCardForUser(username, number, holder, exp, cvv) {
    try {
        let newCard = new Credits();

        // Initialize newCard object with request data 
        newCard.owner = username;
        newCard.holder = holder;
        newCard.number = number;
        newCard.exp = exp;
        newCard.cvv = cvv;
        return await newCard.save()

    } catch (error) {
        logger.error(error);
        return null;
    }
}

module.exports = { addCreditCardForUser, getCreditCardByUsername };