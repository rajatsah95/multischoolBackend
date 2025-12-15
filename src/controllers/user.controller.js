const { User } = require('../models');
const { generatePassword } = require('../utils/password.util');
const { sendPasswordEmail } = require('../services/email.service');

exports.createUser = async (req, res) => {
  const { name, email, phone, role, canEditStudents } = req.body;

  const { plain, hash } = await generatePassword(phone);
  req.params.schoolId=req.params.schoolId==="null"?null:Number(req.params.schoolId)

  let booleanCanEditStudents=canEditStudents==="true"||canEditStudents===true?true:false


  const user = await User.create({
    name,
    email,
    phone,
    role: role,
    canEditStudents:booleanCanEditStudents,
    schoolId: req.params.schoolId,
    passwordHash: hash,
  });

  await sendPasswordEmail(user.email, plain);

  res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
};

/**
 * GET /schools/:schoolId/users
 * superadmin OR admin of same school
 */
exports.listUsers = async (req, res) => {
  if (
    req.user.role !== 'superadmin' &&
    req.user.schoolId !== Number(req.params.schoolId)
  ) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const { page = 1, limit = 10 } = req.query;
  const users = await User.findAll({
    where: {
      schoolId: req.params.schoolId,
      isDeleted: false,
    },
    attributes: { exclude: ['passwordHash'] },
    limit: Number(limit),
    offset: (page - 1) * limit,
  });

   res.json({
    total: users.count,
    data: users.rows,
  });
};

/**
 * GET /users/:id
 * self OR admin (school) OR superadmin
 */
exports.getUserById = async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ['passwordHash'] },
  });

  if (!user || user.isDeleted) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (
    req.user.role !== 'superadmin' &&
    req.user.userId !== user.id &&
    req.user.schoolId !== user.schoolId
  ) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  res.json(user);
};

/**
 * PUT /users/:id
 * self (limited) OR admin (school) OR superadmin
 */
exports.updateUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (!user || user.isDeleted) {
    return res.status(404).json({ message: 'User not found' });
  }

  const isSelf = req.user.userId === user.id;
  const sameSchool = req.user.schoolId === user.schoolId;

  if (
    req.user.role !== 'superadmin' &&
    !(req.user.role === 'admin' && sameSchool) &&
    !isSelf
  ) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  // users cannot change their own role or permissions
  if (isSelf && ('canEditStudents' in req.body)) {
    delete req.body.canEditStudents;
  }

  await user.update(req.body);
  res.json({ message: 'User updated successfully' });
};
