/* eslint-disable no-undef */
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const app = require("../../../index");
const userService = require("../../services/userService");
const jwt = require("jsonwebtoken");

const { expect } = chai;
chai.use(chaiHttp);

describe("User Router", () => {
  afterEach(() => {
    sinon.restore();
  });

  describe("GET /", () => {
    it("should get profile info", async () => {
      const user = { id: 1, name: "User", email: "user@example.com" };
      const token = "token";

      const verifyStub = sinon.stub(jwt, "verify").returns(user);
      const getProfileInfoStub = sinon
        .stub(userService, "getProfileInfo")
        .resolves(user);

      const response = await chai
        .request(app)
        .get("/profile")
        .set("Authorization", `Bearer ${token}`);

      expect(response).to.have.status(200);
      expect(response.body).to.deep.equal(user);
      expect(verifyStub.calledOnce).to.be.true;
      expect(getProfileInfoStub.calledOnce).to.be.true;
    });
  });

  describe("PUT /edit/name", () => {
    it("should update user name", async () => {
      const user = { id: 1, name: "User", email: "user@example.com" };
      const newName = "New Name";
      const token = "token";

      const verifyStub = sinon.stub(jwt, "verify").returns(user);
      const updateNameStub = sinon
        .stub(userService, "updateName")
        .resolves("Nome atualizado com sucesso!");

      const response = await chai
        .request(app)
        .put("/profile/edit/name")
        .set("Authorization", `Bearer ${token}`)
        .send(newName);

      expect(response).to.have.status(200);
      expect(response.body.message).to.equal("Nome atualizado com sucesso!");
      expect(verifyStub.calledOnce).to.be.true;
      expect(updateNameStub.calledOnce).to.be.true;
    });
  });

  describe("PUT /edit/email", () => {
    it("should update user email", async () => {
      const user = { id: 1, name: "User", email: "user@example.com" };
      const newEmail = "user2@example.com";
      const token = "token";

      const verifyStub = sinon.stub(jwt, "verify").returns(user);
      const updateEmailStub = sinon
        .stub(userService, "updateEmail")
        .resolves("Email atualizado com sucesso!");

      const response = await chai
        .request(app)
        .put("/profile/edit/email")
        .set("Authorization", `Bearer ${token}`)
        .send(newEmail);

      expect(response).to.have.status(200);
      expect(response.body.message).to.equal("Email atualizado com sucesso!");
      expect(verifyStub.calledOnce).to.be.true;
      expect(updateEmailStub.calledOnce).to.be.true;
    });
  });
});
