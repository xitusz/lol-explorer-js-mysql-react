const bcrypt = require("bcrypt");

const hash = async (str) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(str, saltRounds);

    return hashedPassword;
  } catch (err) {
    throw new Error(`Erro ao fazer o hashing da senha: ${err}`);
  }
};

const verify = async (str, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(str, hashedPassword);

    return isMatch;
  } catch (err) {
    throw new Error(`Erro ao verificar a senha: ${err}`);
  }
};

module.exports = {
  hash,
  verify,
};
