const model = require("../models/album")
const albumModel = model.albumModel;

async function deleteAlbums() {
    await albumModel.deleteMany({});
    console.log("Deleted albums collection");
};

async function addAlbum(id, name, date_created, price) {
    const album = new albumModel({
        _id: id,
        _name: name,
        _date_created: date_created,
        _price: price
    })

    return await album.save()
};

async function uploadJson(json, override = false) {
    if (override === true) {
        await albumModel.collection.drop();
    }
    await albumModel.insertMany(json);
};

module.exports = { addAlbum, uploadJson, deleteAlbums };