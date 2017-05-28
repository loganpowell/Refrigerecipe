var express = require("express");
var db = require("../models");
var fridge_contents = db.fridge_contents;

module.exports = function (app) {
    // app.get("/fridge_contents/:id", function (req, res) {
    //     fridge_contents.findAll({fridge_id:1})
    //         .then(function(data) {
    //             // Wrapping the array of returned burgers in a object so it can be referenced inside our handlebars
    //             var hbsObject = { fridges: data };
    //             //res.render("fridges", hbsObject);
    //             res.render("fridges", hbsObject);
    //         });
    // });
    //
    // app.put("/fridges/update", function(req, res) {
    //     // fridge_contents.update(req.body.burger_id, function(result) {
    //     //     console.log(result);
    //     //     res.redirect("/");
    //     // });
    // })

    //Much todo here.
};