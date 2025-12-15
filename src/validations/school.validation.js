const Joi = require('joi');

exports.createSchool = Joi.object({
  name: Joi.string().min(2).required(),
});
