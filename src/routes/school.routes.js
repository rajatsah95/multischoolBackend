const schoolRouter = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/role.middleware');
const validate = require('../middlewares/validate.middleware');
const controller = require('../controllers/school.controller');
const schema = require('../validations/school.validation');

/**
 * All school routes are SUPERADMIN ONLY
 */

schoolRouter.use(auth);
schoolRouter.use(requireRole('superadmin'));

schoolRouter.get('/schools', controller.getAllSchools);

schoolRouter.get('/schools/:id', controller.getSchoolById);

schoolRouter.post(
  '/schools',
  validate(schema.createSchool),
  controller.createSchool
);

module.exports = schoolRouter;
