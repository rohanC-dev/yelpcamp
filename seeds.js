var mongoose = require("mongoose");

var Campground = require("./models/campground");
var Comment = require("./models/comment");

var campgroundData = [
    {
        name: "Resurrection Bay",
        image: "https://farm4.staticflickr.com/3211/3062207412_03acc28b80.jpg",
        description: "Bacon ipsum dolor amet beef ribs meatball tongue doner beef meatloaf. Cow pastrami shank chicken venison, bacon picanha ground round pork loin pork chop fatback. Shank jerky doner tail meatball tri-tip frankfurter pancetta cow corned beef pastrami porchetta cupim. Jerky sausage landjaeger kevin. Kevin shank chicken picanha drumstick swine brisket tail bresaola ground round. Landjaeger short loin ground round, corned beef swine bresaola venison sirloin doner.",
    },
    {
        name: "Desert Mesa",
        image: "https://www.nps.gov/nabr/planyourvisit/images/campground_utahscyncty.jpg",
        description: "Bacon ipsum dolor amet beef ribs meatball tongue doner beef meatloaf. Cow pastrami shank chicken venison, bacon picanha ground round pork loin pork chop fatback. Shank jerky doner tail meatball tri-tip frankfurter pancetta cow corned beef pastrami porchetta cupim. Jerky sausage landjaeger kevin. Kevin shank chicken picanha drumstick swine brisket tail bresaola ground round. Landjaeger short loin ground round, corned beef swine bresaola venison sirloin doner.", 
    },
    {
        name: "Cloud's Rest",
        image: "http://www.fs.usda.gov/Internet/FSE_MEDIA/stelprdb5259404.jpg",
        description: "Bacon ipsum dolor amet beef ribs meatball tongue doner beef meatloaf. Cow pastrami shank chicken venison, bacon picanha ground round pork loin pork chop fatback. Shank jerky doner tail meatball tri-tip frankfurter pancetta cow corned beef pastrami porchetta cupim. Jerky sausage landjaeger kevin. Kevin shank chicken picanha drumstick swine brisket tail bresaola ground round. Landjaeger short loin ground round, corned beef swine bresaola venison sirloin doner.",
    }];

function seedDB() {
    //REMOVES CAMPGROUNDS
    Campground.remove({}, function (err) {
        if (err) {
            console.log("there was an error");
        }
        console.log("removed campgrounds");

        for (var i = 0; i < campgroundData.length; i++) {
            Campground.create(campgroundData[i], function (err, campground) {
                if (err) {
                    console.log("there was an error adding a campground")
                }
                console.log("created campground successfully");

                Comment.create({ text: "This place is great, but I wish there was Internet", author: "Bob" }, function (err, comment) {
                    if (err) {
                        console.log("there was an error adding a comment");
                    } else {
                        campground.comments.push(comment)
                        campground.save();
                        console.log("added comment successfully");

                    }
                });

            });
        }
    });
}

module.exports = seedDB;