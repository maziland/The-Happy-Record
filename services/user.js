const User = require("../models/user").userModel;

async function deleteUsers() {
    await userModel.deleteMany({});
    console.log("Deleted users collection");
    return;
};

async function addUser(username, userPassword, userEmail) {
    let newUser = new User();

    // Initialize newUser object with request data 
    newUser.username = username;
    newUser.email = userEmail;

    // Call setPassword function to hash password 
    newUser.setPassword(userPassword);
    return await newUser.save()
}

async function uploadJson(json, override = false) {
    if (override === true) {
        await userModel.collection.drop();
    }
    await userModel.insertMany(json);
};

module.exports = { addUser, uploadJson, deleteUsers };