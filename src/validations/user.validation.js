const Joi = require('joi');

exports.createUser = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  role: Joi.string().valid('admin', 'user').required(),
  canEditStudents: Joi.boolean().default(false),
});

exports.updateUser = Joi.object({
  name: Joi.string().optional(),
  phone: Joi.string().optional(),
  canEditStudents: Joi.boolean().optional(),
});