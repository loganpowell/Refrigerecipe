"use strict";

module.exports = function(sequelize, Sequelize) {
    var fridges = sequelize.define("fridges", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fridge_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        user_id:{
            type: Sequelize.INTEGER,
            defaultValue: 0
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
