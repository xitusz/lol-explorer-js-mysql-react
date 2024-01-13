/* eslint-disable no-undef */
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const app = require("../../../index");
const favoriteService = require("../../services/favoriteService");
const jwt = require("jsonwebtoken");

const { expect } = chai;
chai.use(chaiHttp);

describe("Favorite Router", () => {
  afterEach(() => {
    sinon.restore();
  });

  describe("POST /create", () => {
    it("should create favorites array", async () => {
      const user = { id: 1, name: "User", email: "user@example.com" };
      const token = "token";

      const verifyStub = sinon.stub(jwt, "verify").returns(user);
      const createFavoritesStub = sinon
        .stub(favoriteService, "createFavorites")
        .resolves("Favorito criado com sucesso");

      const response = await chai
        .request(app)
        .post("/favorites/create")
        .set("Authorization", `Bearer ${token}`);

      expect(response).to.have.status(201);
      expect(verifyStub.calledOnce).to.be.true;
      expect(createFavoritesStub.calledOnce).to.be.true;
    });
  });
});
