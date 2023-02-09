let middlewareObj = {};

middlewareObj.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
}

module.exports = middlewareObj;