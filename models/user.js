const mongoose = require('mongoose')

const user = new mongoose.Schema({
    _id: String,
    _name: String,
});

const userModel = mongoose.model('users', user);
module.exports = { userModel };
