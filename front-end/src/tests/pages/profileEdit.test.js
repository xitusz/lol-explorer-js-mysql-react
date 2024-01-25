/* eslint-disable no-undef */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProfileEdit from "../../pages/ProfileEdit";
import axios from "axios";

jest.mock("../../context/AuthContext", () => ({
  useAuth: () => ({
    setUserToken: jest.fn(),
  }),
}));

describe("Profile Edit page", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <ProfileEdit />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    localStorage.clear();
  });

  it("should render the title correctly", () => {
    expect(
      screen.getByRole("heading", { name: /Meus Dados/i })
    ).toBeInTheDocument();
  });

  it("should render the card correctly", () => {
    const inputName = screen.getByTestId("input-name");
    const inputEmail = screen.getByTestId("input-email");
    const inputPassword = screen.getByTestId("input-password");
    const settingIconName = screen.getByTestId("setting-icon-name");
    const settingIconEmail = screen.getByTestId("setting-icon-email");
    const settingIconPassword = screen.getByTestId("setting-icon-password");
    const deleteButton = screen.getByTestId("delete-button");
    const saveButton = screen.getByTestId("save-button");

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(settingIconName).toBeInTheDocument();
    expect(settingIconEmail).toBeInTheDocument();
    expect(settingIconPassword).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  });

  // it("should render the user info in card correctly", () => {});

  it("should render the input edit name when setting icon name is clicked", () => {
    const settingIconName = screen.getByTestId("setting-icon-name");

    fireEvent.click(settingIconName);

    expect(
      screen.getByText(/Seu nome deve ter no mínimo 2 caracteres./i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Digite seu novo nome/i)
    ).toBeInTheDocument();
    expect(screen.getByTestId("save-name-button")).toBeInTheDocument();
  });

  // it("should save the value input name when 'save' button is clicked", () => {});

  it("should throw an error when new name is invalid", async () => {
    const settingIconName = screen.getByTestId("setting-icon-name");

    fireEvent.click(settingIconName);

    const nameInput = screen.getByPlaceholderText(/Digite seu novo nome/i);
    const saveButton = screen.getByTestId("save-name-button");

    fireEvent.change(nameInput, { target: { value: "a" } });
    fireEvent.click(saveButton);

    expect(nameInput.value).toBe("a");
    await waitFor(() => {
      expect(
        screen.getByText(/O nome deve ter pelo menos 2 caracteres/i)
      ).toBeInTheDocument();
    });
  });

  it("should render the input edit email when setting icon email is clicked", () => {
    const settingIconEmail = screen.getByTestId("setting-icon-email");

    fireEvent.click(settingIconEmail);

    expect(
      screen.getByText(/Seu email deve ser um email válido./i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Digite seu novo email/i)
    ).toBeInTheDocument();
    expect(screen.getByTestId("save-email-button")).toBeInTheDocument();
  });

  // it("should save the value input email when 'save' button is clicked", () => {});

  it("should throw an error when new email is invalid", async () => {
    const settingIconEmail = screen.getByTestId("setting-icon-email");

    fireEvent.click(settingIconEmail);

    const emailInput = screen.getByPlaceholderText(/Digite seu novo email/i);
    const saveButton = screen.getByTestId("save-email-button");

    fireEvent.change(emailInput, { target: { value: "email" } });
    fireEvent.click(saveButton);

    expect(emailInput.value).toBe("email");
    await waitFor(() => {
      expect(screen.getByText(/Insira um email válido/i)).toBeInTheDocument();
    });
  });

  it("should throw an error when new email is already registered", async () => {
    const settingIconEmail = screen.getByTestId("setting-icon-email");

    fireEvent.click(settingIconEmail);

    jest.spyOn(axios, "post").mockResolvedValue({ data: true });

    const emailInput = screen.getByPlaceholderText(/Digite seu novo email/i);
    const saveButton = screen.getByTestId("save-email-button");

    fireEvent.change(emailInput, { target: { value: "email@example.com" } });
    fireEvent.click(saveButton);

    expect(emailInput.value).toBe("email@example.com");
    await waitFor(() => {
      expect(
        screen.getByText(/Este email já está registrado/i)
      ).toBeInTheDocument();
    });
  });

  it("should render the input edit password when setting icon password is clicked", () => {
    const settingIconPassword = screen.getByTestId("setting-icon-password");

    fireEvent.click(settingIconPassword);

    expect(
      screen.getByText(/Sua senha deve ter de 6 a 12 caracteres./i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Digite sua senha novamente./i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Digite sua nova senha/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Confirme sua nova senha/i)
    ).toBeInTheDocument();
    expect(screen.getByTestId("save-password-button")).toBeInTheDocument();
  });

  // it("should save the value input password when 'save' button is clicked", () => {});

  it("should throw an error when new password length is invalid", async () => {
    const settingIconPassword = screen.getByTestId("setting-icon-password");

    fireEvent.click(settingIconPassword);

    const passwordInput = screen.getByPlaceholderText(/Digite sua nova senha/i);
    const confirmPasswordInput = screen.getByPlaceholderText(
      /Confirme sua nova senha/i
    );
    const saveButton = screen.getByTestId("save-password-button");

    fireEvent.change(passwordInput, { target: { value: "pass" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "pass" } });
    fireEvent.click(saveButton);

    expect(passwordInput.value).toBe("pass");
    expect(confirmPasswordInput.value).toBe("pass");

    await waitFor(() => {
      /*expect(
        screen.getByText(/A senha deve ter de 6 a 12 caracteres/i)
      ).toBeInTheDocument();*/
      expect(screen.getByTestId("error-password")).toBeInTheDocument();
    });
  });

  it("should throw an error when confirmPassword is invalid", async () => {
    const settingIconPassword = screen.getByTestId("setting-icon-password");

    fireEvent.click(settingIconPassword);

    const passwordInput = screen.getByPlaceholderText(/Digite sua nova senha/i);
    const confirmPasswordInput = screen.getByPlaceholderText(
      /Confirme sua nova senha/i
    );
    const saveButton = screen.getByTestId("save-password-button");

    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(saveButton);

    expect(passwordInput.value).toBe("password");
    expect(confirmPasswordInput.value).toBe("wrongpassword");

    await waitFor(() => {
      /*expect(
        screen.getByText(/As senhas não são iguais./i)
      ).toBeInTheDocument();*/
      expect(screen.getByTestId("error-password")).toBeInTheDocument();
    });
  });

  // it("should delete account when 'delete' button is clicked", () => {});

  // it("should save new infos when 'save' button is clicked", () => {});
});
