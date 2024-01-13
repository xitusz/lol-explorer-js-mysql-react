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

  describe("createFavorites", () => {
    it("should create favorites array", async () => {
      const { req, res, next } = createReqResNext();

      const createFavoritesStub = sinon
        .stub(favoriteService, "createFavorites")
        .resolves("Favorito criado com sucesso");

      await favoriteController.createFavorites(req, res, next);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith({ message: "Favorito criado com sucesso" })).to
        .be.true;
      expect(next.notCalled).to.be.true;
      expect(createFavoritesStub.calledOnce).to.be.true;
      expect(createFavoritesStub.calledWith(req.user.id)).to.be.true;
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
      expect(listFavoritesStub.calledWith(req.user.id)).to.be.true;
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

  describe("addFavorite", () => {
    it("should add a favorite", async () => {
      const { req, res, next } = createReqResNext();

      const favoriteName = "Aatrox";

      const addFavoriteStub = sinon
        .stub(favoriteService, "addFavorite")
        .resolves("Favorito adicionado com sucesso");

      req.body = { favoriteName };

      await favoriteController.addFavorite(req, res, next);

      expect(res.status.calledWith(201)).to.be.true;
      expect(
        res.json.calledWith({ message: "Favorito adicionado com sucesso" })
      ).to.be.true;
      expect(next.notCalled).to.be.true;
      expect(addFavoriteStub.calledOnce).to.be.true;
      expect(addFavoriteStub.calledWith(req.user.id, favoriteName)).to.be.true;
    });

    it("should handle error add a favorite", async () => {
      const { req, res, next } = createReqResNext();

      const favoriteName = "Aatrox";

      sinon
        .stub(favoriteService, "addFavorite")
        .rejects(new Error("Erro ao adicionar favorito"));

      req.body = { favoriteName };

      await favoriteController.addFavorite(req, res, next);

      expect(next.calledOnce).to.be.true;
      expect(
        next.calledWithMatch(
          sinon.match
            .instanceOf(Error)
            .and(sinon.match.has("message", "Erro ao adicionar favorito"))
        )
      ).to.be.true;
    });
  });

  describe("removeFavorite", () => {
    it("should remove a favorite", async () => {
      const { req, res, next } = createReqResNext();

      const favoriteName = "Aatrox";

      const removeFavoriteStub = sinon
        .stub(favoriteService, "removeFavorite")
        .resolves("Favorito removido com sucesso");

      req.body = { favoriteName };

      await favoriteController.removeFavorite(req, res, next);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ message: "Favorito removido com sucesso" }))
        .to.be.true;
      expect(next.notCalled).to.be.true;
      expect(removeFavoriteStub.calledOnce).to.be.true;
      expect(removeFavoriteStub.calledWith(req.user.id, favoriteName)).to.be
        .true;
    });

    it("should handle error remove a favorite", async () => {
      const { req, res, next } = createReqResNext();

      const favoriteName = "Aatrox";

      sinon
        .stub(favoriteService, "removeFavorite")
        .rejects(new Error("Erro ao remover favorito"));

      req.body = { favoriteName };

      await favoriteController.removeFavorite(req, res, next);

      expect(next.calledOnce).to.be.true;
      expect(
        next.calledWithMatch(
          sinon.match
            .instanceOf(Error)
            .and(sinon.match.has("message", "Erro ao remover favorito"))
        )
      ).to.be.true;
    });
  });

  describe("clearFavorites", () => {
    it("should clear favorites", async () => {
      const { req, res, next } = createReqResNext();

      const clearFavoritesStub = sinon
        .stub(favoriteService, "clearFavorites")
        .resolves("Todos os favoritos foram removidos com sucesso");

      await favoriteController.clearFavorites(req, res, next);

      expect(res.status.calledWith(200)).to.be.true;
      expect(
        res.json.calledWith({
          message: "Todos os favoritos foram removidos com sucesso",
        })
      ).to.be.true;
      expect(next.notCalled).to.be.true;
      expect(clearFavoritesStub.calledOnce).to.be.true;
      expect(clearFavoritesStub.calledWith(req.user.id)).to.be.true;
    });

    it("should handle error clear favorites", async () => {
      const { req, res, next } = createReqResNext();

      sinon
        .stub(favoriteService, "clearFavorites")
        .rejects(new Error("Erro ao limpar favoritos"));

      await favoriteController.clearFavorites(req, res, next);

      expect(next.calledOnce).to.be.true;
      expect(
        next.calledWithMatch(
          sinon.match
            .instanceOf(Error)
            .and(sinon.match.has("message", "Erro ao limpar favoritos"))
        )
      ).to.be.true;
    });
  });
});
