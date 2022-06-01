module.exports = app => {
    const books = require("../controllers/booksController.js");
    var router = require("express").Router();

    //Create new book (Sample Data)
    router.post("/", books.create);

    //Retrieve all books (Sample Data)
    router.get("/", books.findAll);

    //Update a book with id
    router.put("/:id", books.update);

    //Retrieve a single book with id
    router.get("/:id", books.findOne);

    //Delete a single book with id
    router.delete("/:id", books.delete);



    app.use('/api/books', router);
};