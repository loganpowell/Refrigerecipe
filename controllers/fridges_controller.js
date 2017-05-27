"use strict";

var express = require("express");
var db = require("../models");
var _ = require('underscore')
var fridges = db.fridges;
var fridge_contents = db.fridge_contents;



module.exports = function (app) {
  //**** start of view renderers ****/
  app.get("/fridges", function (req, res) {
    // express callback response by calling burger.selectAllBurger
    fridge_contents.findAll({fridge_id: 1})
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
          fridge_contents.findAll({where: {fridge_id:fridgeId}})
            .then(function(data) {
              if(!!data) {
                var fridge_contents = data.map(function(elem) {
                  return {ingredient:elem.ingredient, servings_count:elem.servings_count};
                });
                resData['fridge_contents'] =fridge_contents;
                res.json(resData);
              }else {
                //there's no content in fridge, directly return resData;
                resData['fridge_contents'] = [];
                res.json(resData);
              }
            }, function(err) {
              res.status(500).send(err);
            });

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
          //
          fridge.update(fridge_attributes)
            .then(function(fridge) {
              fridge_contents.findAll({where: {fridge_id: fridge.id}})
                .then(function(data) {
                  if(!!data) {
                    var all_fridget_content_ids = data.map(function(elem) {return elem.id;});
                    fridge_contents.destroy({where:{id:all_fridget_content_ids}})
                      .then(function() {})
                  }
                  //else don't worry
                })
                .then(function() {
                  var content_records = body_fridge_contents.map(function(elem) {
                    if(typeof elem.ingredient !== 'undefined' && typeof elem.servings_count !== 'undefined') {
                      return {fridge_id: fridge.id, ingredient: elem.ingredient, servings_count: elem.servings_count};
                    }
                  });
                  fridge_contents.bulkCreate(content_records, function(err) {
                    res.status(500).send();
                  });
                })
            })

            .then(function() {
              res.status(200).send();
            })

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
