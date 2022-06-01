module.exports = app => {
    const books = require("../controllers/booksController.js");
    var router = require("express").Router();

    //Create new book (Sample Data)
    router.post("/", books.create);

    //Update a book with bookID
    router.put("/:bookID", books.update);

    //Retrieve a single book with bookID
    router.get("/:title", books.findOne);

    //Delete a single book with bookID
    router.delete("/:bookID", books.delete);

    //Make FIND ALL
    //router.get("/", books.findOne);

    app.use('/api/books', router);
};