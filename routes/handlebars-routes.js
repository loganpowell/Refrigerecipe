module.exports = function(app) {
    //map some api to these function
    // app.get("/api/all", function(req, res) {
    //    do something
    //
    // });

    var fridges_route = require("../controllers/fridges_controller");

    app.use("/fridges", fridges_route);
    app.use("/fridges/update", fridges_route);
    app.use("/fridges/create", fridges_route);
};
