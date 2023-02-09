var express = require('express'),
Book = require('../models/book'),
mongoose = require('mongoose'),
middleware = require('../middleware/index'),
router = express.Router();

// COMMNETS - NEW ROUTE
router.get("/books/:id/comments/new", middleware.isLoggedIn, function(req, res) {
    Book.findById(req.params.id, function(err, foundBook) {
        if(err) {
            console.log(err);
            console.log('Book not found');
        } else {
            res.render('comments/new', {book: foundBook});
        }
    });
});

router.post("/books/:id/comments/create", middleware.isLoggedIn, function(req, res) {
    Book.findById(req.params.id, function(err, foundBook) {
        if(err) {
            console.log(err);
            console.log('book not found');
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if(err) {
                    console.log(err);
                } else {
                    foundBook.comments.push(comment);
                    foundBook.save();
                    res.redirect('/books/' + req.params.id);
                }
            });
        }
    });
});

module.exports = router;