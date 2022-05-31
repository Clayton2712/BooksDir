const { query } = require("express");
const sql = require("./db.js");

//constructor
const Book = function (book) {
    this.title = book.title;
    this.description = book.description;
    this.published = book.published;
};

Book.create = (newTutorial, result) => {
    sql.query("INSERT INTO books SET ?", newTutorial, (err, res) => {
        if(err) {
            console.log("error ", err);
            result(err, null);
            return;
        }
        console.log("created book: ", {id: res.insertId, ...newTutorial});
        result(null, {id: res.insertId, ...newTutorial});
    });
};

Book.getAll = (title, result) => {
    let query = "SELECT * FROM books";
    if (title) {
        query += `WHERE title LIKE '%${title}%' `;
    }
    sql.query(query, (err, res) => {
        if(err) {
            console.log("error", err);
            result(null, err);
            return;
        }
        console.log("books", res);
        result(null, res);
    });
};

Book.updateById = (id, book, result) => {
    sql.query(
        "UPDATE books SET title = ?, description = ?, published = ? WHERE id = ?",
        [book.title, book.description, book.published, id],
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
            console.log("Updated book: ", {id: id, ...book});
            result(null, {id: id, ...book});
        }
    );
};

Book.findById = (id, result) => {
    sql.query(`SELECT * FROM books WHERE id = ${id}`, (err, res) => {
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
        //not found book with id
        result({kind: "not_found"}, null);
    });
};

Book.remove = (id, result) => {
    sql.query("DELETE FROM books WHERE id = ?", id, (err, res) => {
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
        console.log(`Deleted record with ID: ${id}`);
        result(null, res);
    });
};

module.exports = Book;