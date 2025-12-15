const { Student } = require('../models');

exports.createStudent = async (req, res) => {
  if (req.user.role === 'user' && !req.user.canEditStudents) {
    return res.status(403).json({ message: 'Permission denied' });
  }

  const student = await Student.create({
    ...req.body,
    schoolId: req.params.schoolId,
  });

  res.status(201).json(student);
};

exports.listStudents = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const students = await Student.findAndCountAll({
    where: {
      schoolId: req.params.schoolId,
      isDeleted: false,
    },
    limit: Number(limit),
    offset: (page - 1) * limit,
  });

  res.json({
    total: students.count,
    data: students.rows,
  });
};

exports.getStudentById = async (req, res) => {

  const student = await Student.findOne({
    where: {
      id: req.params.id,
      schoolId: req.params.schoolId,
      isDeleted: false,
    },
  });

  if (!student) return res.status(404).json({ message: 'Not found' });

  res.json(student);
};

exports.updateStudent = async (req, res) => {
  if (req.user.role === 'user' && !req.user.canEditStudents) {
    return res.status(403).json({ message: 'Permission denied' });
  }

  const student = await Student.findOne({
    where: {
      id: req.params.id,
      schoolId: req.params.schoolId,
      isDeleted: false,
    },
  });

  if (!student) return res.status(404).json({ message: 'Not found' });

  await student.update(req.body);
  res.json(student);
};

exports.deleteStudent = async (req, res) => {
  if (req.user.role === 'user' && !req.user.canEditStudents) {
    return res.status(403).json({ message: 'Permission denied' });
  }

  const student = await Student.findOne({
    where: {
      id: req.params.id,
      schoolId: req.params.schoolId,
    },
  });

  if (!student) return res.status(404).json({ message: 'Not found' });

  await student.update({ isDeleted: req.params.isDeleted });
  res.status(200).send(student);
};
