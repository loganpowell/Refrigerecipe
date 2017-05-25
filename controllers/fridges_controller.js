var express = require("express");

var router = express.Router();
var db = require("../models");
var fridges = db.fridges;


module.exports = function (app) {
    app.get("/fridges", function(req, res) {
        // express callback response by calling burger.selectAllBurger
        fridges.findAll({})
            .then(function(data) {
                // Wrapping the array of returned burgers in a object so it can be referenced inside our handlebars
                var hbsObject = { fridges: data };
                //res.render("fridges", hbsObject);
                res.render("fridges", hbsObject);
            });
    });


// put route -> back to index
    app.put("/fridges/update", function(req, res) {
        fridges.update(req.body.burger_id, function(result) {
            // wrapper for orm.js that using MySQL update callback will return a log to console,
            // render back to index with handle
            console.log(result);
            res.redirect("/");
        });
    })
}
