"use strict"
var express = require("express");
var unirest = require('unirest');

module.exports = function (app) {
    app.get("/recipes", function(req, res) {
        // express callback response by calling burger.selectAllBurger
        res.render("recipes", {});
    });

    app.get("recipes/:id", function(req, res) {
      //todo: replace the ingredient data with real data
      //todo: replace the other parametes with real data.
      var ingredients = ["Egg", "Chicken"];
      var fridge_id = parseInt(req.params.id, 10);
      var user_id = 1;



    })
};
