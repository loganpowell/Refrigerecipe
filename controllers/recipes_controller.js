"use strict"
var express = require("express");

var router = express.Router();

router.get("/recipes", function(req, res) {
    // express callback response by calling burger.selectAllBurger
    res.render("recipes", {});
});

module.exports = router;