const favoriteService = require("../services/favoriteService");

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
    await favoriteService.addFavorite(id, favoriteName);

    return res.status(201).json({ message: "Favorito adicionado com sucesso" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listFavorites,
  addFavorite,
};
