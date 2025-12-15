const Joi = require('joi');

exports.createStudent = Joi.object({
  name: Joi.string().required(),
  dob: Joi.date().required(),
  metadata: Joi.object().optional(),
});
