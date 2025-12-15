const userRouter = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/role.middleware');
const schoolGuard = require('../middlewares/school.middleware');
const controller  = require('../controllers/user.controller');
const validate = require('../middlewares/validate.middleware');
const schema = require('../validations/user.validation');

userRouter.use(auth);

userRouter.post(
  '/schools/:schoolId/users',
    validate(schema.createUser),
  requireRole('superadmin', 'admin'),
  schoolGuard,
  controller.createUser
);
// userRouter.post(
//   '/schools/:schoolId/users',
//   createUser
// );

/**
 * List users in a school
 */
userRouter.get(
  '/schools/:schoolId/users',
  controller.listUsers
);

/**
 * Get user profile
 */
userRouter.get('/users/:id', controller.getUserById);

/**
 * Update user
 */
userRouter.put(
  '/users/:id',
  validate(schema.updateUser),
  controller.updateUser
);

module.exports = userRouter;
