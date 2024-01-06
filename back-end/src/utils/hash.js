const bcrypt = require("bcrypt");

const hash = async (str) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(str, saltRounds);

  return hashedPassword;
};

const verify = async (str, hashedPassword) => {
  const isMatch = await bcrypt.compare(str, hashedPassword);

  return isMatch;
};

module.exports = {
  hash,
  verify,
};
