const { sign } = require("../utils/jwtConfig");
const { User } = require("../database/models");
const { hash, verify } = require("../utils/hash");

const create = async (name, email, password) => {
  const hashedPassword = hash(password);

  const existEmail = await User.findOne({ where: { email } });

  if (existEmail) {
    const error = new Error("Email já registrado");
    error.statusCode = 409;
    throw error;
  }

  await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return "Usuário criado";
};

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    const error = new Error("Email ou senha inválida");
    error.statusCode = 404;
    throw error;
  }

  if (!verify(password, user.password)) {
    const error = new Error("Email ou senha inválida");
    error.statusCode = 404;
    throw error;
  }

  const {
    dataValues: { id },
  } = user;

  const token = sign({ id });

  delete user.dataValues.password;

  return {
    ...user.dataValues,
    token,
  };
};

module.exports = {
  create,
  login,
};
