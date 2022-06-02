const { query } = require("express");
const sql = require("./db.js");

//constructor
const Book = function (book) {
    this.title = book.title;
    this.authorID = book.authorID;
    this.genreID = book.genreID;
};

Book.create = (newBook, result) => {
    sql.query("INSERT INTO books SET ?", newBook, (err, res) => {
        if(err) {
            console.log("error ", err);
            result(err, null);
            return;
        }
        console.log("created book: ", {bookID: res.insertId, ...newBook});
        result(null, {bookID: res.insertId, ...newBook});
    });
};

Book.findByTitle = (bookTitle, result) => {
    sql.query(`SELECT * FROM books WHERE title = '${bookTitle}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found book: ", res[0]);
            result(null, res[0]);
            return;
        }
        //not found book with bookTitle
        result({kind: "not_found"}, null);
    });
};

Book.updateById = (bookID, book, result) => {
    sql.query(
        "UPDATE books SET title = ?, authorID = ?, genreID = ? WHERE bookID = ?",
        [book.title, book.authorID, book.genreID, bookID],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                //Not found Book with the ID
                result({ kind: "not_found"}, null);
                return;
            }
            console.log("Updated book: ", {bookID: bookID, ...book});
            result(null, {bookID: bookID, ...book});
        }
    );
};

Book.remove = (bookID, result) => {
    sql.query("DELETE FROM books WHERE bookID = ?", bookID, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if(res.affectedRows == 0) {
            //no book found with ID
            result({kind: "not_found"}, null);
            return;
        }
        console.log(`Deleted book with ID: ${bookID}`);
        result(null, res);
    });
};

module.exports = Book;