const favoriteService = require("../services/favoriteService");

const createFavorites = async (req, res, next) => {
  const { id } = req.user;

  try {
    const message = await favoriteService.createFavorites(id);

    return res.status(201).json({ message });
  } catch (err) {
    next(err);
  }
};

const listFavorites = async (req, res, next) => {
  const { id } = req.user;

  try {
    const favorites = await favoriteService.listFavorites(id);

    return res.status(200).json(favorites.favorite);
  } catch (err) {
    next(err);
  }
};

const addFavorite = async (req, res, next) => {
  const { id } = req.user;
  const { favoriteName } = req.body;

  try {
    const message = await favoriteService.addFavorite(id, favoriteName);

    return res.status(201).json({ message });
  } catch (err) {
    next(err);
  }
};

const removeFavorite = async (req, res, next) => {
  const { id } = req.user;
  const { favoriteName } = req.body;

  try {
    const message = await favoriteService.removeFavorite(id, favoriteName);

    return res.status(200).json({ message });
  } catch (err) {
    next(err);
  }
};

const clearFavorites = async (req, res, next) => {
  const { id } = req.user;

  try {
    const message = await favoriteService.clearFavorites(id);

    return res.status(200).json({ message });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createFavorites,
  listFavorites,
  addFavorite,
  removeFavorite,
  clearFavorites,
};
