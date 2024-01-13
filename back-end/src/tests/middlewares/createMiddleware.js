/* eslint-disable no-undef */
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const app = require("../../../index");

const { expect } = chai;
chai.use(chaiHttp);

describe("Create Middleware", () => {
  afterEach(() => {
    sinon.restore();
  });

  describe("validToken", () => {
    it("should handle error invalid token", async () => {
      const invalidToken = "invalidToken";

      const response = await chai
        .request(app)
        .get("/profile")
        .set("Authorization", `Bearer ${invalidToken}`);

      expect(response).to.have.status(401);
      expect(response.body.message).to.be.equal("Token expirado ou inválido");
    });

    it("should handle error missing token", async () => {
      const response = await chai.request(app).get("/profile");

      expect(response).to.have.status(401);
      expect(response.body.message).to.be.equal("Token não encontrado");
    });
  });
});
