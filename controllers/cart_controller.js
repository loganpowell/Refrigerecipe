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

    app.put("/cart", function (req, res) {
      var cart_id = 1;

      carts.findById(cart_id)
        .then(function(cart) {
          if(cart) {
            var body = _.pick(req.body, "ingredients");
            cart.update({"ingredients": JSON.stringify(body.ingredients)})
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

    app.post("/cart/sendsms", function (req, res) {
      var cart_id = 1;
      var phone_number = "5712430741";

      var aid= "AC454129ef1bd595b5c9fec67165cf14c3";
      var at = "ec2ba4c93a9d5b5194187163e4ba21c3";
      var twilio_client = new twilio(aid, at);

      carts.findById(cart_id)
        .then(function(cart) {
          if(cart) {
            var message = cart.ingredients;
            message = JSON.parse(message);
            message = message.map(function(elem) {return elem.ingredient;});
            message = message.join("\n");

            twilio_client.messages.create( {
              body: message,
              to:"+15712430741",
              from:"+12403033772"
            })
              .then(function(message){
                console.log(message.sid);
                res.status(200).send();
              });
          }
        })
    })

};

