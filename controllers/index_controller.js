"use strict";

var express = require("express");
module.exports = function (app) {
  //**** start of view renderers ****/
  app.get("/", function (req, res) {
    //todo rewite this
    // express callback response by calling burger.selectAllBurger
    res.render("index");
  });
};
