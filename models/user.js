const mongoose = require('mongoose')

const user = new mongoose.Schema({
    name: String,
    password: String
});

const userModel = mongoose.model('users', user);
module.exports = { userModel };
