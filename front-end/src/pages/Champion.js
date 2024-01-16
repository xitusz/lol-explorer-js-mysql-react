import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import Button from "../components/Button";
import SearchInput from "../components/SearchInput";
import { getItemFromLocalStorage } from "../services/localStorage";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "../css/Champion.css";

const Champion = () => {
  const navigate = useNavigate();
  const [champions, setChampions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchChampion, setSearchChampion] = useState("");
  const [filterTypes, setFilterTypes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const { userToken } = useAuth();

  const isLoggedIn = getItemFromLocalStorage("isLoggedIn");

  useEffect(() => {
    const fetchChampions = async () => {
      const response = await fetch(
        "http://ddragon.leagueoflegends.com/cdn/13.24.1/data/pt_BR/champion.json"
      );
      const data = await response.json();

      setChampions(data.data);
      setLoading(false);
    };

    const loadUserFavorites = async () => {
      if (userToken && isLoggedIn) {
        const response = await axios.get("http://localhost:3001/favorites", {
          headers: {
            Authorization: userToken,
          },
        });

        setFavorites(response.data);
      }
    };

    loadUserFavorites();
    fetchChampions();
  }, [userToken]);

  const handleSearch = (event) => {
    setSearchChampion(event.target.value);
  };

  const championTypes = [
    { label: "Todos", value: "All" },
    { label: "Assassinos", value: "Assassin" },
    { label: "Magos", value: "Mage" },
    { label: "Tanques", value: "Tank" },
    { label: "Lutadores", value: "Fighter" },
    { label: "Atiradores", value: "Marksman" },
    { label: "Suportes", value: "Support" },
  ];

  const handleFilterTypes = (type) => {
    if (type === "All") {
      setFilterTypes([]);
    } else {
      if (filterTypes.includes(type)) {
        setFilterTypes(filterTypes.filter((item) => item !== type));
      } else {
        setFilterTypes([...filterTypes, type]);
      }
    }
  };

  const handleFavorite = async (favoriteName) => {
    if (userToken && isLoggedIn) {
      try {
        const isFavorite = favorites.includes(favoriteName);

        if (!isFavorite) {
          await axios.post(
            "http://localhost:3001/favorites",
            {
              favoriteName,
            },
            {
              headers: {
                Authorization: userToken,
              },
            }
          );
        } else {
          await axios.delete(`http://localhost:3001/favorites`, {
            data: { favoriteName },
            headers: {
              Authorization: userToken,
            },
          });
        }

        const updatedFavorites = isFavorite
          ? favorites.filter((id) => id !== favoriteName)
          : [...favorites, favoriteName].sort();

        setFavorites(updatedFavorites);
      } catch (err) {
        alert("Erro ao lidar com os favoritos.");
      }
    } else {
      alert("Você precisa estar conectado para favoritar um campeão.");
    }
  };

  const toggleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const clearFavorites = async () => {
    if (userToken) {
      await axios.delete("http://localhost:3001/favorites/clear", {
        headers: {
          Authorization: userToken,
        },
      });

      setFavorites([]);
    } else {
      alert("Erro ao limpar favoritos.");
    }
  };

  const filteredChampions = Object.values(champions).filter(
    ({ name, tags }) => {
      const isMatch = name.toLowerCase().includes(searchChampion.toLowerCase());

      const hasSelectedTypes =
        filterTypes.length > 0
          ? filterTypes.every((type) => tags.includes(type))
          : true;

      return isMatch && hasSelectedTypes;
    }
  );

  const renderChampions = () => {
    let displayedChampions = filteredChampions;

    if (showFavorites) {
      displayedChampions = displayedChampions.filter((champion) =>
        favorites.includes(champion.id)
      );
    }
    if (displayedChampions.length > 0) {
      return displayedChampions.map(({ id, name }) => {
        const imageURL = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${id}_0.jpg`;
        const isFavorite = favorites.includes(id);

        return (
          <div key={id} className="mb-4 champion-card">
            <div className="favorite-div rounded">
              <div
                className="favorite-icon pb-2 pt-1"
                onClick={() => handleFavorite(id)}
              >
                {isFavorite ? (
                  <AiFillStar
                    size={20}
                    className="text-white fav-icon"
                    data-testid={`fill-star-icon-${id}`}
                  />
                ) : (
                  <AiOutlineStar
                    size={20}
                    className="text-white fav-icon"
                    data-testid={`outline-star-icon-${id}`}
                  />
                )}
              </div>
              <div
                className="text-decoration-none"
                onClick={() => navigate(`/champion/${id}`)}
              >
                <Card name={name} image={imageURL} />
              </div>
            </div>
          </div>
        );
      });
    } else {
      return (
        <span className="text-center text-white py-5">
          Nenhum campeão encontrado.
        </span>
      );
    }
  };

  return (
    <div>
      <Header />
      <div className="py-5">
        <h1 className="text-center text-white pt-5 p-4">Personagens</h1>
        <div className="d-flex justify-content-center w-50 m-auto">
          <SearchInput
            iconSize={23}
            placeholder="Buscar campeão"
            value={searchChampion}
            onChange={handleSearch}
          />
        </div>
        <div className="d-flex justify-content-center flex-wrap w-50 m-auto">
          {championTypes.map((type) => (
            <Button
              className={`border-0 rounded-3 mx-2 mb-3 text-white filter-button py-2 px-3 ${
                (filterTypes.length === 0 && type.value === "All") ||
                filterTypes.includes(type.value)
                  ? "active"
                  : ""
              }`}
              key={type.value}
              dataTestId={`button-${type.value}`}
              onClick={() => handleFilterTypes(type.value)}
            >
              {type.label}
            </Button>
          ))}
        </div>
        <div className="d-flex justify-content-center flex-wrap mb-4 w-50 m-auto">
          <Button
            className={`border-0 rounded-3 mx-2 mb-3 text-white filter-button py-2 px-3 ${
              showFavorites ? "active" : ""
            }`}
            dataTestId={`button-Favorite`}
            onClick={toggleShowFavorites}
          >
            Favoritos
          </Button>
          <Button
            className="border-0 rounded-3 mx-2 mb-3 text-white filter-button py-2 px-3"
            dataTestId={`button-ClearFavorite`}
            onClick={clearFavorites}
          >
            Limpar Favoritos
          </Button>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="d-flex justify-content-center row mx-5">
            {renderChampions()}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Champion;
