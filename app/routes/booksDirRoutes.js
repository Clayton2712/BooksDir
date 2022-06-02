module.exports = app => {
    const books = require("../controllers/booksController.js");
    const genres = require("../controllers/genresController.js");
    const authors = require("../controllers/authorsController.js");
    const all = require("../controllers/AllController.js");
    var router = require("express").Router();

    //Create new x (Sample Data)
    router.post("/books", books.create);
    router.post("/authors", authors.create);
    router.post("/genres", genres.create);

    //Update a x with xID
    router.put("/books/:bookID", books.update);
    router.put("/authors/:authorID", authors.update);
    router.put("/genres/:genreID", genres.update);

    //Retrieve a single x with xID
    router.get("/books/:title", books.findOne);
    router.get("/authors/:authorName", authors.findOne);
    router.get("/genres/:genre", genres.findOne);

    //Delete a single x with xID
    router.delete("/books/:bookID", books.delete);
    router.delete("/authors/:authorID", authors.delete);
    router.delete("/genres/:genreID", genres.delete);

    //Make FIND ALL
    router.get("/all", all.findAll);

    app.use('/api', router);
};