var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var methodOverride = require("method-override");
var session = require('express-session');
var dotenv = require('dotenv');
var db = require("./models");

var app = express();
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + "/public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));
app.use(cookieParser());
app.use(session({
  //Here we are creating a unique session identifier
  secret: 'tx1E2yQbBhsJHNCs',
  resave: true,
  saveUninitialized: true
}));

// Static directory
app.use(express.static("public"));

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
require("./controllers/index_controller")(app);
// require("./routes/handlebars-routes.js")(app);
require("./controllers/fridges_controller")(app);
require("./controllers/recipes_controller")(app);
require("./controllers/cart_controller")(app);
require("./controllers/login_controller")(app);
require("./controllers/index_controller")(app);


var PORT = process.env.PORT || 3000;

// Syncing our sequelize models and then starting our express app
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
