"use strict"
var express = require("express");
var unirest = require('unirest');
var axios = require('axios');

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


      axios.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients",
        {
          headers: {
            "X-Mashape-Key": "PUkQ3poysFmsheozAr97ixdGtaG5p1Gf87kjsnzDPLfDddaOJn",
            "Accept": "application/json"
          },
          params: {
            "fillIngredients":"true",
            // "ingredients": ["apples","flour","sugar"].join(","),
            "ingredients": "apples,flour,sugar",
            "limitLicense": "false",
            "number": "5",
            "ranking": "1"
          }

        })
        .then(function(response) {
          console.log(response.status, response.headers, response.data);
        });
    })
};
