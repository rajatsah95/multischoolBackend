const authRouter = require('express').Router();
const { login, resetPassword } = require('../controllers/auth.controller');
const validate = require('../middlewares/validate.middleware');
const { loginSchema } = require('../validations/auth.validation');
const auth = require('../middlewares/auth.middleware');

authRouter.post('/login', validate(loginSchema), login);
authRouter.post('/resetPassword', auth, resetPassword);

module.exports = authRouter;
