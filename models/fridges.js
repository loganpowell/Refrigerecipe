"use strict";

module.exports = function (sequelize, Sequelize) {
  var fridges = sequelize.define("fridges", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fridge_name: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    user_id: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    ingredients: {
      type:Sequelize.STRING(4095)
    }
  }, {
    // classMethods: {
    //     associate: function(models) {
    //         // associations can be defined here
    //     }
    // },
    timestamps: false,
    underscored: true
  });

  fridges.sync();

  return fridges;
};
