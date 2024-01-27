import React, { useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
} from "../services/localStorage";
import Button from "./Button";
import "../css/Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);
  const { setUserToken } = useAuth();

  const handleExiting = () => {
    setUserToken("");
    removeItemFromLocalStorage("token");
    removeItemFromLocalStorage("isLoggedIn");
    navigate("/login");
  };

  const navigationLinks = [
    { to: "/", text: "Início" },
    { to: "/champion", text: "Personagens" },
    { to: "/region", text: "Regiões" },
  ];

  const renderAuthenticatedLinks = () => {
    return (
      <ul className="navbar-nav">
        <li className="d-flex align-items-center nav-item">
          <NavLink
            className="nav-link p-0 mx-2"
            activeclassname="active"
            to="/profile"
          >
            Perfil
          </NavLink>
        </li>
        <li className="d-flex align-items-center nav-item">
          <Link
            className="nav-link p-0 mx-2"
            onClick={handleExiting}
            to="/login"
          >
            Sair
          </Link>
        </li>
      </ul>
    );
  };

  const renderGuestLinks = () => {
    return (
      <ul className="navbar-nav">
        <li className="d-flex align-items-center nav-item">
          <NavLink
            className="nav-link p-0 mx-2"
            activeclassname="active"
            to="/login"
          >
            Login
          </NavLink>
        </li>
        <li className="d-flex align-items-center nav-item">
          <NavLink
            className="nav-link p-0 mx-2"
            activeclassname="active"
            to="/register"
          >
            Cadastro
          </NavLink>
        </li>
      </ul>
    );
  };

  return (
    <div>
      <nav
        id="navbar"
        className="navbar navbar-expand-md navbar-dark fixed-top"
      >
        <div className="container py-2">
          <div className="m-auto">
            <Button
              className="navbar-toggler"
              type="button"
              dataTestId="navlinks-button"
              onClick={() => setCollapsed(!collapsed)}
            >
              <span className="navbar-toggler-icon" />
            </Button>
          </div>
          <div
            className={`collapse navbar-collapse ${collapsed ? "" : "show"}`}
          >
            <ul className="navbar-nav me-auto">
              {navigationLinks.map((link) => (
                <li
                  className="d-flex align-items-center nav-item"
                  key={link.text}
                >
                  <NavLink
                    className="nav-link p-0 mx-2"
                    activeclassname="active"
                    to={link.to}
                  >
                    {link.text}
                  </NavLink>
                </li>
              ))}
            </ul>
            <hr className="hr-header" />
            {getItemFromLocalStorage("isLoggedIn")
              ? renderAuthenticatedLinks()
              : renderGuestLinks()}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
