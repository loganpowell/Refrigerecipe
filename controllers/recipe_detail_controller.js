"use strict"
var express = require("express");
var unirest = require('unirest');
var axios = require('axios');


module.exports = function (app) {
  // app.get("/recipe_detail", function(req, res) {
  //   // express callback response by calling burger.selectAllBurger
  //   res.render("recipes", {});
  // });

  app.get("/recipe_detail/:id", function(req, res) {
    //todo: replace the ingredient data with real data
    //todo: replace the other parametes with real data.
    var ingredients = ["apple", "flour", "sugar", ];
    var fridge_id = parseInt(req.params.id, 10);
    var user_id = 1;
    

    axios.get( {
      baseURL: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=apples%2Cflour%2Csugar&limitLicense=false&number=5&ranking=1"
      headers: [
        {"X-Mashape-Key": "PUkQ3poysFmsheozAr97ixdGtaG5p1Gf87kjsnzDPLfDddaOJn"},
        {"Accept": "application/json"}
      ]
    })
      .then(function(response) {
        console.log(result.status, result.headers, result.body);
      });
  })
};
