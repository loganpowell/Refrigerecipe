"use strict";

module.exports = function(sequelize, Sequelize) {
    var fridges_contents = sequelize.define("fridge_contents", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fridge_id: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        ingredient_id:{
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        servings_count: {
            type:Sequelize.FLOAT,
            defaultValue:0.0
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    fridges_contents.sync();

    return fridges_contents;
};
