import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import {
  validateName,
  validateEmail,
  validatePassword,
} from "../middleware/validateRegister";
import { AiOutlineMail, AiOutlineUser, AiOutlineSetting } from "react-icons/ai";
import { BsFillKeyFill } from "react-icons/bs";
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
} from "../services/localStorage";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { userToken } = useAuth();

  const [profileInfo, setProfileInfo] = useState({
    name: "",
    email: "",
  });
  const [newName, setNewName] = useState("");
  const [tempName, setTempName] = useState("");
  const [showEditName, setShowEditName] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [showEditEmail, setShowEditEmail] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [tempPassword, setTempPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [errorName, setNameError] = useState("");
  const [errorEmail, setEmailError] = useState("");
  const [errorPassword, setPasswordError] = useState("");

  const loadUserProfile = async () => {
    if (userToken) {
      const response = await axios.get("http://localhost:3001/profile", {
        headers: {
          Authorization: userToken,
        },
      });

      setProfileInfo({
        name: response.data.name,
        email: response.data.email,
      });
    }
  };

  useEffect(() => {
    const isLoggedIn = getItemFromLocalStorage("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/");
    }

    loadUserProfile();
  }, [navigate, userToken]);

  const handleInputChange = (event, setValue) => {
    setValue(event.target.value);
  };

  const handleSaveName = () => {
    const nameError = validateName(tempName);

    if (nameError) {
      setNameError(nameError);
    } else {
      setNewName(tempName);
      setProfileInfo({ name: tempName, email: profileInfo.email });
      setNameError("");
      setShowEditName(false);
    }
  };

  const handleSaveEmail = async () => {
    const emailError = validateEmail(tempEmail);

    if (emailError) {
      setEmailError(emailError);
    } else {
      if (tempEmail !== profileInfo.email) {
        const existingUser = await axios.post(
          "http://localhost:3001/profile/validate/email",
          { newEmail: tempEmail },
          {
            headers: {
              Authorization: userToken,
            },
          }
        );

        if (existingUser.data) {
          setEmailError("Este email já está registrado");
        } else {
          setNewEmail(tempEmail);
          setProfileInfo({ name: profileInfo.name, email: tempEmail });
          setEmailError("");
          setShowEditEmail(false);
        }
      } else if (tempEmail === profileInfo.email) {
        setNewEmail(tempEmail);
        setProfileInfo({ name: profileInfo.name, email: tempEmail });
        setEmailError("");
        setShowEditEmail(false);
      }
    }
  };

  const handleSavePassword = () => {
    const passwordError = validatePassword(tempPassword);

    if (passwordError) {
      setPasswordError(passwordError);
    } else if (confirmPassword != tempPassword) {
      setPasswordError("As senhas não são iguais.");
    } else {
      setPasswordError("");
      setNewPassword(confirmPassword);
      setConfirmPassword("");
      setTempPassword("");
      setShowEditPassword(false);
    }
  };

  const handleSaveButtonClick = async () => {
    const confirmSave = window.confirm(
      "Tem certeza que deseja salvar os novos dados?"
    );

    if (confirmSave && userToken) {
      if (newName) {
        await axios.put(
          "http://localhost:3001/profile/edit/name",
          { newName: newName },
          {
            headers: {
              Authorization: userToken,
            },
          }
        );
      }

      if (confirmSave && newEmail) {
        await axios.put(
          "http://localhost:3001/profile/edit/email",
          { newEmail: newEmail },
          {
            headers: {
              Authorization: userToken,
            },
          }
        );
      }

      if (confirmSave && newPassword) {
        await axios.put(
          "http://localhost:3001/profile/edit/password",
          { newPassword: newPassword },
          {
            headers: {
              Authorization: userToken,
            },
          }
        );
      }

      navigate("/profile");
    }
  };

  const handleDeleteButtonClick = async () => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir sua conta? Esta ação é irreversível."
    );

    if (confirmDelete && userToken) {
      await axios.delete("http://localhost:3001/profile", {
        headers: {
          Authorization: userToken,
        },
      });

      removeItemFromLocalStorage("token");
      removeItemFromLocalStorage("isLoggedIn");
      navigate("/");
    }
  };

  return (
    <div>
      <Header />
      <form className="container py-5">
        <h1 className="text-center text-white py-5">Meus Dados</h1>
        <div className="row justify-content-center">
          <div className="col-sm-10 col-md-8 col-lg-6">
            <div className="p-5 rounded-3 mb-4 form-field">
              <div className="mb-3">
                <div className="d-flex align-items-center">
                  <div
                    className={`input-group mb-2 input-div rounded-1 ${
                      showEditName ? "active-edit" : ""
                    }`}
                  >
                    <span
                      className={`input-group-text form-input border-0 text-white p-2 px-3 ${
                        showEditName ? "active-edit" : ""
                      }`}
                    >
                      <AiOutlineUser size={23} />
                    </span>
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control form-input text-white border-0 p-0"
                        id="name"
                        name="name"
                        value={profileInfo.name}
                        readOnly
                      />
                    </div>
                  </div>
                  <div>
                    <AiOutlineSetting
                      size={35}
                      className={`text-white icon icon-setting ${
                        showEditName ? "active-icon" : ""
                      }`}
                      onClick={() => setShowEditName(!showEditName)}
                    />
                  </div>
                </div>
                <div>
                  {showEditName && (
                    <div>
                      <div className="input-group my-2 input-div rounded-1">
                        <span className="input-group-text form-input border-0 text-white p-2 px-3">
                          <AiOutlineUser size={23} />
                        </span>
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control form-input text-white border-0 p-0"
                            id="name"
                            name="name"
                            placeholder="Digite seu novo nome"
                            value={tempName}
                            onChange={(event) =>
                              handleInputChange(event, setTempName)
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="form-text mb-2">
                        Seu nome deve ter no mínimo 2 caracteres.
                      </div>
                      <div className="text-center">
                        <Button
                          className="btn btn-primary text-white mb-2"
                          onClick={handleSaveName}
                        >
                          Salvar
                        </Button>
                      </div>
                      {errorName && (
                        <div className="mb-3 alert alert-danger text-center">
                          {errorName}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex align-items-center">
                  <div
                    className={`input-group mb-2 input-div rounded-1 ${
                      showEditEmail ? "active-edit" : ""
                    }`}
                  >
                    <span
                      className={`input-group-text form-input border-0 text-white p-2 px-3 ${
                        showEditEmail ? "active-edit" : ""
                      }`}
                    >
                      <AiOutlineMail size={23} />
                    </span>
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control form-input text-white border-0 p-0"
                        id="email"
                        name="email"
                        value={profileInfo.email}
                        readOnly
                      />
                    </div>
                  </div>
                  <div>
                    <AiOutlineSetting
                      size={35}
                      className={`text-white icon icon-setting ${
                        showEditEmail ? "active-icon" : ""
                      }`}
                      onClick={() => setShowEditEmail(!showEditEmail)}
                    />
                  </div>
                </div>
                <div>
                  {showEditEmail && (
                    <div>
                      <div className="input-group my-2 input-div rounded-1">
                        <span className="input-group-text form-input border-0 text-white p-2 px-3">
                          <AiOutlineMail size={23} />
                        </span>
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control form-input text-white border-0 p-0"
                            id="email"
                            name="email"
                            placeholder="Digite seu novo email"
                            value={tempEmail}
                            onChange={(event) =>
                              handleInputChange(event, setTempEmail)
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="form-text mb-2">
                        Seu email deve ser um email válido.
                      </div>
                      <div className="text-center">
                        <Button
                          className="btn btn-primary text-white mb-2"
                          onClick={handleSaveEmail}
                        >
                          Salvar
                        </Button>
                      </div>
                      {errorEmail && (
                        <div className="mb-3 alert alert-danger text-center">
                          {errorEmail}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex align-items-center">
                  <div
                    className={`input-group mb-2 input-div rounded-1 ${
                      showEditPassword ? "active-edit" : ""
                    }`}
                  >
                    <span
                      className={`input-group-text form-input border-0 text-white p-2 px-3 ${
                        showEditPassword ? "active-edit" : ""
                      }`}
                    >
                      <BsFillKeyFill size={23} />
                    </span>
                    <div className="form-floating">
                      <input
                        type="password"
                        className="form-control form-input text-white border-0 p-0"
                        id="password"
                        name="password"
                        value="*********"
                        readOnly
                      />
                    </div>
                  </div>
                  <div>
                    <AiOutlineSetting
                      size={35}
                      className={`text-white icon icon-setting ${
                        showEditPassword ? "active-icon" : ""
                      }`}
                      onClick={() => setShowEditPassword(!showEditPassword)}
                    />
                  </div>
                </div>
                <div>
                  {showEditPassword && (
                    <div>
                      <div className="input-group my-2 input-div rounded-1">
                        <span className="input-group-text form-input border-0 text-white p-2 px-3">
                          <BsFillKeyFill size={23} />
                        </span>
                        <div className="form-floating">
                          <input
                            type="password"
                            className="form-control form-input text-white border-0 p-0"
                            id="tempPassword"
                            name="tempPassword"
                            placeholder="Digite sua nova senha"
                            value={tempPassword}
                            onChange={(event) =>
                              handleInputChange(event, setTempPassword)
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="form-text mb-2">
                        Sua senha deve ter de 6 a 12 caracteres.
                      </div>
                      <div className="input-group my-2 input-div rounded-1">
                        <span className="input-group-text form-input border-0 text-white p-2 px-3">
                          <BsFillKeyFill size={23} />
                        </span>
                        <div className="form-floating">
                          <input
                            type="password"
                            className="form-control form-input text-white border-0 p-0"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirme sua nova senha"
                            value={confirmPassword}
                            onChange={(event) =>
                              handleInputChange(event, setConfirmPassword)
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="form-text mb-2">
                        Digite sua senha novamente.
                      </div>
                      <div className="text-center">
                        <Button
                          className="btn btn-primary text-white mb-2"
                          onClick={handleSavePassword}
                        >
                          Salvar
                        </Button>
                      </div>
                      {errorPassword && (
                        <div className="mb-3 alert alert-danger text-center">
                          {errorPassword}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-evenly mt-5">
                <div className="mt-5">
                  <Button
                    className="btn btn-primary text-white mt-5"
                    onClick={handleDeleteButtonClick}
                  >
                    Excluir Conta
                  </Button>
                </div>
                <div className="mt-5">
                  <Button
                    className="btn btn-primary text-white mt-5"
                    onClick={handleSaveButtonClick}
                  >
                    Salvar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default ProfileEdit;
