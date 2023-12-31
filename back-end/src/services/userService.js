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

const getProfileInfo = async (userId) => {
  const user = await User.findOne({
    where: { id: userId },
    attributes: ["name", "email"],
  });

  if (!user) {
    const error = new Error("Usuário não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return {
    name: user.name,
    email: user.email,
  };
};

const updateName = async (userId, newName) => {
  await User.update({ name: newName }, { where: { id: userId } });

  return "Nome atualizado com sucesso!";
};

const updateEmail = async (userId, newEmail) => {
  await User.update({ email: newEmail }, { where: { id: userId } });

  return "Email atualizado com sucesso!";
};

const updatePassword = async (userId, newPassword) => {
  const hashedPassword = hash(newPassword);

  await User.update({ password: hashedPassword }, { where: { id: userId } });

  return "Senha atualizada com sucesso!";
};

const deleteUser = async (userId) => {
  const user = await User.findOne({ where: { id: userId } });

  if (!user) {
    const error = new Error("Usuário não encontrado");
    error.statusCode = 404;
    throw error;
  }

  await User.destroy({ where: { id: userId } });

  return "Usuário excluído com sucesso!";
};

module.exports = {
  create,
  login,
  getProfileInfo,
  updateName,
  updateEmail,
  updatePassword,
  deleteUser,
};
