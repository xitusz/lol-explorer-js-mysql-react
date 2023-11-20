const md5 = require("md5");

const hash = (str) => md5(str);

const verify = (str, hashedPassword) => hashedPassword === hash(str);

module.exports = {
  hash,
  verify,
};
