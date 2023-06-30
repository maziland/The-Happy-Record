const User = require("../models/user").User;
const logger = require("../utils/logger")

// function to delete all users from users collection
async function deleteUsers() {
    logger.debug("Deleting users collection");
    await User.deleteMany({});
}

// Checker function to validate the email before updating
async function updateEmailForUsernameCheck(newEmail) {
    try {
        const userByEmail = await getUserByEmail(newEmail);
        if (userByEmail) {
            // There is a user with this mail
            return false;
        }
        return true;

    } catch (error) {
        logger.error(error);
        return false;
    }
}
// function to find a user by its name.
// returns null if no user is found
async function getUserByUsername(name) {
    try {
        const user = await User.findOne({ username: name });
        return user;
    } catch (error) {
        logger.error(error);
        return null;
    }
}

// function to find a user by email address.
// returns null if no user is found
async function getUserByEmail(email) {
    try {
        const user = await User.findOne({ email: email });
        return user;
    } catch (error) {
        logger.error(error);
        return null;
    }
}

// add a user to the users collection
async function addUser(username, userPassword, userEmail) {
    let newUser = new User();

    // Initialize newUser object with request data 
    newUser.username = username;
    newUser.email = userEmail;

    // Call setPassword function to hash password 
    newUser.setPassword(userPassword);
    return await newUser.save()
}

module.exports = { updateEmailForUsernameCheck, addUser, deleteUsers, getUserByUsername, getUserByEmail };