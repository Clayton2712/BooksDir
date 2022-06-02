const Genre = require("../models/genresModel.js");
const {} = require("express");

//Create and save a new Genre
exports.create = (req, res) => {
    //Validation
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    //Create Genre
    const genre = new Genre({
        genre: req.body.genre,
    });
    //Save genre in database
    Genre.create(genre, (err, data) => {
        if(err)
        res.status(500).send({
            message: err.message || "Some error occured while creating the Genre."
        });
        else res.send(data);
    });
};

//Find single Genre with an Title
exports.findOne = (req, res) => {
    Genre.findByGenre(req.params.genre, (err, data) => {
        if (err) {
            if (err.kind === "not_found"){
                res.status(404).send({
                    message: `Not found Genre with genre: '${req.params.genre}'.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving Genre with genre: '${req.params.genre}'.`
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
    Genre.updateById(
        req.params.genreID,
        new Genre(req.body),
        (err, data) => {
            if(err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Genre with ID ${req.params.genreID}.`
                    });
                } else {
                    res.status(500).send({
                        message: `Error updating Genre with ID ${req.params.genreID}.`
                    });
                }
            }else res.send(data);
        }
    );
};

//Delete a genre by ID
exports.delete = (req, res) => {
    Genre.remove(req.params.genreID, (err, data) => {
        if(err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No genre found with ID: ${req.params.genreID}.` 
                });
            } else {
                res.status(500).send({
                    message: `Could not delete genre with ID: ${req.params.genreID}`
                });
            }
        } else res.send({message: `Genre deleted successfully!`});
    });
};