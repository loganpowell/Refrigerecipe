"use strict";

module.exports = function(sequelize, Sequelize) {
    var fridges = sequelize.define("fridge_contents", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ingredient_name: {
            type: Sequelize.STRING,
            allowNull:false
        }
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });

    fridges.sync();

    return fridges;
};
