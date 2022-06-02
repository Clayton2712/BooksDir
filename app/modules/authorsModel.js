const { query } = require("express");
const sql = require("./db.js");

//constructor
const Author = function (author) {
    this.authorName = author.authorName;
};

Author.create = (newAuthor, result) => {
    sql.query("INSERT INTO authors SET ?", newAuthor, (err, res) => {
        if(err) {
            console.log("error ", err);
            result(err, null);
            return;
        }
        console.log("created author: ", {authorID: res.insertId, ...newAuthor});
        result(null, {authorID: res.insertId, ...newAuthor});
    });
};

Author.findByName = (authorName, result) => {
    sql.query(`SELECT * FROM authors WHERE authorName = '${authorName}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found author: ", res[0]);
            result(null, res[0]);
            return;
        }
        //not found author with authorName
        result({kind: "not_found"}, null);
    });
};

Author.updateById = (authorID, author, result) => {
    sql.query(
        "UPDATE authors SET authorName = ? WHERE authorID = ?",
        [author.authorName, authorID],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                //Not found Author with the ID
                result({ kind: "not_found"}, null);
                return;
            }
            console.log("Updated author: ", {authorID: authorID, ...author});
            result(null, {authorID: authorID, ...author});
        }
    );
};

Author.remove = (authorID, result) => {
    sql.query("DELETE FROM authors WHERE authorID = ?", authorID, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if(res.affectedRows == 0) {
            //no author found with ID
            result({kind: "not_found"}, null);
            return;
        }
        console.log(`Deleted author with ID: ${authorID}`);
        result(null, res);
    });
};

module.exports = Author;