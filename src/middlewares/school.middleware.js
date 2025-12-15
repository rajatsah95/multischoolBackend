module.exports = (req, res, next) => {
  if (
    req.user.role !== 'superadmin' &&
    req.user.schoolId !== Number(req.params.schoolId)
  ) {
    return res.status(403).json({ message: 'Cross-school access denied' });
  }
  next();
};
