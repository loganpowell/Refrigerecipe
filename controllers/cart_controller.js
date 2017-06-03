"use strict"
var express = require("express");
const twilio = require('twilio');
var db = require("../models");
var _ = require('underscore');
var carts = db.carts;

module.exports = function (app) {
    app.get("/cart", function(req, res) {
        // express callback response by calling burger.selectAllBurger
      res.format({
        'text/html': function () {
          res.render("cart", {});
        },
        'application/json': function () {
          var cart_id = 1;
          carts.findById(cart_id)
            .then(function (data) {
              // Wrapping the array of returned burgers in a object so it can be referenced inside our handlebars
              if (!!data) {
                var resData = _.pick(data, "id", "cart_name", "user_id", "ingredients");
                resData.ingredients = JSON.parse(resData.ingredients);
                res.json(resData);
              }else {
                res.status(404).send();
              }
            }, function(err) {
              res.status(500).send(err);
            });
        }
      });
    });

    app.put("/cart/add", function(req, res) {
      //todo: change this cart_id
      var cart_id = 1;

      carts.findById(cart_id)
        .then(function(cart) {
          if(cart) {
            var body = _.pick(req.body, "ingredients");
            var newIngredientList = body.ingredients;
            newIngredientList = newIngredientList.concat(req.body.ingredients);
            cart.update({"ingredients": JSON.stringify(newIngredientList)})
              .then(function(cart) {
                cart.ingredients = JSON.parse(cart.ingredients);
                res.json(cart);
              }, function(e) {
                res.status(500).send(e);
              })
          }else {
            res.status(404).send();
          }
        },function(err)  {
          res.status(500).send();
        })
    });

};

