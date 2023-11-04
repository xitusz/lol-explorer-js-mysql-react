/* eslint-disable no-undef */
const { expect } = require("chai");
const sinon = require("sinon");
const favoriteService = require("../../services/favoriteService");
const { Favorite } = require("../../database/models");

describe("Favorite Service", () => {
  describe("listFavorites", () => {
    beforeEach(async () => {
      sinon.stub(Favorite, "findOne").resolves({
        favorite: ["Aatrox", "Ahri", "Akali"],
      });
    });

    afterEach(() => {
      sinon.restore();
    });

    it("should list the favorites", async () => {
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
});
