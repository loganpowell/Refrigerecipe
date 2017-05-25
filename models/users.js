"use strict";

module.exports = function(sequelize, Sequelize) {
    var fridges = sequelize.define("fridge_contents", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type:Sequelize.STRING,
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
