const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define('User', {
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING },
    phone: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM('superadmin', 'admin', 'user'),
      allowNull: false,
    },
    canEditStudents: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    passwordHash: DataTypes.STRING,
    schoolId: {
      type: DataTypes.INTEGER,
      allowNull: true, // NULL for superadmin
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
     firstTimeLogin: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
