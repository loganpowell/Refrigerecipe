"use strict"
var express = require("express");

module.exports = function (app) {
    app.get("/cart", function(req, res) {
        // express callback response by calling burger.selectAllBurger
        res.render("cart", {});
    });
}
