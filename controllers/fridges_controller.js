"use strict";

var express = require("express");
var db = require("../models");
var _ = require('underscore')
var fridges = db.fridges;



module.exports = function (app) {
  //**** start of view renderers ****/
  app.get("/fridges", function (req, res) {
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

  app.get("/fridges/:id", function (req, res) {

    var fridgeId = parseInt(req.params.id, 10);
    fridges.findById(fridgeId)
      .then(function (data) {
        // Wrapping the array of returned burgers in a object so it can be referenced inside our handlebars
        if (!!data) {
          var resData = {id: data.id, fridge_name :data.fridge_name, user_id: data.user_id};
          //rewrite

        }else {
          res.status(404).send();
        }
      }, function(err) {
        res.status(500).send(err);
      });
  });

  //todo: create a new fridge
  app.post("/fridges/create", function (req, res) {
    //var user_id = parseInt(req.body, 'user_id', 'fridge_name');
    var body = _.pick(req.body, 'user_id', 'fridge_name');

    fridges.create(body)
      .then(function (fridge) {
        res.json(fridge.toJSON());
      }, function (err) {
        res.status(400).json(err);
      });

  });

  //PUT /fridges/:id
  //update the fridge and fridge content in a single API.
  app.put("/fridges/:id", function(req, res) {
    //todo change this
    var user_id = 1;
    var fridge_id = parseInt(req.params.id, 10);
    var fridge_attributes = _.pick(req.body, "fridge_name", "user_id");
    var body_fridge_contents = req.body['fridge_contents'];

    fridges.findById(fridge_id)
      .then(function(fridge) {
        if(fridge) {
          //todo: update fridge_contents in here
          

        }else {
          res.status(404).send();
        }
      },function(err)  {
        res.status(500).send();
      })

  });
  //todo: what do I need to do update?
  app.put("/fridges/update", function (req, res) {
    // fridge_contents.update(req.body.burger_id, function(result) {
    //     console.log(result);
    //     res.redirect("/");
    // });
  });

  /****** end of API end points *******/
};
