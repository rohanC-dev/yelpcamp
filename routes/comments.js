var express = require("express");
var router = express.Router({ mergeParams: true });
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//SHOWS A FORM TO CREATE A NEW COMMENT
router.get("/new", middleware.isLoggedIn, function (req, res) {
    console.log(req.params.id);
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log("there was an error");
        } else {
            res.render("comments/new", { campground: campground });
        }
    });
});

//ADDS NEW COMMENT TO DATABASE
router.post("/", middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log("there was an error");
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log("there was problem makking comment");
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    console.log(comment);

                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});


module.exports = router;