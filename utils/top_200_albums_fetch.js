const axios = require('axios').default;
const JSSoup = require('jssoup').default;
const he = require('he');
const fs = require("fs");

var albums = []

function nameTrim(str) {
    return he.decode(str.replace("\r\n", "").replace(/\s\s+/g, ' '));
}

async function getRequest(url) {
    try {
        const response = (await axios.get(url));
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

async function getAlbumsFromPage(url) {
    console.log(url);
    htmlData = await getRequest(url);
    const soup = new JSSoup(htmlData);
    table = soup.find("table");
    table_rows = table.findAll("td", "main_entry").forEach(entry => {
        row = entry.parent;
        album = {
            "number": row.find("td", "number").text,
            "coverImage": row.find("td", "list_art").find("img").attrs["data-src"],
            "singerName": nameTrim(row.find("td", "main_entry").find("h2").find("a").text),
            "albumName": nameTrim(row.find("td", "main_entry").find("h3").find("a").text),
            "releaseYear": row.find("td", "main_entry").find("h3").find("span").text.replace("(", "").replace(")", "")
        }
        albums = albums.concat(album);
    });
};

async function getAlbumsFromAllPages() {
    // baseUrl = "https://rateyourmusic.com/list/CrabbyLoafers/billboard-greatest-of-all-time-billboard-200-albums/"
    baseUrl = "http://127.0.0.1:8000/"
    index = 1;
    while (index <= 8) {
        url = baseUrl + index + ".html";
        console.log(`Scraping index ${index}`);
        await getAlbumsFromPage(url);
        index++;
    }
    fs.writeFile("data/top_albums.json", JSON.stringify(albums), (err) => {
        if (err) throw (err);
    });
    console.log("finished");
};

getAlbumsFromAllPages();