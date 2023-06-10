const userModel = require("../models/user").userModel;

async function deleteUsers() {
    await userModel.deleteMany({});
    console.log("Deleted users collection");
    return;
};

async function addUser(username, userPassword) {
    const user = new userModel({
        name: username,
        password: userPassword
    });

    return await user.save()
}

async function uploadJson(json, override = false) {
    if (override === true) {
        await userModel.collection.drop();
    }
    await userModel.insertMany(json);
};

module.exports = { addUser, uploadJson, deleteUsers };