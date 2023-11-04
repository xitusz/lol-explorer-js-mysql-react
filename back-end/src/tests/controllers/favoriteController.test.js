/* eslint-disable no-undef */
const { expect } = require("chai");
const sinon = require("sinon");
const favoriteController = require("../../controllers/favoriteController");
const favoriteService = require("../../services/favoriteService");

describe("Favorite Controller", () => {
  const req = { user: { id: 1 } };
  const res = {};
  const next = () => {};

  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns();

  describe("listFavorites", () => {
    it("should list the favorites", async () => {
      const favorites = [{ favorite: ["Aatrox", "Ahri", "Akali"] }];

      sinon.stub(favoriteService, "listFavorites").resolves(favorites);

      await favoriteController.listFavorites(req, res, next);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(favorites.favorite)).to.be.true;
    });
  });
});
