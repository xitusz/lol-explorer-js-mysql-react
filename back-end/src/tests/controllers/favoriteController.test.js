/* eslint-disable no-undef */
const { expect } = require("chai");
const sinon = require("sinon");
const favoriteController = require("../../controllers/favoriteController");
const favoriteService = require("../../services/favoriteService");

describe("Favorite Controller", () => {
  createReqResNext = () => {
    const req = { user: { id: 1 } };
    const res = {};
    const next = sinon.spy();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    return { req, res, next };
  };

  afterEach(() => {
    sinon.restore();
  });

  describe("createFavorite", () => {
    it("should create favorites array", async () => {
      const { req, res, next } = createReqResNext();

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
      const { req, res, next } = createReqResNext();

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

  describe("listFavorites", () => {
    it("should list the favorites", async () => {
      const { req, res, next } = createReqResNext();

      const favorites = [{ favorite: ["Aatrox", "Ahri", "Akali"] }];

      const listFavoritesStub = sinon
        .stub(favoriteService, "listFavorites")
        .resolves(favorites);

      await favoriteController.listFavorites(req, res, next);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(favorites.favorite)).to.be.true;
      expect(next.notCalled).to.be.true;
      expect(listFavoritesStub.calledOnce).to.be.true;
    });

    it("should handle error list the favorites", async () => {
      const { req, res, next } = createReqResNext();

      sinon
        .stub(favoriteService, "listFavorites")
        .rejects(new Error("Erro ao listar favoritos"));

      await favoriteController.listFavorites(req, res, next);

      expect(next.calledOnce).to.be.true;
      expect(
        next.calledWithMatch(
          sinon.match
            .instanceOf(Error)
            .and(sinon.match.has("message", "Erro ao listar favoritos"))
        )
      ).to.be.true;
    });
  });
});
