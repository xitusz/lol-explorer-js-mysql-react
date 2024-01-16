import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import regionsData from "../data/regions.json";
import "../css/RegionDetails.css";

const RegionDetails = () => {
  const { regionName } = useParams();
  const navigate = useNavigate();

  const regionDetail = regionsData[regionName];

  const { nameBR, img, icon, description, champions } = regionDetail;

  const renderChampionCards = () => {
    return champions.map((champion) => (
      <div key={champion} className="mb-4 champion-cards">
        <div className="rounded">
          <div
            className="text-decoration-none"
            onClick={() => navigate(`/champion/${champion}`)}
          >
            <Card
              name={champion}
              image={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion}_0.jpg`}
            />
          </div>
        </div>
      </div>
    ));
  };

  const renderImage = (src) => {
    return <img src={src} alt={nameBR} className="img-fluid mt-2" />;
  };

  const renderDescription = () => {
    return (
      <div className="border p-4 bg-dark-blue">
        <span>{description}</span>
      </div>
    );
  };

  return (
    <div>
      <Header />
      <div className="py-5 mx-5">
        <div className="p-5 text-white text-center mx-5">
          <div>
            <div className="region-details-icon m-auto">
              {renderImage(icon)}
            </div>
            <h1>{nameBR}</h1>
            <div className="region-details-img m-auto">{renderImage(img)}</div>
          </div>
          <hr className="w-25 mx-auto my-5" />
          <div className="w-75 mx-auto">
            <h3>Descrição</h3>
            {renderDescription()}
          </div>
          <hr className="w-25 mx-auto my-5" />
          <div className="d-flex justify-content-center row mx-5">
            <h3>Personagens</h3>
            {renderChampionCards()}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegionDetails;
