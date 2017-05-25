var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
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


// var exphbs = require("express-handlebars");
//
// app.engine("handlebars", exphbs({
//     defaultLayout: "main"
// }));
// app.set("view engine", "handlebars");

//var ingredients_routes = require("./controllers/ingredients_controller");
// var fridges_routes = require("./controllers/fridges_controller");
//var recipes_routes = require("./controllers/recipes_controller");

// app.use("/", fridges_routes);
// app.use("/fridges", fridges_routes);
// app.use("/fridges/update", fridges_routes);
// app.use("/fridges/create", fridges_routes);


// // listen on port 3000
// var PORT = process.env.PORT || 3000;
//
// // Syncing our sequelize models and then starting our express app
// db.sequelize.sync().then(function() {
//     app.listen(PORT, function() {
//         console.log("App listening on PORT " + PORT);
//     });
// });


// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("public"));

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
// require("./routes/handlebars-routes.js")(app);
require("./controllers/fridges_controller")(app);
require("./controllers/recipes_controller")(app);


var PORT = process.env.PORT || 3000;

// Syncing our sequelize models and then starting our express app
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});
