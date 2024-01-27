const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const jwtSecret = fs.readFileSync(
  path.join(__dirname, "../../jwt.evaluation.key")
);

const sign = (payload) => {
  try {
    return jwt.sign(payload, jwtSecret, {
      expiresIn: "7d",
      algorithm: "HS256",
    });
  } catch (err) {
    throw new Error(`Erro ao assinar o token JWT: ${err}`);
  }
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (err) {
    throw new Error(`Erro ao verificar o token JWT: ${err}`);
  }
};

module.exports = {
  sign,
  verifyToken,
};
