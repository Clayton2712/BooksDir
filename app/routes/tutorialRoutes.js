module.exports = app => {
    const tutorials = require("../controllers/tutorialController.js");
    var router = require("express").Router();

    //Create new Tutorial (Sample Data)
    router.post("/", tutorials.create);

    //Retrieve all Tutorials (Sample Data)
    router.get("/", tutorials.findAll);

    //Update a tutorial with id
    router.put("/:id", tutorials.update);

    //Retrieve a single tutorial with id
    router.get("/:id", tutorials.findOne);

    //Delete a single tutorial with id
    router.delete("/:id", tutorials.delete);

    //TODO ON OWN
    //router.get(":id", tutorials.findAllPublished);

    app.use('/api/tutorials', router);
    
};