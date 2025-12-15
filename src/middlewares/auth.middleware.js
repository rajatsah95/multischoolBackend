const jwt = require('jsonwebtoken');
const { User } = require('../models');
module.exports =async (req, res, next) => {
  const token = req.headers.token
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
 const user = await User.findByPk(req.user.userId, {
    attributes: { exclude: ['passwordHash'] },
  });

    if (user.firstTimeLogin) {
if (req.url !== '/resetPassword') {
  return res.status(403).json({ message: 'Your token is only used to reset password' });
}
}
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};
