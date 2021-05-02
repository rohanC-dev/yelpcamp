var express = require("express");
var Campground = require("../models/campground");
var middleware = {};

//CHECKS IF USER IS LOGGED IN
middleware.isLoggedIn = function(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

middleware.currentUserMatchCampgroundUser = function(req, res, next){
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, campground) {
            if (err) {
                console.log("campground was not found");
                res.redirect("/campgrounds");
            } else {
                if (campground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    // redirects user back to previous page
                    res.redirect("back");
                }
            }
        });
    } else {
        // redirects user back to previous page
        res.redirect("back");
    }
}


module.exports = middleware;