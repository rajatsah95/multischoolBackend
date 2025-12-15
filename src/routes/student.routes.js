const studentRouter = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const schoolGuard = require('../middlewares/school.middleware');
const validate = require('../middlewares/validate.middleware');
const controller = require('../controllers/student.controller');
const schema = require('../validations/student.validation');

studentRouter.use(auth);

studentRouter.post(
  '/schools/:schoolId/students',
  schoolGuard,
  validate(schema.createStudent),
  controller.createStudent
);

studentRouter.get(
  '/schools/:schoolId/students',
  schoolGuard,
  controller.listStudents
);

studentRouter.get(
  '/schools/:schoolId/students/:id',
  schoolGuard,
  controller.getStudentById
);

studentRouter.put(
  '/schools/:schoolId/students/:id',
  schoolGuard,
  controller.updateStudent
);

studentRouter.delete(
  '/schools/:schoolId/students/:id/:isDeleted',
  schoolGuard,
  controller.deleteStudent
);

module.exports = studentRouter;
