var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

// LISTS ALL CAMPGROUNDS
router.get("/", function (req, res) {
    Campground.find({}, function (err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/campgrounds.ejs", { campgrounds: campgrounds });
        }
    });
});

// CREATES NEW CAMPGROUND IN DATABASE AND REDIRECTS TO LIST OF CAMPGROUNDS
router.post("/", middleware.isLoggedIn, function (req, res) {
    console.log(req.body);
    Campground.create({
        name: req.body.name,
        image: req.body.img,
        description: req.body.desc,
        author: {
            id: req.user._id,
            username: req.user.username
        }
    }, function (err, newCampground) {
        if (err) {
            console.log(err);
        } else {
            console.log(newCampground);
            res.redirect("/campgrounds");
        }
    });
});

// SHOWS FORM TO ADD A NEW CAMPGROUND
router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
});

// SHOWS MORE INFO ABOUT CAMPGROUND
router.get("/:id", function (req, res) {

    Campground.findById(req.params.id).populate("comments").exec(function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", { campground: campground });
        }
    });
});

// SHOWS FORM FOR EDITING CAMPGROUND
router.get("/:id/edit", middleware.currentUserMatchCampgroundUser, function(req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        res.render("campgrounds/edit", {campground: campground});
    });
});


// UPDATES CAMPGROUND IN DATABASE
router.put("/:id", middleware.currentUserMatchCampgroundUser,function (req, res) {
    Campground.findByIdAndUpdate(req.params.id, { name: req.body.name, image: req.body.img, description: req.body.desc }, function (err, campground) {
        if (err) {
            console.log("there was an error updating the campground");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DELETES CAMPGROUND
router.delete("/:id", middleware.currentUserMatchCampgroundUser, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log("there was an error deleting this campground");
        } else {
            res.redirect("/campgrounds");
        }
    });
});


module.exports = router;