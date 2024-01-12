/* eslint-disable no-undef */
const { expect } = require("chai");
const sinon = require("sinon");
const userService = require("../../services/userService");
const { User } = require("../../database/models");
const { hash } = require("../../utils/hash");
const bcrypt = require("bcrypt");
const axios = require("axios");
const jwt = require("jsonwebtoken");

describe("User Service", () => {
  afterEach(() => {
    sinon.restore();
  });

  describe("verifyRecaptcha", () => {
    it("should verify reCAPTCHA", async () => {
      const recaptchaValue = "validRecaptchaValue";
      const googleResponse = { data: { success: true } };

      const axiosPostStub = sinon.stub(axios, "post").resolves(googleResponse);

      await userService.verifyRecaptcha(recaptchaValue);

      expect(axiosPostStub.calledOnce).to.be.true;
      expect(
        axiosPostStub.calledWith(
          `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaValue}`
        )
      ).to.be.true;
    });

    it("should handle error reCAPTCHA absent", async () => {
      const recaptchaValue = null;

      try {
        await userService.verifyRecaptcha(recaptchaValue);
      } catch (err) {
        expect(err.message).to.equal("reCAPTCHA ausente");
      }
    });

    it("should handle error reCAPTCHA invalid", async () => {
      const recaptchaValue = "invalidRecaptcha";
      const googleResponse = { data: { success: false } };

      const axiosPostStub = sinon.stub(axios, "post").resolves(googleResponse);

      try {
        await userService.verifyRecaptcha(recaptchaValue);
      } catch (err) {
        expect(err.message).to.equal("reCAPTCHA inválido");
        expect(err.statusCode).to.equal(400);
      }

      expect(axiosPostStub.calledOnce).to.be.true;
      expect(
        axiosPostStub.calledWith(
          `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaValue}`
        )
      ).to.be.true;
    });
  });

  describe("create", () => {
    it("should create a new user", async () => {
      const name = "user";
      const email = "user@example.com";
      const password = "123456";
      const recaptchaValue = "validRecaptchaValue";
      const googleResponse = { data: { success: true } };

      sinon.stub(axios, "post").resolves(googleResponse);
      sinon.stub(bcrypt, "hash").resolves("hashedPassword");
      const findOneStub = sinon.stub(User, "findOne").resolves(null);
      const createStub = sinon.stub(User, "create").resolves();

      const hashedPassword = await hash(password);
      const result = await userService.create(
        name,
        email,
        password,
        recaptchaValue
      );

      expect(result).to.equal("Usuário criado");
      expect(findOneStub.calledOnce).to.be.true;
      expect(findOneStub.calledOnceWith({ where: { email } })).to.be.true;
      expect(createStub.calledOnce).to.be.true;
      expect(
        createStub.calledOnceWith({ name, email, password: hashedPassword })
      ).to.be.true;
    });

    it("should handle error user email already registered", async () => {
      const name = "user";
      const email = "user@example.com";
      const password = "123456";
      const recaptchaValue = "validRecaptchaValue";
      const googleResponse = { data: { success: true } };

      sinon.stub(axios, "post").resolves(googleResponse);
      sinon.stub(bcrypt, "hash").resolves("hashedPassword");
      const findOneStub = sinon.stub(User, "findOne").resolves({});

      try {
        await userService.create(name, email, password, recaptchaValue);
      } catch (err) {
        expect(err.message).to.equal(
          "Erro ao criar usuário: Error: Email já registrado"
        );
      }

      expect(findOneStub.calledOnce).to.be.true;
      expect(findOneStub.calledOnceWith({ where: { email } })).to.be.true;
    });

    it("should handle error create a new user", async () => {
      const name = "user";
      const email = "user@example.com";
      const password = "123456";
      const recaptchaValue = "validRecaptchaValue";
      const googleResponse = { data: { success: true } };

      sinon.stub(axios, "post").resolves(googleResponse);
      sinon.stub(bcrypt, "hash").resolves("hashedPassword");
      const findOneStub = sinon.stub(User, "findOne").rejects(new Error());

      try {
        await userService.create(name, email, password, recaptchaValue);
      } catch (err) {
        expect(err.message).to.equal("Erro ao criar usuário: Error");
      }

      expect(findOneStub.calledOnce).to.be.true;
      expect(findOneStub.calledOnceWith({ where: { email } })).to.be.true;
    });
  });

  describe("login", () => {
    it("should log in a user", async () => {
      const email = "user@example.com";
      const password = "123456";
      const recaptchaValue = "validRecaptchaValue";
      const googleResponse = { data: { success: true } };
      const user = {
        dataValues: {
          id: 1,
          name: "user",
          email: "user@example.com",
          password: "hashedPassword",
        },
      };

      sinon.stub(axios, "post").resolves(googleResponse);
      sinon.stub(bcrypt, "compare").resolves(true);
      sinon.stub(jwt, "sign").returns("token");
      const findOneStub = sinon.stub(User, "findOne").resolves(user);

      const result = await userService.login(email, password, recaptchaValue);

      expect(result).to.deep.equal({
        id: 1,
        name: "user",
        email: "user@example.com",
        token: "token",
      });
      expect(findOneStub.calledOnce).to.be.true;
      expect(findOneStub.calledOnceWith({ where: { email } })).to.be.true;
    });

    it("should handle error invalid password", async () => {
      const email = "user@example.com";
      const password = "invalid";
      const recaptchaValue = "validRecaptchaValue";
      const googleResponse = { data: { success: true } };
      const user = {
        dataValues: {
          id: 1,
          name: "user",
          email: "user@example.com",
          password: "hashedPassword",
        },
      };

      sinon.stub(axios, "post").resolves(googleResponse);
      sinon.stub(bcrypt, "compare").resolves(false);
      sinon.stub(jwt, "sign").returns("token");
      const findOneStub = sinon.stub(User, "findOne").resolves(user);

      try {
        await userService.login(email, password, recaptchaValue);
      } catch (err) {
        expect(err.message).to.equal(
          "Erro ao realizar login do usuário: Error: Email ou senha inválida"
        );
      }

      expect(findOneStub.calledOnce).to.be.true;
      expect(findOneStub.calledOnceWith({ where: { email } })).to.be.true;
    });

    it("should handle error invalid email", async () => {
      const email = "invalid";
      const password = "123456";
      const recaptchaValue = "validRecaptchaValue";
      const googleResponse = { data: { success: true } };

      sinon.stub(axios, "post").resolves(googleResponse);
      sinon.stub(bcrypt, "compare").resolves(true);
      sinon.stub(jwt, "sign").returns("token");
      const findOneStub = sinon.stub(User, "findOne").resolves(null);

      try {
        await userService.login(email, password, recaptchaValue);
      } catch (err) {
        expect(err.message).to.equal(
          "Erro ao realizar login do usuário: Error: Email ou senha inválida"
        );
      }

      expect(findOneStub.calledOnce).to.be.true;
      expect(findOneStub.calledOnceWith({ where: { email } })).to.be.true;
    });

    it("should handle error log in a user", async () => {
      const email = "user@example.com";
      const password = "123456";
      const recaptchaValue = "validRecaptchaValue";
      const googleResponse = { data: { success: true } };

      sinon.stub(axios, "post").resolves(googleResponse);
      sinon.stub(bcrypt, "compare").resolves(true);
      sinon.stub(jwt, "sign").returns("token");
      const findOneStub = sinon.stub(User, "findOne").rejects(new Error());

      try {
        await userService.login(email, password, recaptchaValue);
      } catch (err) {
        expect(err.message).to.equal(
          "Erro ao realizar login do usuário: Error"
        );
      }

      expect(findOneStub.calledOnce).to.be.true;
      expect(findOneStub.calledOnceWith({ where: { email } })).to.be.true;
    });
  });

  describe("getProfileInfo", () => {
    it("should get profile info", async () => {
      const userId = 1;
      const user = { name: "User", email: "user@example.com" };

      const findOneStub = sinon.stub(User, "findOne").resolves(user);

      const result = await userService.getProfileInfo(userId);

      expect(result).to.deep.equal(user);
      expect(findOneStub.calledOnce).to.be.true;
      expect(
        findOneStub.calledWith({
          where: { id: userId },
          attributes: ["name", "email"],
        })
      ).to.be.true;
    });

    it("should handle error user not found", async () => {
      const userId = 2;

      const findOneStub = sinon.stub(User, "findOne").resolves(null);

      try {
        await userService.getProfileInfo(userId);
      } catch (err) {
        expect(err.message).to.equal(
          "Erro ao buscar usuário: Error: Usuário não encontrado"
        );
      }

      expect(findOneStub.calledOnce).to.be.true;
      expect(
        findOneStub.calledWith({
          where: { id: userId },
          attributes: ["name", "email"],
        })
      ).to.be.true;
    });

    it("should handle error get profile info", async () => {
      const userId = 1;

      const findOneStub = sinon.stub(User, "findOne").rejects(new Error());

      try {
        await userService.getProfileInfo(userId);
      } catch (err) {
        expect(err.message).to.equal("Erro ao buscar usuário: Error");
      }

      expect(findOneStub.calledOnce).to.be.true;
      expect(
        findOneStub.calledWith({
          where: { id: userId },
          attributes: ["name", "email"],
        })
      ).to.be.true;
    });
  });

  describe("updateName", () => {
    it("should update user name", async () => {
      const userId = 1;
      const newName = "New Name";

      const updateStub = sinon.stub(User, "update").resolves();

      const result = await userService.updateName(userId, newName);

      expect(result).to.equal("Nome atualizado com sucesso!");
      expect(updateStub.calledOnce).to.be.true;
      expect(
        updateStub.calledWith({ name: newName }, { where: { id: userId } })
      ).to.be.true;
    });

    it("should handle error update user name", async () => {
      const userId = 1;
      const newName = "New Name";

      const updateStub = sinon.stub(User, "update").rejects(new Error());

      try {
        await userService.updateName(userId, newName);
      } catch (err) {
        expect(err.message).to.equal("Erro ao atualizar nome: Error");
      }

      expect(updateStub.calledOnce).to.be.true;
      expect(
        updateStub.calledWith({ name: newName }, { where: { id: userId } })
      ).to.be.true;
    });
  });

  describe("updateEmail", () => {
    it("should update user email", async () => {
      const userId = 1;
      const newEmail = "user2@example.com";

      const updateStub = sinon.stub(User, "update").resolves();

      const result = await userService.updateEmail(userId, newEmail);

      expect(result).to.equal("Email atualizado com sucesso!");
      expect(updateStub.calledOnce).to.be.true;
      expect(
        updateStub.calledWith({ email: newEmail }, { where: { id: userId } })
      ).to.be.true;
    });

    it("should handle error update user email", async () => {
      const userId = 1;
      const newEmail = "user2@example.com";

      const updateStub = sinon.stub(User, "update").rejects(new Error());

      try {
        await userService.updateEmail(userId, newEmail);
      } catch (err) {
        expect(err.message).to.equal("Erro ao atualizar email: Error");
      }

      expect(updateStub.calledOnce).to.be.true;
      expect(
        updateStub.calledWith({ email: newEmail }, { where: { id: userId } })
      ).to.be.true;
    });
  });

  describe("updatePassword", () => {
    it("should update user password", async () => {
      const userId = 1;
      const newPassword = "123456";

      sinon.stub(bcrypt, "hash").resolves("hashedPassword");
      const updateStub = sinon.stub(User, "update").resolves();

      const hashedPassword = await hash(newPassword);
      const result = await userService.updatePassword(userId, newPassword);

      expect(result).to.equal("Senha atualizada com sucesso!");
      expect(updateStub.calledOnce).to.be.true;
      expect(
        updateStub.calledWith(
          { password: hashedPassword },
          { where: { id: userId } }
        )
      ).to.be.true;
    });

    it("should handle error update user password", async () => {
      const userId = 1;
      const newPassword = "123456";

      sinon.stub(bcrypt, "hash").resolves("hashedPassword");
      const updateStub = sinon.stub(User, "update").rejects(new Error());

      const hashedPassword = await hash(newPassword);

      try {
        await userService.updatePassword(userId, newPassword);
      } catch (err) {
        expect(err.message).to.equal("Erro ao atualizar senha: Error");
      }

      expect(updateStub.calledOnce).to.be.true;
      expect(
        updateStub.calledWith(
          { password: hashedPassword },
          { where: { id: userId } }
        )
      ).to.be.true;
    });
  });

  describe("deleteUser", () => {
    it("should delete a user", async () => {
      const userId = 1;

      const findOneStub = sinon.stub(User, "findOne").resolves({ id: userId });
      const destroyStub = sinon.stub(User, "destroy").resolves();

      const result = await userService.deleteUser(userId);

      expect(result).to.equal("Usuário excluído com sucesso!");
      expect(findOneStub.calledOnce).to.be.true;
      expect(
        findOneStub.calledWith({
          where: { id: userId },
        })
      ).to.be.true;
      expect(destroyStub.calledOnce).to.be.true;
      expect(
        destroyStub.calledWith({
          where: { id: userId },
        })
      ).to.be.true;
    });

    it("should handle error user not found", async () => {
      const userId = 2;

      const findOneStub = sinon.stub(User, "findOne").resolves(null);

      try {
        await userService.deleteUser(userId);
      } catch (err) {
        expect(err.message).to.equal(
          "Erro ao deletar usuário: Error: Usuário não encontrado"
        );
      }

      expect(findOneStub.calledOnce).to.be.true;
      expect(
        findOneStub.calledWith({
          where: { id: userId },
        })
      ).to.be.true;
    });

    it("should handle error delete a user", async () => {
      const userId = 1;

      const findOneStub = sinon.stub(User, "findOne").resolves({ id: userId });
      const destroyStub = sinon.stub(User, "destroy").resolves();

      try {
        await userService.deleteUser(userId);
      } catch (err) {
        expect(err.message).to.equal("Erro ao deletar usuário: Error");
      }

      expect(findOneStub.calledOnce).to.be.true;
      expect(
        findOneStub.calledWith({
          where: { id: userId },
        })
      ).to.be.true;
      expect(destroyStub.calledOnce).to.be.true;
      expect(
        destroyStub.calledWith({
          where: { id: userId },
        })
      ).to.be.true;
    });
  });

  describe("validateEmail", () => {
    it("should validate user email true", async () => {
      const newEmail = "user2@example.com";

      const findOneStub = sinon.stub(User, "findOne").resolves(true);

      const result = await userService.validateEmail(newEmail);

      expect(result).to.equal(true);
      expect(findOneStub.calledOnce).to.be.true;
      expect(
        findOneStub.calledWith({
          where: { email: newEmail },
        })
      ).to.be.true;
    });

    it("should validate user email false", async () => {
      const newEmail = "user2@example.com";

      const findOneStub = sinon.stub(User, "findOne").resolves(false);

      const result = await userService.validateEmail(newEmail);

      expect(result).to.equal(false);
      expect(findOneStub.calledOnce).to.be.true;
      expect(
        findOneStub.calledWith({
          where: { email: newEmail },
        })
      ).to.be.true;
    });

    it("should handle error validate user email", async () => {
      const newEmail = "user2@example.com";

      const findOneStub = sinon.stub(User, "findOne").rejects(new Error());

      try {
        await userService.validateEmail(newEmail);
      } catch (err) {
        expect(err.message).to.equal("Erro ao validar email: Error");
      }

      expect(findOneStub.calledOnce).to.be.true;
      expect(
        findOneStub.calledWith({
          where: { email: newEmail },
        })
      ).to.be.true;
    });
  });
});
