var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


// MAIN PAGE
router.get("/", function (req, res) {
    res.redirect("/campgrounds");
});

// SHOW REGISTER FORM
router.get("/register", function (req, res) {
    res.render("register");
});

//HANDLES SIGNING UP A USER
router.post("/register", function (req, res) {
    User.register(new User({ username: req.body.username }), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/campgrounds");
            });
        }
    });
});

// SHOW LOGIN FORM
router.get("/login", function (req, res) {
    res.render("login");
});

//HANDLES USER LOGIN
router.post("/login",
    passport.authenticate("local", {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }),

    function (req, res) {

    }

);

//HANDLES LOGOUT
router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});


module.exports = router;