import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import "../css/Home.css";
import championsIMG from "../images/champions.png";
import regionsIMG from "../images/regions.png";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="split-screen-container">
        <div className="split-screen-half">
          <div className="split-content">
            <Link to="/champion">
              <div className="image-overlay-home" />
              <img
                src={championsIMG}
                alt="Personagens"
                className="image-home"
                data-testid="champion-img"
              />
              <div className="centered-text">
                <h1 className="text-white" data-testid="champion-heading">
                  Personagens
                </h1>
              </div>
            </Link>
          </div>
        </div>
        <div className="split-screen-half">
          <div className="split-content">
            <Link to="/region">
              <div className="image-overlay-home" />
              <img
                src={regionsIMG}
                alt="Regiões"
                className="image-home"
                data-testid="region-img"
              />
              <div className="centered-text">
                <h1 className="text-white" data-testid="region-heading">
                  Regiões
                </h1>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
