import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Champion from "../pages/Champion";
import ChampionDetails from "../pages/ChampionDetails";
import Profile from "../pages/Profile";
import ProfileEdit from "../pages/ProfileEdit";
import Region from "../pages/Region";
import RegionDetails from "../pages/RegionDetails";

const Router = () => (
  <Routes>
    <Route exact path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/champion" element={<Champion />} />
    <Route path="/champion/:championName" element={<ChampionDetails />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/profile/edit" element={<ProfileEdit />} />
    <Route path="/region" element={<Region />} />
    <Route path="/region/:regionName" element={<RegionDetails />} />
  </Routes>
);

export default Router;
