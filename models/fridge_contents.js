"use strict";

module.exports = function(sequelize, Sequelize) {
    var fridge_contents = sequelize.define("fridge_contents", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fridge_id: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        ingredient:{
            type: Sequelize.STRING,
            allowNull: false
        },
        servings_count: {
            type:Sequelize.FLOAT,
            defaultValue:0.0
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    fridge_contents.sync();

    return fridge_contents;
};
