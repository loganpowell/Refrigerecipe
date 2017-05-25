// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.

// Creates a "Chirp" model that matches up with DB
var fridge = sequelize.define("fridges", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    burger_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    devoured:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});
fridge.name = "fridge";

// Syncs with DB
fridge.sync();

// Makes the Chirp Model available for other files (will also create a table)
module.exports = fridge;
