"use strict";

module.exports = function (sequelize, Sequelize) {
  var carts = sequelize.define("carts", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cart_name: {
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
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    timestamps: false,
    underscored: true
  });

  carts.sync();

  return carts;
};