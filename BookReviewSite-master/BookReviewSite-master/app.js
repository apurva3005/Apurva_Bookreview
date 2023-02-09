var Book                    = require("/Programming/web-projects/BookReviewSite/models/book"),
    passportLocalMongoose   = require('passport-local-mongoose'),
    commentRoutes           = require("./routes/comments"),
    methodOverride          = require("method-override"),
    indexRoutes             = require('./routes/index'),
    LocalStrategy           = require('passport-local'),
    bookRoutes              = require("./routes/books"),
    User                    = require("./models/User"),
    flash                   = require("connect-flash"),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    passport                = require('passport'),
    express                 = require("express"),
    request                 = require("request"),
    app                     = express();

// SETUP CODE
mongoose.connect("mongodb://localhost/auth_test_branch");
app.use(methodOverride('_method'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.use(require('express-session')({
    secret: 'I love Coooding',
    resave: false,
    saveUninitialized: false
}));

// Passport Setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(flash());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.use(indexRoutes);
app.use(bookRoutes);
app.use(commentRoutes);

app.listen(8080, function() {
    console.log("Magic happens at 8080...");
});