"use strict"
var express = require("express");
var unirest = require('unirest');

module.exports = function (app) {
    app.get("/recipes", function(req, res) {
        // express callback response by calling burger.selectAllBurger
        res.render("recipes", {});
    });

    app.get("/recipes/:id", function(req, res) {
      //todo: replace the ingredient data with real data
      //todo: replace the other parametes with real data.
      var ingredients = ["apple", "flour", "sugar", ];
      var fridge_id = parseInt(req.params.id, 10);
      var user_id = 1;


      unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=apples%2Cflour%2Csugar&limitLicense=false&number=5&ranking=1")
        .header("X-Mashape-Key", "PUkQ3poysFmsheozAr97ixdGtaG5p1Gf87kjsnzDPLfDddaOJn")
        .header("Accept", "application/json")
        .end(function (result) {
          console.log(result.status, result.headers, result.body);
        });
    })
};
