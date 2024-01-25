import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Card from "../components/Card";
import { getItemFromLocalStorage } from "../services/localStorage";
import { Link } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import { AiOutlineSetting } from "react-icons/ai";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "../css/Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const { userToken } = useAuth();

  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(true);
  const [profileInfo, setProfileInfo] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const isLoggedIn = getItemFromLocalStorage("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/");
    }

    const loadUserFavorites = async () => {
      if (userToken) {
        const response = await axios.get("http://localhost:3001/favorites", {
          headers: {
            Authorization: userToken,
          },
        });

        setFavorites(response.data);
      }
    };

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

    loadUserProfile();
    loadUserFavorites();
  }, [navigate, userToken]);

  const toggleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const renderFavorites = () => {
    if (favorites.length === 0) {
      return (
        <p className="text-center text-white py-5">
          Nenhum favorito encontrado.
        </p>
      );
    }

    return (
      <div className="d-flex justify-content-center row mx-5">
        {favorites.map((id) => {
          const imageURL = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${id}_0.jpg`;

          return (
            <div key={id} className="mb-4 champion-card">
              <div className="favorite-div rounded">
                <div
                  className="text-decoration-none"
                  onClick={() => navigate(`/champion/${id}`)}
                >
                  <Card name={id} image={imageURL} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <Header />
      <div
        className={`py-5 profile-container ${
          !showFavorites || favorites.length === 0
            ? "profile-container-height"
            : ""
        }`}
      >
        <h1 className="text-center text-white py-5">Perfil</h1>
        <div className="d-flex mb-5 w-50 justify-content-between m-auto border rounded py-3 profile-div">
          <div className="px-3">
            <h4 className="text-white text-center">
              Bem Vindo, {profileInfo.name}
            </h4>
            <div className="d-flex">
              <FiMail
                size={25}
                className="text-white"
                data-testid="email-icon"
              />
              <p className="text-white mx-1">{profileInfo.email}</p>
            </div>
          </div>
          <div className="px-3">
            <Link to="/profile/edit">
              <AiOutlineSetting
                size={30}
                className="text-white icon"
                data-testid="setting-icon"
              />
            </Link>
          </div>
        </div>
        <div className="text-center">
          <Button
            className="btn btn-primary mb-5 text-white"
            onClick={toggleShowFavorites}
            data-testid="profile-button"
          >
            {showFavorites ? "Ocultar Favoritos" : "Mostrar Favoritos"}
          </Button>
          <div>{showFavorites && <div>{renderFavorites()}</div>}</div>
        </div>
      </div>
      <Footer
        className={
          !showFavorites || favorites.length === 0 ? "fixed-bottom" : ""
        }
      />
    </div>
  );
};

export default Profile;
