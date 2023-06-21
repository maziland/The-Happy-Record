const mongoose = require('mongoose')
const crypto = require("crypto");

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    email: {
        type: String,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Number,
        required: false
    }
});

UserSchema.methods.setPassword = function (password) {

    // Hashing user's salt and password

    this.hashed_password = crypto.pbkdf2Sync(password, "",
        1000, 64, `sha512`).toString(`hex`);
};

// Method to check the entered password is correct or not 
UserSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password,
        "", 1000, 64, `sha512`).toString(`hex`);
    return this.hashed_password === hash;
};

const User = mongoose.model('User', UserSchema);
module.exports = { User };
