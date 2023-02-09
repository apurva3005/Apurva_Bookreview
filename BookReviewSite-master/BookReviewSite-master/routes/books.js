var Book = require('../models/book')
    express = require('express'),
    request = require("request"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    middleware = require('../middleware/index'),
    Comment = require("../models/comment"),
    recievedBook = [],
    router = express.Router();

var bookWriter;

// ROOT ROUTE
router.get("/", function(req, res) {
    res.redirect("/books");
});
router.get("/books", function(req, res) {
    Book.find({}, function(err, books) {
        if(err) {
            console.log(err);
        } else {
            res.render("books/index", {books: books});
        }
    });
});

// NEW ROUTE
router.get("/books/new/:bookId", middleware.isLoggedIn, function(req, res) {
    var bookId = req.params.bookId;
    
    recievedBook.forEach(book => {
        if(book.id === bookId) {
            bookName = book.volumeInfo.title;
            bookWriter = book.volumeInfo.authors[0];
            if(book.volumeInfo.imageLinks.thumbnail)
            bookImage = book.volumeInfo.imageLinks.thumbnail;
        }
    })
    // var bookName  = req.params.bookName;    
    // var bookImage = req.params.bookImage;
    res.render("books/new", {bookName: bookName, bookImage: bookImage});
});

// CREATE ROUTE
router.post("/books/create", middleware.isLoggedIn, function(req, res) {
    var newBook = req.body.book;
    newBook.author = {
        id: req.user._id,
        username: req.user.username
    };
    newBook.writer = bookWriter;
    Book.create(newBook, function(err, book) {
        if(err) {
            console.log("Error creating book");
            console.log(err);
            req.flash("error", "Failed to create review.")
            res.redirect("/books");
        } else {
            req.flash("success", "New review successfully created.")
            res.redirect("/books");
        }
    });
});

// SEARCH PAGE RENDER
router.get("/books/search", function(req, res) {
    res.render("books/search");
});

// FIND BOOK
router.get("/books/find", function(req, res) {
    var book = req.query.bookName;
    var regex = / /gi;
    book = book.replace(regex, '+');
    var url = "https://www.googleapis.com/books/v1/volumes?q=" + book;
    request(url, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            recievedBook = [...data.items];
            res.render("books/result", {data: data.items});
        }
    });
});

// SHOW ROUTE
router.get("/books/:id", function(req, res) {
    Book.findById(req.params.id).populate("comments").exec(function(err, foundBook) {
        if(err) {
            console.log("Error finding book");
            console.log(err);
        } else {
            res.render("books/show", {book: foundBook});
        }
    });
});

// EDIT ROUTE
router.get('/books/:id/edit', middleware.isLoggedIn, function(req, res){
    Book.findById(req.params.id, function(err, foundBook) {
        if(err) {
            console.log("Eror finding" + err);
        } else{
            res.render("books/edit", {book: foundBook});
        }
    });
});

// UPDATE ROUTE
router.put("/books/:id", middleware.isLoggedIn, function(req, res) {
    Book.findByIdAndUpdate(req.params.id, req.body.book,function(err, updatedBook) {
        if(err) {
            console.log("Error updating");
            console.log(log);
        } else {
            req.flash("success", "Review successfully updated.")
            res.redirect('/books/'+ req.params.id);
        }
    });
});

// DELETE ROUTE
router.delete("/books/:id", middleware.isLoggedIn, function(req, res) {
    Book.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            console.log("error deleting " + err);
        } else {
            req.flash("success", "Deleted successfully.")
            res.redirect("/books");
        }
    });
});

module.exports = router;