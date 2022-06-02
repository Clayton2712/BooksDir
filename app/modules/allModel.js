const { query } = require("express");
const sql = require("./db.js");

//constructor
const All = function () {};



All.getAll = (result) => {
    sql.query(
        `SELECT b.title, g.genreID, g.genre, a.authorID, a.authorName FROM books AS b
        LEFT JOIN genres AS g ON g.genreID = b.genreID
        LEFT JOIN authors AS a ON a.authorID = b.authorID;`,
        (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("returned ALL: ", res);
            result(null, res);
            return;
        }
        //not found author with authorName
        result({kind: "not_found"}, null);
    });
};


module.exports = All;