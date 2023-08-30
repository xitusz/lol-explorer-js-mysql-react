/* eslint-disable no-undef */
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const app = require("../../../index");
const userService = require("../../services/userService");

const { expect } = chai;
chai.use(chaiHttp);

describe("Login Router", () => {
  describe("POST /login", () => {
    const request = async (body) => chai.request(app).post(`/login`).send(body);

    afterEach(() => {
      sinon.restore();
    });

    it("should log in user and return a token when valid credentials", async () => {
      const user = {
        email: "user1@example.com",
        password: "123456",
      };

      sinon.stub(userService, "login").resolves({
        id: 1,
        name: "user",
        email: "user1@example.com",
        token: "token",
      });

      const response = await request(user);

      expect(response).to.have.status(200);
      expect(response.body).to.have.property("id").to.equal(1);
      expect(response.body).to.have.property("name").to.equal("user");
      expect(response.body)
        .to.have.property("email")
        .to.equal("user1@example.com");
      expect(response.body).to.have.property("token").to.be.a("string");
    });

    it("should return an error when invalid credentials", async () => {
      const user = {
        email: "user1@example.com",
        password: "invalidpassword",
      };

      sinon
        .stub(userService, "login")
        .rejects({ statusCode: 404, message: "Email ou senha inválida" });

      const response = await request(user);

      expect(response).to.have.status(404);
      expect(response.body)
        .to.have.property("message")
        .to.equal("Email ou senha inválida");
    });
  });
});
