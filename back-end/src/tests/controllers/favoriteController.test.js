/* eslint-disable no-undef */
const { expect } = require("chai");
const sinon = require("sinon");
const favoriteController = require("../../controllers/favoriteController");
const favoriteService = require("../../services/favoriteService");

describe("Favorite Controller", () => {
  const req = { user: { id: 1 } };
  const res = {};
  const next = sinon.spy();

  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns();

  afterEach(() => {
    sinon.restore();
  });

  describe("createFavorite", () => {
    it("should create favorites array", async () => {
      const createFavoritesStub = sinon
        .stub(favoriteService, "createFavorites")
        .resolves("Favorito criado com sucesso");

      await favoriteController.createFavorites(req, res, next);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ message: "Favorito criado com sucesso" })).to
        .be.true;
      expect(next.notCalled).to.be.true;
      expect(createFavoritesStub.calledOnce).to.be.true;
    });

    it("should handle error create favorites array", async () => {
      sinon
        .stub(favoriteService, "createFavorites")
        .rejects(new Error("Erro ao criar favorito"));

      await favoriteController.createFavorites(req, res, next);

      expect(next.calledOnce).to.be.true;
      expect(
        next.calledWithMatch(
          sinon.match
            .instanceOf(Error)
            .and(sinon.match.has("message", "Erro ao criar favorito"))
        )
      ).to.be.true;
    });
  });
});
