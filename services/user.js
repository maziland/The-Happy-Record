const model = require("../models/user")
const userModel = model.userModel;

async function deleteUsers() {
    await userModel.deleteMany({});
    console.log("Deleted users collection");
    return;
};

async function addUser(id, name) {
    const user = new userModel({
        _id: id,
        _name: name,
    })

    return await user.save()
}

async function uploadJson(json, override = false) {
    if (override === true) {
        await userModel.collection.drop();
    }
    await userModel.insertMany(json);
};

module.exports = { addUser, uploadJson, deleteUsers };