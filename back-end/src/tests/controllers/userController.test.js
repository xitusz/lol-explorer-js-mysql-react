/* eslint-disable no-undef */
const { expect } = require("chai");
const sinon = require("sinon");
const userController = require("../../controllers/userController");
const userService = require("../../services/userService");

describe("User Controller", () => {
  createReqResNext = () => {
    const req = { user: { id: 1 } };
    const res = {};
    const next = sinon.spy();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    return { req, res, next };
  };

  afterEach(() => {
    sinon.restore();
  });

  describe("create", () => {
    it("should create a new user", async () => {
      const { req, res, next } = createReqResNext();

      req.body = {
        name: "user",
        email: "user@example.com",
        password: "123456",
      };

      const createStub = sinon
        .stub(userService, "create")
        .resolves("Usuário criado");

      await userController.create(req, res, next);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith({ message: "Usuário criado" })).to.be.true;
      expect(next.notCalled).to.be.true;
      expect(createStub.calledOnce).to.be.true;
    });

    it("should handle error create a new user", async () => {
      const { req, res, next } = createReqResNext();

      req.body = {
        name: "user",
        email: "user@example.com",
        password: "123456",
      };

      sinon
        .stub(userService, "create")
        .rejects(new Error("Erro ao criar usuário"));

      await userController.create(req, res, next);

      expect(next.calledOnce).to.be.true;
      expect(
        next.calledWithMatch(
          sinon.match
            .instanceOf(Error)
            .and(sinon.match.has("message", "Erro ao criar usuário"))
        )
      ).to.be.true;
    });
  });
});
