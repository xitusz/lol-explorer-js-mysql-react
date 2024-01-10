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
});
