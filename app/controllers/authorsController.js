const Author = require("../modules/authorsModel.js");
const {} = require("express");

//Create and save a new Author
exports.create = (req, res) => {
    //Validation
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    //Create Author
    const author = new Author({
        authorName: req.body.authorName,
    });
    //Save author in database
    Author.create(author, (err, data) => {
        if(err)
        res.status(500).send({
            message: err.message || "Some error occured while creating the Author."
        });
        else res.send(data);
    });
};

//Find single Author with an Title
exports.findOne = (req, res) => {
    Author.findByName(req.params.authorName, (err, data) => {
        if (err) {
            if (err.kind === "not_found"){
                res.status(404).send({
                    message: `Not found Author with authorName: '${req.params.authorName}'.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving Author with authorName: '${req.params.authorName}'.`
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
    Author.updateById(
        req.params.authorID,
        new Author(req.body),
        (err, data) => {
            if(err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Author with ID ${req.params.authorID}.`
                    });
                } else {
                    res.status(500).send({
                        message: `Error updating Author with ID ${req.params.authorID}.`
                    });
                }
            }else res.send(data);
        }
    );
};

//Delete a author by ID
exports.delete = (req, res) => {
    Author.remove(req.params.authorID, (err, data) => {
        if(err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No author found with ID: ${req.params.authorID}.` 
                });
            } else {
                res.status(500).send({
                    message: `Could not delete author with ID: ${req.params.authorID}`
                });
            }
        } else res.send({message: `Author deleted successfully!`});
    });
};