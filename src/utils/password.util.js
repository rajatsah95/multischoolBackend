const bcrypt = require('bcrypt');

exports.generatePassword = async (phone) => {
  const hash = await bcrypt.hash(phone, 10);
  return { plain: phone, hash };
};
