const { sign } = require("../utils/jwtConfig");
const { User } = require("../database/models");
const { hash, verify } = require("../utils/hash");
const axios = require("axios");

const verifyRecaptcha = async (recaptchaValue) => {
  if (!recaptchaValue) {
    const error = new Error("reCAPTCHA ausente");
    error.statusCode = 400;
    throw error;
  }

  const googleResponse = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaValue}`
  );

  if (!googleResponse.data.success) {
    const error = new Error("reCAPTCHA inválido");
    error.statusCode = 400;
    throw error;
  }
};

const create = async (name, email, password, recaptchaValue) => {
  try {
    await verifyRecaptcha(recaptchaValue);

    const hashedPassword = await hash(password);
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
  } catch (err) {
    throw new Error(`Erro ao criar usuário: ${err}`);
  }
};

const login = async (email, password, recaptchaValue) => {
  try {
    await verifyRecaptcha(recaptchaValue);

    const user = await User.findOne({ where: { email } });

    if (!user || !(await verify(password, user.password))) {
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
  } catch (err) {
    throw new Error(`Erro ao realizar login do usuário: ${err}`);
  }
};

const getProfileInfo = async (userId) => {
  try {
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
  } catch (err) {
    throw new Error(`Erro ao buscar usuário: ${err}`);
  }
};

const updateName = async (userId, newName) => {
  try {
    await User.update({ name: newName }, { where: { id: userId } });

    return "Nome atualizado com sucesso!";
  } catch (err) {
    throw new Error(`Erro ao atualizar nome: ${err}`);
  }
};

const updateEmail = async (userId, newEmail) => {
  try {
    await User.update({ email: newEmail }, { where: { id: userId } });

    return "Email atualizado com sucesso!";
  } catch (err) {
    throw new Error(`Erro ao atualizar email: ${err}`);
  }
};

const updatePassword = async (userId, newPassword) => {
  try {
    const hashedPassword = await hash(newPassword);

    await User.update({ password: hashedPassword }, { where: { id: userId } });

    return "Senha atualizada com sucesso!";
  } catch (err) {
    throw new Error(`Erro ao atualizar senha: ${err}`);
  }
};

const deleteUser = async (userId) => {
  try {
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      const error = new Error("Usuário não encontrado");
      error.statusCode = 404;
      throw error;
    }

    await User.destroy({ where: { id: userId } });

    return "Usuário excluído com sucesso!";
  } catch (err) {
    throw new Error(`Erro ao deletar usuário: ${err}`);
  }
};

const validateEmail = async (newEmail) => {
  try {
    const existingUser = await User.findOne({ where: { email: newEmail } });

    return !!existingUser;
  } catch (err) {
    throw new Error(`Erro ao validar email: ${err}`);
  }
};

module.exports = {
  create,
  login,
  getProfileInfo,
  updateName,
  updateEmail,
  updatePassword,
  deleteUser,
  validateEmail,
};
