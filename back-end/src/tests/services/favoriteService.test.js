/* eslint-disable no-undef */
const { expect } = require("chai");
const sinon = require("sinon");
const favoriteService = require("../../services/favoriteService");
const { Favorite } = require("../../database/models");

describe("Favorite Service", () => {
  afterEach(() => {
    sinon.restore();
  });

  describe("listFavorites", () => {
    it("should list the favorites", async () => {
      sinon.stub(Favorite, "findOne").resolves({
        favorite: ["Aatrox", "Ahri", "Akali"],
      });

      const userId = 1;

      const favorites = await favoriteService.listFavorites(userId);

      expect(Favorite.findOne.called).to.be.true;
      expect(Favorite.findOne.firstCall.args[0]).to.deep.equal({
        where: { userId },
      });
      expect(favorites).to.deep.equal({
        favorite: ["Aatrox", "Ahri", "Akali"],
      });
    });
  });

  describe("addFavorite", () => {
    it("should add a favorite", async () => {
      const userId = 1;
      const favoriteName = "Yasuo";

      const favorites = {
        favorite: ["Aatrox", "Ahri", "Akali"],
        save: sinon.stub(),
      };

      sinon.stub(Favorite, "findOne").resolves(favorites);

      const result = await favoriteService.addFavorite(userId, favoriteName);

      expect(Favorite.findOne.called).to.be.true;
      expect(Favorite.findOne.firstCall.args[0]).to.deep.equal({
        where: { userId },
      });
      expect(favorites.favorite).to.be.include(favoriteName);
      expect(result).to.be.undefined;
    });
  });
});
