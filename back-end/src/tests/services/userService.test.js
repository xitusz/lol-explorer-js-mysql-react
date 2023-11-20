/* eslint-disable no-undef */
const { expect } = require("chai");
const sinon = require("sinon");
const userService = require("../../services/userService");
const { User } = require("../../database/models");
const { omit } = require("lodash");

describe("User Service", () => {
  describe("create", () => {
    beforeEach(async () => {
      sinon.stub(User, "create").resolves(null);
    });

    afterEach(() => {
      sinon.restore();
    });

    it("should create a new user", async () => {
      const name = "user";
      const email = "user@example.com";
      const password = "123456";
      const hashedPassword = "e10adc3949ba59abbe56e057f20f883e";

      const result = await userService.create(name, email, password);

      expect(User.create.called).to.be.true;
      expect(User.create.firstCall.args[0]).to.deep.equal({
        name,
        email,
        password: hashedPassword,
      });
      expect(result).to.equal("Usuário criado");
    });

    it("should throw an error if email is already registered", async () => {
      const name = "user";
      const email = "user@example.com";
      const password = "123456";

      sinon.stub(User, "findOne").resolves({ email });

      try {
        await userService.create(name, email, password);
      } catch (err) {
        expect(err.statusCode).to.equal(409);
        expect(err.message).to.equal("Email já registrado");
      }
    });
  });

  describe("login", () => {
    beforeEach(async () => {
      sinon.stub(User, "findOne").resolves({
        email: "user@example.com",
        password: "e10adc3949ba59abbe56e057f20f883e",
        dataValues: {
          id: 1,
          name: "user",
          email: "user@example.com",
        },
      });
    });

    afterEach(() => {
      sinon.restore();
    });

    it("should log in a user and return the user and token when valid credentials", async () => {
      const email = "user@example.com";
      const password = "123456";

      const result = await userService.login(email, password);
      const omitToken = omit(result, "token");

      expect(User.findOne.called).to.be.true;
      expect(User.findOne.firstCall.args[0]).to.deep.equal({
        where: { email },
      });
      expect(result).to.have.property("token").to.be.a("string");
      expect(omitToken).to.deep.equal({
        id: 1,
        name: "user",
        email: "user@example.com",
      });
    });

    it("should throw an error for invalid email", async () => {
      const email = "invalid@example.com";
      const password = "123456";

      sinon.restore();
      sinon.stub(User, "findOne").resolves(null);

      try {
        await userService.login(email, password);
      } catch (err) {
        expect(err.statusCode).to.equal(404);
        expect(err.message).to.equal("Email ou senha inválida");
      }
    });

    it("should throw an error for invalid password", async () => {
      const email = "user@example.com";
      const password = "wrongPassword";

      try {
        await userService.login(email, password);
      } catch (err) {
        expect(err.statusCode).to.equal(404);
        expect(err.message).to.equal("Email ou senha inválida");
      }
    });
  });
});
