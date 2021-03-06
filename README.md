# BooksDir

Books Directory Project

Create a simple books directory API, NodeJS, Express.js, MySQL and Postman (for testing).
Build a book directory having a collection of books where you can create endpoints using
4 basic methods: GET, PUT, POST, and DELETE.

Features of Books Directory:

Management of database using POSTMAN.
Option to create, read, update, delete genre
Option to create, read, update, delete authors
Option to create (attach book to genre), read, update, delete book
Search for the required book.
Option which lists all the authors and genres.
Ensuring whether proper API calls are made and routes are connected.
Technologies to use: Nodejs, Express, MySQL.

DB Name: BooksDir.
DB Tables: books, genres, authors.

Project Date: 27 May 2022
Project Presentation Date: 3 June 2022

DB MySQL:

CREATE TABLE IF NOT EXISTS books (
	bookID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(50) NOT NULL,
    authorID INT,
    genreID INT,
	FOREIGN KEY (authorID) REFERENCES authors(authorID),
	FOREIGN KEY (genreID) REFERENCES genres(genreID)
	);

CREATE TABLE IF NOT EXISTS genres (
	genreID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	genre VARCHAR(50) NOT NULL
	);

CREATE TABLE IF NOT EXISTS authors (
	authorID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	authorName VARCHAR(50) NOT NULL
	);
--Inserting Test genre, author and book into table.
INSERT INTO genres (genre)
VALUES ('TestGenre');

INSERT INTO authors (authorName)
VALUES ('TestAuthor');

INSERT INTO books (title, authorID, genreID)
VALUES ('TestBook', '1', '1');


--Selecting all books with genre(opt) and author(opt).
SELECT b.title, g.genre, a.authorName FROM books AS b
LEFT JOIN genres AS g ON g.genreID = b.genreID
LEFT JOIN authors AS a ON a.authorID = b.authorID;

--Selecting everything
SELECT * FROM books AS b
LEFT JOIN genres AS g ON g.genreID = b.genreID
LEFT JOIN authors AS a ON a.authorID = b.authorID;

--Deleting a record
DELETE FROM books WHERE bookID = ;

INSERT INTO books (title)
VALUES ('Test Book');