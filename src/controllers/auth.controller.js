const bcrypt = require('bcrypt');
const { User } = require('../models');
const { generateToken } = require('../services/token.service');
const { generatePassword } = require('../utils/password.util');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email, isDeleted: false },
  });

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = generateToken(user);
  res.json({ token });
};

exports.resetPassword = async (req, res) => {
  let user=await User.findOne(
                   {where: {id:req.user.userId, isDeleted: false}}  
                ) 
 if (!user) {
    return res.status(401).json({ message: 'user not found' });
  }

                  const {  hash } = await generatePassword(req.body.newPassword);
                await user.update({firstTimeLogin:false,   passwordHash: hash})
res.json({message:"Reset Password is done"})
};
