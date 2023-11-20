/* eslint-disable no-undef */
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const app = require("../../../index");
const { User } = require("../../database/models");

const { expect } = chai;
chai.use(chaiHttp);

describe("Register Router", () => {
  describe("POST /register", () => {
    const request = async (body) =>
      chai.request(app).post(`/register`).send(body);

    afterEach(() => {
      sinon.restore();
    });

    it("should register a new user", async () => {
      const user = {
        name: "user",
        email: "user1@example.com",
        password: "123456",
      };

      const hashedPassword = "e10adc3949ba59abbe56e057f20f883e";

      sinon.stub(User, "create").returns(Promise.resolve());

      const response = await request(user);

      expect(response).to.have.status(201);
      expect(User.create.firstCall.args[0]).to.deep.equal({
        name: user.name,
        email: user.email,
        password: hashedPassword,
      });
      expect(response.body.message).to.equal("Usuário criado");
    });

    it("should throw an error if email is already registered", async () => {
      const user = {
        name: "user",
        email: "user1@example.com",
        password: "123456",
      };

      sinon.stub(User, "findOne").resolves({ email: user.email });

      const response = await request(user);

      expect(response).to.have.status(409);
      expect(response.body.message).to.equal("Email já registrado");
    });

    it("should throw an error if an error occurs while creating the user", async () => {
      const user = {
        name: "user",
        email: "user1@example.com",
        password: "123456",
      };

      sinon.stub(User, "create").throws(new Error());

      const response = await request(user);

      expect(response).to.have.status(500);
      expect(response).to.have.property("error");
    });

    it("should return an error for invalid name", async () => {
      const user = {
        name: "u",
        email: "user1@example.com",
        password: "123456",
      };

      const response = await request(user);

      expect(response).to.have.status(401);
      expect(response.body.message).to.equal(
        "O nome deve ter pelo menos 2 caracteres"
      );
    });

    it("should return an error for invalid email", async () => {
      const user = {
        name: "user",
        email: "invalidemail",
        password: "123456",
      };

      const response = await request(user);

      expect(response).to.have.status(401);
      expect(response.body.message).to.equal("Insira um email válido");
    });

    it("should return an error for invalid password", async () => {
      const user = {
        name: "user",
        email: "user1@example.com",
        password: "123",
      };

      const response = await request(user);

      expect(response).to.have.status(401);
      expect(response.body.message).to.equal(
        "A senha deve ter de 6 a 12 caracteres"
      );
    });
  });
});
