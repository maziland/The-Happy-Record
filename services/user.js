const User = require("../models/user").User;

// function to delete all users from users collection
async function deleteUsers() {
    await User.deleteMany({});
    console.log("Deleted users collection");
    return;
};

// function to find a user by its name.
// returns null if no user is found
async function getUser(name) {
    try {
        const user = await User.findOne({ username: name });
        return user;
    } catch (error) {
        console.log(error);
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

module.exports = { addUser, deleteUsers, getUser };