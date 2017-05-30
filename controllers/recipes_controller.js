"use strict";
var express = require("express");
var unirest = require('unirest');
var axios = require('axios');
var _ = require('underscore');

module.exports = function (app) {
    app.get("/recipes", function(req, res) {
      // express callback response by calling burger.selectAllBurger
      // res.render("recipes", {});
      //todo: replace the other parametes with real data.
        res.render("recipes");
    });

  app.get("/recipes.json", function(req, res) {
    // express callback response by calling burger.selectAllBurger
    // res.render("recipes", {});
    //todo: replace the other parametes with real data.
    var ingredients = ["chicken", "beef", "flour", "eggs", "milk"];
    var fridge_id = parseInt(req.params.id, 10);
    var user_id = 1;
    var fridge_url = "/fridge/1";

    //todo: get the real fridge content
    //   axios.get(fridge_url, {
    //     headers: {
    //       "Accept":"application/json"
    //     }
    //   })
    //     .then(function(resp) {
    //       var fridge_contents = _.pick(resp.data, "ingredients");
    //       fridge_contents = fridge_contents.map(function(elem) {
    //         return elem.ingredient;
    //       });
    //       return fridge_contents
    //     })
    //     .then(function(fridge_contents) {
    //       console.log(fridge_contents)
    //     })
    // })

    axios.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients",
      {
        headers: {
          "X-Mashape-Key": "PUkQ3poysFmsheozAr97ixdGtaG5p1Gf87kjsnzDPLfDddaOJn",
          "Accept": "application/json"
        },
        params: {
          "fillIngredients":"true",
          // "ingredients": ["apples","flour","sugar"].join(","),
          "ingredients": ingredients.join(","),
          "limitLicense": "false",
          "number": "5",
          "ranking": "1"
        }

      })
      .then(function(response) {
        //console.log(response.status, response.headers);
        //console.log(response.data);
        //filter the response data to the bare essentials, name, id, units, and pictures
        var filtered_data = response.data.map(function(recipe) {
          recipe["missedIngredients"] = recipe["missedIngredients"].map(function(missed_ingredient) {
            return _.pick(missed_ingredient, "id", "amount", "unit", "name", "image");
          });
          return _.pick(recipe, "id", "title", "image", "missedIngredientCount", "missedIngredients", "likes")
        });
        return filtered_data;
      })
      .then(function(filtered_data) {
        console.log(filtered_data);
        res.json(filtered_data);
      })

  });
    //retire this function
    // app.get("/recipes/:id", function(req, res) {
    //   var ingredients = ["apple", "flour", "sugar"];
    //   var fridge_id = parseInt(req.params.id, 10);
    //   var user_id = 1;
    //
    //
    //   axios.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients",
    //     {
    //       headers: {
    //         "X-Mashape-Key": "PUkQ3poysFmsheozAr97ixdGtaG5p1Gf87kjsnzDPLfDddaOJn",
    //         "Accept": "application/json"
    //       },
    //       params: {
    //         "fillIngredients":"true",
    //         // "ingredients": ["apples","flour","sugar"].join(","),
    //         "ingredients": ingredients.join(","),
    //         "limitLicense": "false",
    //         "number": "5",
    //         "ranking": "1"
    //       }
    //
    //     })
    //     .then(function(response) {
    //       console.log(response.status, response.headers);
    //       console.log(response.data);
    //     });
    // })
};
