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
      expect(getProfileInfoStub.firstCall.args[0]).to.equal(user.id);
    });
  });

  describe("PUT /edit/name", () => {
    it("should update user name", async () => {
      const user = { id: 1, name: "User", email: "user@example.com" };
      const name = "New Name";
      const token = "token";

      const verifyStub = sinon.stub(jwt, "verify").returns(user);
      const updateNameStub = sinon
        .stub(userService, "updateName")
        .resolves("Nome atualizado com sucesso!");

      const response = await chai
        .request(app)
        .put("/profile/edit/name")
        .set("Authorization", `Bearer ${token}`)
        .send({ name });

      expect(response).to.have.status(200);
      expect(response.body.message).to.equal("Nome atualizado com sucesso!");
      expect(verifyStub.calledOnce).to.be.true;
      expect(updateNameStub.calledOnce).to.be.true;
      expect(updateNameStub.firstCall.args[0]).to.equal(user.id, name);
    });
  });

  describe("PUT /edit/email", () => {
    it("should update user email", async () => {
      const user = { id: 1, name: "User", email: "user@example.com" };
      const email = "user2@example.com";
      const token = "token";

      const verifyStub = sinon.stub(jwt, "verify").returns(user);
      const updateEmailStub = sinon
        .stub(userService, "updateEmail")
        .resolves("Email atualizado com sucesso!");

      const response = await chai
        .request(app)
        .put("/profile/edit/email")
        .set("Authorization", `Bearer ${token}`)
        .send({ email });

      expect(response).to.have.status(200);
      expect(response.body.message).to.equal("Email atualizado com sucesso!");
      expect(verifyStub.calledOnce).to.be.true;
      expect(updateEmailStub.calledOnce).to.be.true;
      expect(updateEmailStub.firstCall.args[0]).to.equal(user.id, email);
    });
  });

  describe("PUT /edit/password", () => {
    it("should update user password", async () => {
      const user = { id: 1, name: "User", email: "user@example.com" };
      const password = "123456";
      const token = "token";

      const verifyStub = sinon.stub(jwt, "verify").returns(user);
      const updatePasswordStub = sinon
        .stub(userService, "updatePassword")
        .resolves("Senha atualizada com sucesso!");

      const response = await chai
        .request(app)
        .put("/profile/edit/password")
        .set("Authorization", `Bearer ${token}`)
        .send({ password });

      expect(response).to.have.status(200);
      expect(response.body.message).to.equal("Senha atualizada com sucesso!");
      expect(verifyStub.calledOnce).to.be.true;
      expect(updatePasswordStub.calledOnce).to.be.true;
      expect(updatePasswordStub.firstCall.args[0]).to.equal(user.id, password);
    });
  });

  describe("DELETE /", () => {
    it("should delete a user", async () => {
      const user = { id: 1, name: "User", email: "user@example.com" };
      const token = "token";

      const verifyStub = sinon.stub(jwt, "verify").returns(user);
      const deleteUserStub = sinon
        .stub(userService, "deleteUser")
        .resolves("Usuário excluído com sucesso!");

      const response = await chai
        .request(app)
        .delete("/profile")
        .set("Authorization", `Bearer ${token}`);

      expect(response).to.have.status(200);
      expect(response.body.message).to.equal("Usuário excluído com sucesso!");
      expect(verifyStub.calledOnce).to.be.true;
      expect(deleteUserStub.calledOnce).to.be.true;
      expect(deleteUserStub.firstCall.args[0]).to.equal(user.id);
    });
  });

  describe("POST /validate/email", () => {
    it("should validate user email true", async () => {
      const newEmail = "user1@example.com";

      const validateEmailStub = sinon
        .stub(userService, "validateEmail")
        .resolves(true);

      const response = await chai
        .request(app)
        .post("/profile/validate/email")
        .send({ newEmail });

      expect(response).to.have.status(200);
      expect(response.body).to.equal(true);
      expect(validateEmailStub.calledOnce).to.be.true;
      expect(validateEmailStub.firstCall.args[0]).to.equal(newEmail);
    });
  });
});
