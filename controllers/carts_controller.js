"use strict"
var express = require("express");

module.exports = function (app) {
    app.get("/carts", function(req, res) {
        // express callback response by calling burger.selectAllBurger
        res.render("carts", {});
    });
}
