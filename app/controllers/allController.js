const All = require("../modules/AllModel.js");
const {} = require("express");


exports.findAll = (req, res) => {
    All.getAll((err, data) => {
        if (err) {
            if (err.kind === "not_found"){
                res.status(404).send({
                    message: `Not found All'.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving All'.`
                });
            }
        } else res.send(data);
    });
};



