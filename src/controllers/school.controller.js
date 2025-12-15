const { School } = require('../models');

/**
 * GET /schools
 * Superadmin only
 */
exports.getAllSchools = async (req, res) => {
  const schools = await School.findAll();
  res.json(schools);
};

/**
 * GET /schools/:id
 * Superadmin only
 */
exports.getSchoolById = async (req, res) => {
  const school = await School.findByPk(req.params.id);

  if (!school) {
    return res.status(404).json({ message: 'School not found' });
  }

  res.json(school);
};

/**
 * POST /schools
 * Superadmin only
 */
exports.createSchool = async (req, res) => {
  const school = await School.create({
    name: req.body.name,
  });

  res.status(201).json(school);
};
