const mongoose = require('mongoose')
const crypto = require("crypto");

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
});

UserSchema.methods.setPassword = function (password) {

    // Creating a unique salt 
    this.salt = crypto.randomBytes(16).toString('hex');

    // Hashing user's salt and password

    this.hashed_password = crypto.pbkdf2Sync(password, this.salt,
        1000, 64, `sha512`).toString(`hex`);
};

// Method to check the entered password is correct or not 
UserSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password,
        this.salt, 1000, 64, `sha512`).toString(`hex`);
    return this.hashed_password === hash;
};

const userModel = mongoose.model('User', UserSchema);
module.exports = { userModel };
