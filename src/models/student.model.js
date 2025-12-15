const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define('Student', {
    name: DataTypes.STRING,
    dob: DataTypes.DATEONLY,
    metadata: DataTypes.JSON,
    schoolId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
