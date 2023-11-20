import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import Button from "../components/Button";
import { AiOutlineSearch, AiOutlineStar, AiFillStar } from "react-icons/ai";
import {
  setItemToLocalStorage,
  getItemFromLocalStorage,
} from "../services/localStorage";

const Character = () => {
  const navigate = useNavigate();
  const [champions, setChampions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchChampion, setSearchChampion] = useState("");
  const [filterTypes, setFilterTypes] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const user = getItemFromLocalStorage("user");
    return user ? user[0].favorites : [];
  });
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    fetch(
      "http://ddragon.leagueoflegends.com/cdn/13.9.1/data/pt_BR/champion.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setChampions(data.data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const user = getItemFromLocalStorage("user");
    const users = getItemFromLocalStorage("userData");

    if (user) {
      const updatedUser = { ...user[0], favorites: favorites };
      const updatedUsers = users.map((u) => {
        if (u.email === user[0].email) {
          return { ...u, favorites: favorites };
        }
        return u;
      });

      setItemToLocalStorage("user", [updatedUser]);
      setItemToLocalStorage("userData", updatedUsers);
    }
  }, [favorites]);

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

  const handleFavorite = (championId) => {
    const isLoggedIn = getItemFromLocalStorage("isLoggedIn");

    if (isLoggedIn) {
      if (favorites.includes(championId)) {
        setFavorites(favorites.filter((id) => id !== championId));
      } else {
        const sortedFavorites = [...favorites, championId].sort();
        setFavorites(sortedFavorites);
      }
    } else {
      alert("Você precisa estar conectado para favoritar um campeão.");
    }
  };

  const toggleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const filteredChampions = Object.values(champions).filter(({ id, tags }) => {
    const isMatch = id.toLowerCase().includes(searchChampion.toLowerCase());

    const hasSelectedTypes =
      filterTypes.length > 0
        ? filterTypes.every((type) => tags.includes(type))
        : true;

    return isMatch && hasSelectedTypes;
  });

  const renderChampions = () => {
    let displayedChampions = filteredChampions;

    if (showFavorites) {
      displayedChampions = displayedChampions.filter((champion) =>
        favorites.includes(champion.id)
      );
    }
    if (displayedChampions.length > 0) {
      return displayedChampions.map(({ id }) => {
        const imageURL = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg`;
        const isFavorite = favorites.includes(id);

        return (
          <div key={id} className="mb-4 character-card">
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
                onClick={() => navigate(`/character/${id}`)}
              >
                <Card name={id} image={imageURL} />
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
          <div className="input-group mb-4 rounded-1">
            <span className="input-group-text search-input border-0 text-white p-2 px-3">
              <AiOutlineSearch size={23} />
            </span>
            <input
              type="text"
              className="form-control search-input text-white border-0 p-0"
              placeholder="Buscar campeão"
              value={searchChampion}
              onChange={handleSearch}
            />
          </div>
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

export default Character;
