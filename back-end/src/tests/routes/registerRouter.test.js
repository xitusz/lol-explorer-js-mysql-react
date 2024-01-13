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
      expect(createStub.firstCall.args[0]).to.equal(name);
      expect(createStub.firstCall.args[1]).to.equal(email);
      expect(createStub.firstCall.args[2]).to.equal(password);
      expect(createStub.firstCall.args[3]).to.equal(recaptchaValue);
    });
  });
});
