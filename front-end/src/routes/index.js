import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Character from "../pages/Character";
import CharacterDetails from "../pages/CharacterDetails";
import Profile from "../pages/Profile";

const Router = () => (
  <Routes>
    <Route exact path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/character" element={<Character />} />
    <Route path="/character/:championName" element={<CharacterDetails />} />
    <Route path="/profile" element={<Profile />} />
  </Routes>
);

export default Router;
