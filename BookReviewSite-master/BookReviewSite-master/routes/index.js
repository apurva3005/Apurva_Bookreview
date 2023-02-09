var Book = require('../models/book')
    express = require('express'),
    mongoose = require("mongoose"),
    User = require('../models/User'),
    passport = require('passport'),    
    router = express.Router();

// REGISTER ROUTE
router.get("/register", function(req, res) {
    res.render("register");
});

router.post("/register", (req, res) => {
    var username = new User({username: req.body.username});
    User.register(username, req.body.password, function(err, user) {
        if(err) {
            console.log(err);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/books");
        });
    });
});

// LOGIN ROUTE
router.get("/login", function(req, res) {
    res.render("login");
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/books',
    failureRedirect: '/login'
}), (req, res) => {
});

// LOGOUT ROUTE
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/books');
})

module.exports = router;