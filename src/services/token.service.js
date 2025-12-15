const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
      role: user.role,
      schoolId: user.schoolId,
      canEditStudents:user.canEditStudents
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};
