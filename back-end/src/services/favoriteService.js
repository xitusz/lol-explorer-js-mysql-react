const { Favorite } = require("../database/models");

const createFavorites = async (userId) => {
  try {
    const favorites = await Favorite.findOne({
      where: { userId },
    });

    if (!favorites) {
      await Favorite.create({
        userId,
        favorite: [],
      });
    }

    return "Favorito criado com sucesso";
  } catch (err) {
    throw new Error(`Erro ao criar favorito: ${err}`);
  }
};

const listFavorites = async (userId) => {
  try {
    const favorites = await Favorite.findOne({
      where: { userId },
    });

    return favorites;
  } catch (err) {
    throw new Error(`Erro ao listar favoritos: ${err}`);
  }
};

const addFavorite = async (userId, favoriteName) => {
  try {
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

    return "Favorito adicionado com sucesso";
  } catch (err) {
    throw new Error(`Erro ao adicionar favorito: ${err}`);
  }
};

const removeFavorite = async (userId, favoriteName) => {
  try {
    const favorites = await Favorite.findOne({ where: { userId } });

    if (favorites) {
      favorites.favorite = favorites.favorite.filter(
        (name) => name !== favoriteName
      );

      await favorites.save();
    }

    return "Favorito removido com sucesso";
  } catch (err) {
    throw new Error(`Erro ao remover favorito: ${err}`);
  }
};

const clearFavorites = async (userId) => {
  try {
    const favorites = await Favorite.findOne({ where: { userId } });

    if (favorites) {
      favorites.favorite = [];

      await favorites.save();
    }

    return "Todos os favoritos foram removidos com sucesso";
  } catch (err) {
    throw new Error(`Erro ao limpar favoritos: ${err}`);
  }
};

module.exports = {
  createFavorites,
  listFavorites,
  addFavorite,
  removeFavorite,
  clearFavorites,
};
