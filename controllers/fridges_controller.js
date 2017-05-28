"use strict";

var express = require("express");
var db = require("../models");
var _ = require('underscore');
var fridges = db.fridges;



module.exports = function (app) {
  //**** start of view renderers ****/
  app.get("/fridge", function (req, res) {
    //todo rewite this
    // express callback response by calling burger.selectAllBurger
    fridges.findById(1)
      .then(function (data) {
        // Wrapping the array of returned burgers in a object so it can be referenced inside our handlebars
        var hbsObject = {fridges: data};
        //res.render("fridges", hbsObject);
        res.render("fridges", hbsObject);
      });
  });


  /***** end of view renderers ****/

  /****** start of API end points ****/

  app.get("/fridge/:id", function (req, res) {

    var fridgeId = parseInt(req.params.id, 10);
    fridges.findById(fridgeId)
      .then(function (data) {
        // Wrapping the array of returned burgers in a object so it can be referenced inside our handlebars
        if (!!data) {
          var resData = _.pick(data, "id", "fridge_name", "user_id", "ingredients");
          resData.ingredients = JSON.parse(resData.ingredients);
          res.json(resData);
        }else {
          res.status(404).send();
        }
      }, function(err) {
        res.status(500).send(err);
      });
  });

  //todo: create a new fridge
  app.post("/fridge", function (req, res) {
    //var user_id = parseInt(req.body, 'user_id', 'fridge_name');
    var body = _.pick(req.body, 'user_id', 'fridge_name', "ingredients");
    body.ingredients = JSON.stringify(body.ingredients)

    fridges.create(body)
      .then(function (fridge) {
        fridge.ingredients = JSON.parse(fridge.ingredients);
        res.json(fridge.toJSON());
      }, function (err) {
        res.status(400).json(err);
      });

  });

  //PUT /fridges/:id
  //update the fridge and fridge content in a single API.
  app.put("/fridge/:id", function(req, res) {
    //todo change this
    var user_id = 1;
    var fridge_id = parseInt(req.params.id, 10);

    fridges.findById(fridge_id)
      .then(function(fridge) {
        if(fridge) {
          //todo: enable authorization check based on user_id
          var updateAttributes = _.pick(req.body, "fridge_name", "user_id", "ingredients");
          updateAttributes.ingredients = JSON.stringify(updateAttributes.ingredients);
          fridge.update(updateAttributes)
            .then(function(fridge) {
              fridge.ingredients = JSON.parse(fridge.ingredients);
              res.status(200).json(fridge);
            }, function(err) {
              res.status(500).send();
            });
        }else {
          res.status(404).send();
        }
      },function(err)  {
        res.status(500).send();
      })

  });

  /****** end of API end points *******/
};
