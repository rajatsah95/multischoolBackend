const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define('School', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
