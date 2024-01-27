/* eslint-disable no-undef */
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const app = require("../../../index");
const axios = require("axios");

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

  describe("validName", () => {
    it("should handle error invalid name", async () => {
      const name = "U";
      const email = "user@email.com";
      const password = "123456";
      const recaptchaValue = "validRecaptchaValue";
      const googleResponse = { data: { success: true } };

      sinon.stub(axios, "post").resolves(googleResponse);

      const response = await chai
        .request(app)
        .post("/register")
        .send({ name, email, password, recaptchaValue });

      expect(response).to.have.status(401);
      expect(response.body.message).to.equal(
        "O nome deve ter pelo menos 2 caracteres"
      );
    });
  });

  describe("validEmail", () => {
    it("should handle error invalid email", async () => {
      const name = "User";
      const email = "invalid";
      const password = "123456";
      const recaptchaValue = "validRecaptchaValue";
      const googleResponse = { data: { success: true } };

      sinon.stub(axios, "post").resolves(googleResponse);

      const response = await chai
        .request(app)
        .post("/register")
        .send({ name, email, password, recaptchaValue });

      expect(response).to.have.status(401);
      expect(response.body.message).to.equal("Insira um email válido");
    });
  });

  describe("validPassword", () => {
    it("should handle error invalid password", async () => {
      const name = "User";
      const email = "user@example.com";
      const password = "123";
      const recaptchaValue = "validRecaptchaValue";
      const googleResponse = { data: { success: true } };

      sinon.stub(axios, "post").resolves(googleResponse);

      const response = await chai
        .request(app)
        .post("/register")
        .send({ name, email, password, recaptchaValue });

      expect(response).to.have.status(401);
      expect(response.body.message).to.equal(
        "A senha deve ter de 6 a 12 caracteres"
      );
    });
  });
});
