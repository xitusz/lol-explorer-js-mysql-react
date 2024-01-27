import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getItemFromLocalStorage } from "../services/localStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
    const token = getItemFromLocalStorage("token");

    if (token) {
      setUserToken(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
