/* eslint-disable no-undef */
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  validateName,
  validateEmail,
  validatePassword,
} from "../middleware/validateRegister";
import { getItemFromLocalStorage } from "../services/localStorage";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { BsFillKeyFill } from "react-icons/bs";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import "../css/Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [error, setError] = useState("");

  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const recaptchaRef = useRef();

  useEffect(() => {
    const isLoggedIn = getItemFromLocalStorage("isLoggedIn");
    if (isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  const handleRegister = async () => {
    const nameError = validateName(name);
    const passwordError = validatePassword(passwordRef.current.value);
    const emailError = validateEmail(email);
    const existingUser = await axios.post(
      "http://localhost:3001/profile/validate/email",
      { newEmail: email }
    );

    if (nameError) {
      setError(nameError);
    } else if (emailError) {
      setError(emailError);
    } else if (existingUser.data) {
      setError("Este email já está registrado");
    } else if (passwordError) {
      setError(passwordError);
    } else if (confirmPasswordRef.current.value !== passwordRef.current.value) {
      setError("As senhas não são iguais.");
    } else if (!recaptchaValue) {
      setError("Captcha inválido");
    } else if (!agreedToTerms) {
      setError("Você deve concordar com os Termos e Condições.");
    } else {
      try {
        await axios.post("http://localhost:3001/register", {
          name,
          email,
          password: passwordRef.current.value,
          recaptchaValue,
        });

        navigate("/login");
      } catch (error) {
        setError("Erro no registro.");
        setRecaptchaValue(null);
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      }
    }
  };

  const handleInputChange = (event, setValue) => {
    setValue(event.target.value);
  };

  const handleCheckboxChange = () => {
    setAgreedToTerms(!agreedToTerms);
  };

  return (
    <div>
      <Header />
      <div className="register-container">
        <form className="container py-5">
          <h1 className="text-center text-white pt-5 p-4">Cadastre-se</h1>
          <div className="row justify-content-center">
            <div className="col-sm-10 col-md-8 col-lg-6">
              <div className="p-5 rounded-3 mb-1 form-field">
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
                      value={name}
                      onChange={(event) => handleInputChange(event, setName)}
                      required
                    />
                  </div>
                </div>
                <div className="form-text mb-3">
                  Seu nome deve ter no mínimo 2 caracteres.
                </div>
                <div className="input-group mb-2 input-div rounded-1">
                  <span className="input-group-text form-input border-0 text-white p-2 px-3">
                    <AiOutlineMail size={23} />
                  </span>
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control form-input text-white border-0 p-0"
                      id="email"
                      name="email"
                      placeholder="Digite seu email"
                      autoComplete="username"
                      value={email}
                      onChange={(event) => handleInputChange(event, setEmail)}
                      required
                    />
                  </div>
                </div>
                <div className="form-text mb-3">
                  Seu email deve ser um email válido.
                </div>
                <div className="input-group mb-2 input-div rounded-1">
                  <span className="input-group-text form-input border-0 text-white p-2 px-3">
                    <BsFillKeyFill size={23} />
                  </span>
                  <div className="form-floating">
                    <input
                      ref={passwordRef}
                      type="password"
                      className="form-control form-input text-white border-0 p-0"
                      id="password"
                      name="password"
                      placeholder="Digite sua senha"
                      autoComplete="new-password"
                      required
                    />
                  </div>
                </div>
                <div className="form-text mb-3">
                  Sua senha deve ter de 6 a 12 caracteres.
                </div>
                <div className="input-group mb-2 input-div rounded-1">
                  <span className="input-group-text form-input border-0 text-white p-2 px-3">
                    <BsFillKeyFill size={23} />
                  </span>
                  <div className="form-floating">
                    <input
                      ref={confirmPasswordRef}
                      type="password"
                      className="form-control form-input text-white border-0 p-0"
                      id="confirm-password"
                      name="confirm-password"
                      placeholder="Confirme sua senha"
                      autoComplete="new-password"
                      required
                    />
                  </div>
                </div>
                <div className="form-text mb-3">
                  Digite sua senha novamente.
                </div>
                <div className="mb-2 d-flex justify-content-center">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                    onChange={(value) => setRecaptchaValue(value)}
                    data-testid={"recaptcha-register"}
                  />
                </div>
                <div className="form-check mb-3 d-flex align-items-center">
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    id="agreeTerms"
                    checked={agreedToTerms}
                    onChange={handleCheckboxChange}
                  />
                  <label
                    className="form-text form-check-label"
                    htmlFor="agreeTerms"
                  >
                    Eu li e concordo com os <Link to="">Termos de Uso</Link> e a{" "}
                    <Link to="">Política de Privacidade</Link>.
                  </label>
                </div>
                <Button
                  className="btn btn-primary w-100 mb-2"
                  onClick={handleRegister}
                >
                  Cadastrar
                </Button>
                <Link to="/login">
                  <Button className="btn btn-secondary w-100">Entrar</Button>
                </Link>
                {error && (
                  <div className="my-3 alert alert-danger text-center">
                    {error}
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
