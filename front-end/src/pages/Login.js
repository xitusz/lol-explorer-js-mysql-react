/* eslint-disable no-undef */
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  setItemToLocalStorage,
  getItemFromLocalStorage,
} from "../services/localStorage";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillKeyFill } from "react-icons/bs";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { useAuth } from "../context/AuthContext";
import "../css/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { setUserToken } = useAuth();

  const [email, setEmail] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [error, setError] = useState("");

  const passwordRef = useRef(null);
  const recaptchaRef = useRef();

  useEffect(() => {
    const isLoggedIn = getItemFromLocalStorage("isLoggedIn");
    if (isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  const createFavorites = async (token) => {
    if (token) {
      await axios.post(
        "http://localhost:3001/favorites/create",
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
    }
  };

  const handleLogin = async () => {
    if (!recaptchaValue) {
      setError("Captcha inválido");
    } else {
      try {
        const response = await axios.post("http://localhost:3001/login", {
          email,
          password: passwordRef.current.value,
          recaptchaValue,
        });

        const { token } = response.data;

        setUserToken(token);
        setItemToLocalStorage("isLoggedIn", true);
        setItemToLocalStorage("token", token);
        createFavorites(token);
        navigate("/");
      } catch (error) {
        setError("Email ou senha inválida");
        setRecaptchaValue(null);
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="login-container">
        <form className="container py-5">
          <h1 className="text-center text-white pt-5 p-4">Conectar-se</h1>
          <div className="row justify-content-center">
            <div className="col-sm-10 col-md-8 col-lg-6">
              <div className="p-5 rounded-3 mb-1 form-field">
                <div className="input-group mb-3 input-div rounded-1">
                  <span className="input-group-text form-input border-0 text-white p-2 px-3">
                    <AiOutlineMail size={23} />
                  </span>
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control form-input text-white border-0 p-0"
                      id="email"
                      name="email"
                      placeholder="email@example.com"
                      autoComplete="username"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="input-group mb-3 input-div rounded-1">
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
                      placeholder="*********"
                      autoComplete="current-password"
                      required
                    />
                  </div>
                </div>
                <div className="mb-2 d-flex justify-content-center">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                    onChange={(value) => setRecaptchaValue(value)}
                  />
                </div>
                <Button
                  className="btn btn-primary w-100 mb-2"
                  onClick={handleLogin}
                >
                  Entrar
                </Button>
                <Link to="/register">
                  <Button className="btn btn-secondary w-100">
                    Cadastre-se
                  </Button>
                </Link>
              </div>
              {error && (
                <div className="my-3 alert alert-danger text-center">
                  {error}
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
      <Footer className="fixed-bottom" />
    </div>
  );
};

export default Login;
