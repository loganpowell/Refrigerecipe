"use strict"
var express = require("express");

var router = express.Router();

module.exports = function (app) {
    app.get("/recipes", function(req, res) {
        // express callback response by calling burger.selectAllBurger
        res.render("recipes", {});
    });
}
