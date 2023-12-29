import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { validateName, validateEmail } from "../middleware/validateRegister";
import { AiOutlineMail, AiOutlineUser, AiOutlineSetting } from "react-icons/ai";
import { getItemFromLocalStorage } from "../services/localStorage";
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
  const [error, setError] = useState("");

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
      setError(nameError);
    } else {
      setNewName(tempName);
      setError("");
      setTempName("");
      setShowEditName(false);
    }
  };

  const handleSaveEmail = () => {
    const emailError = validateEmail(tempEmail);

    if (emailError) {
      setError(emailError);
    } else {
      setNewEmail(tempEmail);
      setError("");
      setTempEmail("");
      setShowEditEmail(false);
    }
  };

  const handleButtonClick = async () => {
    if (userToken) {
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

      if (newEmail) {
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

      loadUserProfile();
    }
  };

  return (
    <div>
      <Header />
      <div className="py-5">
        <h1 className="text-center text-white py-5">Meus Dados</h1>
        <div className="row justify-content-center">
          <div className="col-sm-10 col-md-8 col-lg-6">
            <div className="p-5 rounded-3 mb-1 form-field">
              <div>
                <div className="d-flex align-items-center">
                  <div className="input-group mb-2 input-div rounded-1">
                    <span className="input-group-text form-input border-0 text-white p-2 px-3">
                      <AiOutlineUser size={23} />
                    </span>
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control form-input text-white border-0 p-0"
                        id="name"
                        name="name"
                        placeholder="Nome"
                        value={profileInfo.name}
                        readOnly
                      />
                    </div>
                  </div>
                  <div>
                    <AiOutlineSetting
                      size={35}
                      className="text-white icon"
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
                            placeholder="Nome"
                            value={tempName}
                            onChange={(event) =>
                              handleInputChange(event, setTempName)
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="form-text mb-3">
                        Seu nome deve ter no mínimo 2 caracteres.
                      </div>
                      <div className="text-center">
                        <Button
                          className="btn btn-primary text-white"
                          onClick={handleSaveName}
                        >
                          Salvar
                        </Button>
                      </div>
                      {error && (
                        <div className="my-3 alert alert-danger text-center">
                          {error}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div className="d-flex align-items-center">
                  <div className="input-group mb-2 input-div rounded-1">
                    <span className="input-group-text form-input border-0 text-white p-2 px-3">
                      <AiOutlineMail size={23} />
                    </span>
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control form-input text-white border-0 p-0"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={profileInfo.email}
                        readOnly
                      />
                    </div>
                  </div>
                  <div>
                    <AiOutlineSetting
                      size={35}
                      className="text-white icon"
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
                            placeholder="Email"
                            value={tempEmail}
                            onChange={(event) =>
                              handleInputChange(event, setTempEmail)
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="form-text mb-3">
                        Seu email deve ser um email válido.
                      </div>
                      <div className="text-center">
                        <Button
                          className="btn btn-primary text-white"
                          onClick={handleSaveEmail}
                        >
                          Salvar
                        </Button>
                      </div>
                      {error && (
                        <div className="my-3 alert alert-danger text-center">
                          {error}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-evenly mt-5">
                <div className="text-center">
                  <Button className="btn btn-primary text-white">
                    Excluir Conta
                  </Button>
                </div>
                <div className="text-center">
                  <Button
                    className="btn btn-primary text-white"
                    onClick={handleButtonClick}
                  >
                    Salvar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileEdit;
