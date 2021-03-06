"use strict";
var express = require("express");
var axios = require('axios');
var db = require("../models");
var _ = require('underscore');
var fridges = db.fridges;

module.exports = function (app) {
  app.get("/recipes", function (req, res) {
    //render the recipes handlebars
    res.render("recipes");
  });

  app.get("/recipes.json", function (req, res) {
    // express callback response by calling burger.selectAllBurger
    // res.render("recipes", {});
    //todo: replace the other parametes with real data.
    // var fridge_id = parseInt(req.params.id, 10);
    var fridge_id = 1;
    var user_id = 1;
    var fridge_url = "/fridge/1";

    fridges.findById(fridge_id)
      .then(function (data) {
        // Wrapping the array of returned burgers in a object so it can be referenced inside our handlebars
        if (!!data) {
          var resData = _.pick(data, "id", "fridge_name", "user_id", "ingredients");
          resData.ingredients = JSON.parse(resData.ingredients);
          var ingredients = resData.ingredients.map(function(elem) {
            return elem.ingredient;
          });
          console.log(ingredients);
          return ingredients;
        }else {
          //todo: throw error
          return [];
        }
      }
      //todo: research how to properly handle errors.
      ,function(err) {
        //todo: throw error
        return [];
      })
      .then(function(ingredients) {
        console.log("requested ingredients: " + JSON.stringify(ingredients));
        return axios.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients",
          {
            headers: {
              "X-Mashape-Key": "PUkQ3poysFmsheozAr97ixdGtaG5p1Gf87kjsnzDPLfDddaOJn",
              "Accept": "application/json"
            },
            params: {
              "fillIngredients": "true",
              // "ingredients": ["apples","flour","sugar"].join(","),
              "ingredients": ingredients.join(","),
              "limitLicense": "false",
              "number": "50",
              "ranking": "1"
            }

          });
      })
      .then(function (response) {
        //console.log(response.data);
        //filter the response data to the bare essentials, name, id, units, and pictures
        var filtered_data = response.data.map(function (recipe) {
          recipe["missedIngredients"] = recipe["missedIngredients"].map(function (missed_ingredient) {
            return _.pick(missed_ingredient, "id", "amount", "unit", "name", "image");
          });
          return _.pick(recipe, "id", "title", "image", "missedIngredientCount", "missedIngredients",
            "usedIngredientCount", "usedIngredients", "likes")
        });
        return filtered_data;
      })
      .then(function (filtered_data) {
        //console.log(filtered_data);
        res.json(filtered_data);
      });
  });

  //get the recipe detail from /recipes/:id endpoint
  //based on the format given the request, respond in kind
  // https://stackoverflow.com/questions/8928738/in-express-js-any-way-to-capture-request-to-both-json-and-html-in-one-function
  app.get("/recipes/:id", function (req, res) {
    var recipeId = parseInt(req.params.id, 10);
    //todo: add error handler for recipeId
    res.format({
      'text/html': function () {

      },
      'application/json': function () {
        var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + recipeId + "/information?includeNutrition=true";
        axios.get(queryURL,
          {
            headers: {
              "X-Mashape-Key": "PUkQ3poysFmsheozAr97ixdGtaG5p1Gf87kjsnzDPLfDddaOJn",
              "Accept": "application/json"
            }
          })
          .then(function (response) {
            //console.log(response.status, response.headers);
            //console.log(response.data);
            var filtered_data = _.pick(response.data,
              "id", "title", "image", "vegetarian", "vegan","cookingMinutes","preparationMinutes","readyInMinutes",
              "extendedIngredients", "pricePerServing", "servings", "sourceUrl", "spoonacularSourceUrl", "nutrition");
            if(typeof filtered_data.cookingMinutes === 'undefined' || typeof filtered_data.preparationMinutes === 'undefined') {
              if(typeof filtered_data.readyInMinutes === 'undefined') {
                filtered_data.readyInMinutes = 60;
              }
              filtered_data.cookingMinutes = Math.round(filtered_data.readyInMinutes* .6);
              filtered_data.preparationMinutes = Math.round(filtered_data.readyInMinutes* .4)
            }
            if (typeof filtered_data.nutrition != "undefined") {
              var nutrition = filtered_data.nutrition;
              var Calories = _.find(nutrition.nutrients, function(elem) {return elem.title === "Calories"});
              if (typeof Calories != "undefined") {
                filtered_data.Calories = Calories.amount;
              }
            }
            res.json(filtered_data);
          });
      }
    });
  })
};
