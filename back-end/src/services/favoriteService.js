const { Favorite } = require("../database/models");

const createFavorites = async (userId) => {
  const favorites = await Favorite.findOne({
    where: { userId },
  });

  if (!favorites) {
    await Favorite.create({
      userId,
      favorite: [],
    });
  }
};

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

const removeFavorite = async (userId, favoriteName) => {
  const favorites = await Favorite.findOne({ where: { userId } });

  if (favorites) {
    favorites.favorite = favorites.favorite.filter(
      (name) => name !== favoriteName
    );

    await favorites.save();
  }
};

const clearFavorites = async (userId) => {
  const favorites = await Favorite.findOne({ where: { userId } });

  if (favorites) {
    favorites.favorite = [];

    await favorites.save();
  }
};

module.exports = {
  createFavorites,
  listFavorites,
  addFavorite,
  removeFavorite,
  clearFavorites,
};
