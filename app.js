var express = require("express");
var app = express();

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true, useUnifiedTopology: true });

var methodOverride = require('method-override');
app.use(methodOverride('_method'));

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

var passport = require("passport");
var LocalStrategy = require("passport-local");

var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");

var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");

app.use(express.static(__dirname + "/public"));

app.use(require("express-session")({
    secret: "bog",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());

app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set("view engine", "ejs");

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

var seedDB = require("./seeds");
//seedDB();


app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(process.env.PORT || 3000, process.env.IP, function () {
    console.log("server started");
});
