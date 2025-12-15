const sequelize = require('../config/database');

const School = require('./school.model')(sequelize);
const User = require('./user.model')(sequelize);
const Student = require('./student.model')(sequelize);

School.hasMany(User, { foreignKey: 'schoolId' });
User.belongsTo(School, { foreignKey: 'schoolId' });

School.hasMany(Student, { foreignKey: 'schoolId' });
Student.belongsTo(School, { foreignKey: 'schoolId' });

module.exports = {
  sequelize,
  School,
  User,
  Student,
};
