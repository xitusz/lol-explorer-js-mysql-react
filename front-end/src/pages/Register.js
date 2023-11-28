import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import {
  validateName,
  validateEmail,
  validatePassword,
} from "../middleware/validateRegister";
import { getItemFromLocalStorage } from "../services/localStorage";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { BsFillKeyFill } from "react-icons/bs";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const isLoggedIn = getItemFromLocalStorage("isLoggedIn");
    if (isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  const handleRegister = async () => {
    const nameError = validateName(name);
    const passwordError = validatePassword(password);
    const emailError = validateEmail(email);

    if (nameError) {
      setError(nameError);
    } else if (emailError) {
      setError(emailError);
    } else if (passwordError) {
      setError(passwordError);
    } else if (confirmPassword != password) {
      setError("As senhas não são iguais.");
    } else if (!agreedToTerms) {
      setError("Você deve concordar com os Termos e Condições.");
    } else {
      try {
        await axios.post("http://localhost:3001/register", {
          name,
          email,
          password,
        });

        navigate("/login");
      } catch (error) {
        setError("Erro no registro.");
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
      <form className="container py-5">
        <h1 className="text-center text-white pt-5 p-4">Cadastre-se</h1>
        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-10 col-lg-8">
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
                    type="password"
                    className="form-control form-input text-white border-0 p-0"
                    id="password"
                    name="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(event) => handleInputChange(event, setPassword)}
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
                    type="password"
                    className="form-control form-input text-white border-0 p-0"
                    id="password"
                    name="password"
                    placeholder="Confirme sua senha"
                    value={confirmPassword}
                    onChange={(event) =>
                      handleInputChange(event, setConfirmPassword)
                    }
                    required
                  />
                </div>
              </div>
              <div className="form-text mb-3">Digite sua senha novamente.</div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="agreeTerms"
                  checked={agreedToTerms}
                  onChange={handleCheckboxChange}
                />
                <label className="form-text mb-3 form-check-label" htmlFor="">
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
  );
};

export default Register;
