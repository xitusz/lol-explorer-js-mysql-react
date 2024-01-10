/* eslint-disable no-undef */
const { expect } = require("chai");
const sinon = require("sinon");
const favoriteService = require("../../services/favoriteService");
const { Favorite } = require("../../database/models");

describe("Favorite Service", () => {
  afterEach(() => {
    sinon.restore();
  });

  describe("createFavorites", () => {
    it("should create favorites array", async () => {
      const findOneStub = sinon.stub(Favorite, "findOne").resolves(null);
      const createFavoritesStub = sinon.stub(Favorite, "create").resolves();

      const userId = 1;

      const result = await favoriteService.createFavorites(userId);

      expect(result).to.deep.equal("Favorito criado com sucesso");
      expect(findOneStub.calledOnce).to.be.true;
      expect(createFavoritesStub.calledOnce).to.be.true;
      expect(findOneStub.calledWith({ where: { userId } })).to.be.true;
      expect(createFavoritesStub.calledWith({ userId, favorite: [] })).to.be
        .true;
    });

    it("should handle error create favorites array", async () => {
      sinon.stub(Favorite, "findOne").rejects(new Error());

      try {
        await favoriteService.createFavorites(1);
      } catch (err) {
        expect(err.message).to.equal("Erro ao criar favorito: Error");
      }
    });
  });

  describe("listFavorites", () => {
    it("should list the favorites", async () => {
      const findOneStub = sinon.stub(Favorite, "findOne").resolves({
        favorite: ["Aatrox", "Ahri", "Akali"],
      });

      const userId = 1;

      const result = await favoriteService.listFavorites(userId);

      expect(result).to.deep.equal({
        favorite: ["Aatrox", "Ahri", "Akali"],
      });
      expect(findOneStub.calledOnce).to.be.true;
      expect(findOneStub.calledWith({ where: { userId } })).to.be.true;
    });

    it("should handle error list the favorites", async () => {
      sinon.stub(Favorite, "findOne").rejects(new Error());

      try {
        await favoriteService.listFavorites(1);
      } catch (err) {
        expect(err.message).to.equal("Erro ao listar favoritos: Error");
      }
    });
  });

  describe("addFavorite", () => {
    it("should add a favorite", async () => {
      const favorites = {
        favorite: ["Aatrox", "Ahri", "Akali"],
        save: sinon.stub(),
      };

      const findOneStub = sinon.stub(Favorite, "findOne").resolves(favorites);

      const userId = 1;
      const favoriteName = "Yasuo";

      const result = await favoriteService.addFavorite(userId, favoriteName);

      expect(result).to.deep.equal("Favorito adicionado com sucesso");
      expect(findOneStub.calledOnce).to.be.true;
      expect(findOneStub.calledWith({ where: { userId } })).to.be.true;
      expect(favorites.favorite).to.be.include(favoriteName);
    });

    it("should handle error add a favorite", async () => {
      sinon.stub(Favorite, "findOne").rejects(new Error());

      try {
        await favoriteService.addFavorite(1, "Yasuo");
      } catch (err) {
        expect(err.message).to.equal("Erro ao adicionar favorito: Error");
      }
    });
  });

  describe("removeFavorite", () => {
    it("should remove a favorite", async () => {
      const favorites = {
        favorite: ["Aatrox", "Ahri", "Akali", "Yasuo"],
        save: sinon.stub(),
      };

      const findOneStub = sinon.stub(Favorite, "findOne").resolves(favorites);

      const userId = 1;
      const favoriteName = "Yasuo";

      const result = await favoriteService.removeFavorite(userId, favoriteName);

      expect(result).to.deep.equal("Favorito removido com sucesso");
      expect(findOneStub.calledOnce).to.be.true;
      expect(findOneStub.calledWith({ where: { userId } })).to.be.true;
      expect(favorites.favorite).to.not.be.include(favoriteName);
    });

    it("should handle error remove a favorite", async () => {
      sinon.stub(Favorite, "findOne").rejects(new Error());

      try {
        await favoriteService.removeFavorite(1, "Yasuo");
      } catch (err) {
        expect(err.message).to.equal("Erro ao remover favorito: Error");
      }
    });
  });

  describe("clearFavorites", () => {
    it("should clear all favorites", async () => {
      const favorites = {
        favorite: ["Aatrox", "Ahri", "Akali", "Yasuo"],
        save: sinon.stub(),
      };

      const findOneStub = sinon.stub(Favorite, "findOne").resolves(favorites);

      const userId = 1;

      const result = await favoriteService.clearFavorites(userId);

      expect(result).to.deep.equal(
        "Todos os favoritos foram removidos com sucesso"
      );
      expect(findOneStub.calledOnce).to.be.true;
      expect(findOneStub.calledWith({ where: { userId } })).to.be.true;
      expect(favorites.favorite).to.deep.equal([]);
    });

    it("should handle error clear all favorites", async () => {
      sinon.stub(Favorite, "findOne").rejects(new Error());

      try {
        await favoriteService.clearFavorites(1);
      } catch (err) {
        expect(err.message).to.equal("Erro ao limpar favoritos: Error");
      }
    });
  });
});
