const favoriteService = require("../services/favoriteService");

const listFavorites = async (req, res, next) => {
  const { id } = req.user;

  try {
    const favorites = await favoriteService.listFavorites(id);

    return res.status(200).json(favorites[0].favorite);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listFavorites,
};
