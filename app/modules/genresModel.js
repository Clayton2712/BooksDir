const { query } = require("express");
const sql = require("./db.js");

//constructor
const Genre = function (genre) {
    this.genre = genre.genre;
    this.authorID = genre.authorID;
    this.genreID = genre.genreID;
};

Genre.create = (newGenre, result) => {
    sql.query("INSERT INTO genres SET ?", newGenre, (err, res) => {
        if(err) {
            console.log("error ", err);
            result(err, null);
            return;
        }
        console.log("created genre: ", {genreID: res.insertId, ...newGenre});
        result(null, {genreID: res.insertId, ...newGenre});
    });
};

Genre.findByGenre = (genreGenre, result) => {
    sql.query(`SELECT * FROM genres WHERE genre = '${genreGenre}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found genre: ", res[0]);
            result(null, res[0]);
            return;
        }
        //not found genre with genreGenre
        result({kind: "not_found"}, null);
    });
};

Genre.updateById = (genreID, genre, result) => {
    sql.query(
        "UPDATE genres SET genre = ? WHERE genreID = ?",
        [genre.genre, genreID],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                //Not found Genre with the ID
                result({ kind: "not_found"}, null);
                return;
            }
            console.log("Updated genre: ", {genreID: genreID, ...genre});
            result(null, {genreID: genreID, ...genre});
        }
    );
};

Genre.remove = (genreID, result) => {
    sql.query("DELETE FROM genres WHERE genreID = ?", genreID, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if(res.affectedRows == 0) {
            //no genre found with ID
            result({kind: "not_found"}, null);
            return;
        }
        console.log(`Deleted genre with ID: ${genreID}`);
        result(null, res);
    });
};

module.exports = Genre;