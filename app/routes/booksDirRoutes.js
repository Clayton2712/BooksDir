module.exports = app => {
    const books = require("../controllers/booksController.js");
    var router = require("express").Router();

    //Create new book (Sample Data)
    router.post("/", books.create);

    //Update a book with id
    router.put("/:id", books.update);

    //Retrieve a single book with id
    router.get("/:title", books.findOne);

    //Delete a single book with id
    router.delete("/:id", books.delete);

    //Make FIND ALL
    //router.get("/", books.findOne);

    app.use('/api/books', router);
};