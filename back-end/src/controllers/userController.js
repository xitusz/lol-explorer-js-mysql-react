const userService = require("../services/userService");

const create = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const message = await userService.create(name, email, password);

    return res.status(201).json({ message });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const data = await userService.login(email, password);

    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  login,
};
