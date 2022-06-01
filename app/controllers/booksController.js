const Book = require("../modules/booksModel.js");
const {} = require("express");

//Create and save a new Book
exports.create = (req, res) => {
    //Validation
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    //Create Book
    const book = new Book({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published || false
    });
    //Save book in database
    Book.create(book, (err, data) => {
        if(err)
        res.status(500).send({
            message: err.message || "Some error occured while creating the Book."
        });
        else res.send(data);
    });
};

//Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
    const title = req.query.title;
    Book.getAll(title, (err, data) => {
        if (err) 
            res.status(500).send({
                message: err.message || "Some error occured while retrieving tutorials."
            });
        else res.send(data);
    });
};

//Find single Book with an ID
exports.findOne = (req, res) => {
    Book.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found"){
                res.status(404).send({
                    message: `Not found Book with ID: ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving Book with ID: ${req.params.id}.`
                });
            }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    //Validation request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    console.log(req.body);
    Book.updateById(
        req.params.id,
        new Book(req.body),
        (err, data) => {
            if(err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Book with ID ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: `Error updating Book with ID ${req.params.id}.`
                    });
                }
            }else res.send(data);
        }
    );
};

//Delete a book by ID
exports.delete = (req, res) => {
    Book.remove(req.params.id, (err, data) => {
        if(err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No book found with ID: ${req.params.id}.` 
                });
            } else {
                res.status(500).send({
                    message: `Could not delete book with id: ${req.params.id}`
                });
            }
        } else res.send({message: `Book deleted successfully!`});
    });
};