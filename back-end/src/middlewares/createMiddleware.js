const { verifyToken } = require("../utils/jwtConfig");

const validEmail = (req, res, next) => {
  const { email } = req.body;

  const regex = /^[a-z0-9-_.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/gi;

  if (!regex.test(email)) {
    return res.status(401).json({ message: "Insira um email válido" });
  }

  next();
};

const validPassword = (req, res, next) => {
  const { password } = req.body;

  if (password.length < 6 || password.length > 12) {
    return res
      .status(401)
      .json({ message: "A senha deve ter de 6 a 12 caracteres" });
  }

  next();
};

const validName = (req, res, next) => {
  const { name } = req.body;

  if (name.length < 2) {
    return res
      .status(401)
      .json({ message: "O nome deve ter pelo menos 2 caracteres" });
  }

  next();
};

const validToken = (req, res, next) => {
  const { authorization } = req.headers;
  const token = verifyToken(authorization);

  if (!authorization) {
    return res.status(401).json({ message: "Token não encontrado" });
  }

  if (!token) {
    res.status(401).json({ message: "Token expirado ou inválido" });
  }

  req.user = token;

  next();
};

module.exports = { validEmail, validPassword, validName, validToken };
