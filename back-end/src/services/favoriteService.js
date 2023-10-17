const { Favorite } = require("../database/models");

const listFavorites = async (userId) => {
  const favorites = await Favorite.findOne({
    where: { userId },
  });

  return favorites;
};

const addFavorite = async (userId, favoriteName) => {
  const favorites = await Favorite.findOne({ where: { userId } });

  if (!favorites) {
    await Favorite.create({
      userId,
      favorite: [favoriteName],
    });
  } else {
    if (!favorites.favorite.includes(favoriteName)) {
      favorites.favorite = [...favorites.favorite, favoriteName];

      await favorites.save();
    }
  }
};

module.exports = {
  listFavorites,
  addFavorite,
};
