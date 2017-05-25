var express = require("express");

var router = express.Router();
var db = require("../models");
var fridge = db.fridge;

router.get("/", function(req, res) {
    res.redirect("/fridges");
});

router.get("/fridges", function(req, res) {
    // express callback response by calling burger.selectAllBurger
    fridge.findAll({})
        .then(function(data) {
            // Wrapping the array of returned burgers in a object so it can be referenced inside our handlebars
            var hbsObject = { fridges: data };
            console.log("shit");
            res.render("index", hbsObject);
        });
});


// put route -> back to index
router.put("/fridges/update", function(req, res) {
    fridge.update(req.body.burger_id, function(result) {
        // wrapper for orm.js that using MySQL update callback will return a log to console,
        // render back to index with handle
        console.log(result);
        res.redirect("/");
    });
})

module.exports = router;
