"use strict";

module.exports = function(sequelize, Sequelize) {
    var ingredients = sequelize.define("ingredients", {
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

    ingredients.sync();

    return ingredients;
};
