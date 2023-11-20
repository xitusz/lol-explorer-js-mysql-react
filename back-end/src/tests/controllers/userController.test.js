/* eslint-disable no-undef */
const { expect } = require("chai");
const sinon = require("sinon");
const userController = require("../../controllers/userController");
const userService = require("../../services/userService");

describe("User Controller", () => {
  const req = {};
  const res = {};
  const next = () => {};

  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns();

  describe("create", () => {
    const user = {
      name: "user",
      email: "user@example.com",
      password: "123456",
    };

    beforeEach(async () => {
      sinon.stub(userService, "create").resolves(user);
    });

    afterEach(async () => {
      sinon.restore();
    });

    it("should create a new user", async () => {
      req.body = {
        name: user.name,
        email: user.email,
        password: user.password,
      };

      await userController.create(req, res, next);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith({ message: user })).to.be.true;
    });
  });

  describe("login", () => {
    beforeEach(async () => {
      sinon.stub(userService, "login").resolves({
        id: 1,
        name: "user",
        email: "user@example.com",
        token: "token",
      });
    });

    afterEach(async () => {
      sinon.restore();
    });

    it("should log in a user and return the user and token when valid credentials", async () => {
      req.body = {
        email: "user@example.com",
        password: "123456",
      };

      await userController.login(req, res, next);

      expect(res.status.calledWith(200)).to.be.true;
      expect(
        res.json.calledWith({
          id: 1,
          name: "user",
          email: "user@example.com",
          token: "token",
        })
      ).to.be.true;
    });
  });
});
