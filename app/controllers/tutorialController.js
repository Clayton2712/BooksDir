const Tutorial = require("../modules/booksDirModel.js");
const {} = require("express");

//Create and save a new Tutorial
exports.create = (req, res) => {
    //Validation
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    //Create Tutorial
    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published || false
    });
    //Save tutorial in database
    Tutorial.create(tutorial, (err, data) => {
        if(err)
        res.status(500).send({
            message: err.message || "Some error occured while creating the Tutorial."
        });
        else res.send(data);
    });
};

//Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
    const title = req.query.title;
    Tutorial.getAll(title, (err, data) => {
        if (err) 
            res.status(500).send({
                message: err.message || "Some error occured while retrieving tutorials."
            });
        else res.send(data);
    });
};

//Find single Tutorial with an ID
exports.findOne = (req, res) => {
    Tutorial.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found"){
                res.status(404).send({
                    message: `Not found Tutorial with ID: ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving Tutorial with ID: ${req.params.id}.`
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
    Tutorial.updateById(
        req.params.id,
        new Tutorial(req.body),
        (err, data) => {
            if(err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Tutorial with ID ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: `Error updating Tutorial with ID ${req.params.id}.`
                    });
                }
            }else res.send(data);
        }
    );
};

//Delete a tutorial by ID
exports.delete = (req, res) => {
    Tutorial.remove(req.params.id, (err, data) => {
        if(err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No tutorial found with ID: ${req.params.id}.` 
                });
            } else {
                res.status(500).send({
                    message: `Could not delete tutorial with id: ${req.params.id}`
                });
            }
        } else res.send({message: `Tutorial deleted successfully!`});
    });
};