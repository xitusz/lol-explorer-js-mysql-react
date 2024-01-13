/* eslint-disable no-undef */
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const app = require("../../../index");
const userService = require("../../services/userService");
const axios = require("axios");

const { expect } = chai;
chai.use(chaiHttp);

describe("Login Router", () => {
  afterEach(() => {
    sinon.restore();
  });

  describe("POST /", () => {
    it("should log in a user", async () => {
      const user = {
        id: 1,
        name: "User",
        email: "user@example.com",
        token: "token",
      };
      const email = "user@example.com";
      const password = "123456";
      const recaptchaValue = "validRecaptchaValue";
      const googleResponse = { data: { success: true } };

      sinon.stub(axios, "post").resolves(googleResponse);
      const loginStub = sinon.stub(userService, "login").resolves(user);

      const response = await chai
        .request(app)
        .post("/login")
        .send({ email, password, recaptchaValue });

      expect(response).to.have.status(200);
      expect(response.body.name).to.equal(user.name);
      expect(response.body.email).to.equal(user.email);
      expect(response.body.token).to.equal(user.token);
      expect(loginStub.calledOnce).to.be.true;
      expect(loginStub.firstCall.args[0]).to.equal(email);
      expect(loginStub.firstCall.args[1]).to.equal(password);
      expect(loginStub.firstCall.args[2]).to.equal(recaptchaValue);
    });
  });
});
