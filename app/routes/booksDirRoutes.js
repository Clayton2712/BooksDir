module.exports = app => {
    const books = require("../controllers/booksController.js");
    var router = require("express").Router();

    //Create new Tutorial (Sample Data)
    router.post("/", books.create);

    //Retrieve all Tutorial (Sample Data)
    router.get("/", books.findAll);

    //Update a tutorial with id
    router.put("/:id", books.update);

    //Retrieve a single tutorial with id
    router.get("/:id", books.findOne);

    //Delete a single tutorial with id
    router.delete("/:id", books.delete);


    
    app.use('/api/books', router);
};