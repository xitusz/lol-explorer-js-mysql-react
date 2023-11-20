const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const jwtSecret = fs.readFileSync(
  path.join(__dirname, "../../jwt.evaluation.key")
);

const sign = (payload) =>
  jwt.sign(payload, jwtSecret, {
    expiresIn: "7d",
    algorithm: "HS256",
  });

const verifyToken = (token) => jwt.verify(token, jwtSecret);

module.exports = {
  sign,
  verifyToken,
};
