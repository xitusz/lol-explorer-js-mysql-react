/* eslint-disable no-undef */
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const app = require("../../../index");
const userService = require("../../services/userService");
const axios = require("axios");

const { expect } = chai;
chai.use(chaiHttp);

describe("Register Router", () => {
  afterEach(() => {
    sinon.restore();
  });

  describe("POST /", () => {
    it("should create a new user", async () => {
      const name = "name";
      const email = "user@example.com";
      const password = "123456";
      const recaptchaValue = "validRecaptchaValue";
      const googleResponse = { data: { success: true } };

      sinon.stub(axios, "post").resolves(googleResponse);
      const createStub = sinon
        .stub(userService, "create")
        .resolves("Usuário criado");

      const response = await chai
        .request(app)
        .post("/register")
        .send({ name, email, password, recaptchaValue });

      expect(response).to.have.status(201);
      expect(response.body.message).to.equal("Usuário criado");
      expect(createStub.calledOnce).to.be.true;
    });

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
