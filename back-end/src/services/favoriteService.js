const { Favorite } = require("../database/models");

const listFavorites = async (userId) => {
  const favorites = await Favorite.findAll({
    where: { userId },
  });

  return favorites;
};

module.exports = {
  listFavorites,
};
