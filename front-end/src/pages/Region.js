import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CardRegion from "../components/CardRegion";
import SearchInput from "../components/SearchInput";
import regionsData from "../data/regions.json";
import "../css/Region.css";

const Region = () => {
  const navigate = useNavigate();

  const [searchRegion, setSearchRegion] = useState("");

  const handleSearch = (event) => {
    setSearchRegion(event.target.value);
  };

  const normalizedString = (str) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const filteredRegions = Object.values(regionsData).filter(({ nameBR }) => {
    const normalizedSearch = normalizedString(searchRegion);
    const normalizedRegion = normalizedString(nameBR);

    return normalizedRegion.includes(normalizedSearch);
  });

  const sortedRegions = filteredRegions.sort((a, b) =>
    a.nameBR.localeCompare(b.nameBR)
  );

  const renderRegions = () => {
    if (sortedRegions.length === 0) {
      return (
        <span className="text-center text-white py-5">
          Nenhuma região encontrada.
        </span>
      );
    }

    return sortedRegions.map((region) => (
      <div key={region.name} className="mb-4 region-card">
        <div
          className="text-decoration-none"
          onClick={() => navigate(`/region/${region.name}`)}
        >
          <CardRegion
            name={region.nameBR}
            image={region.img}
            icon={region.icon}
          />
        </div>
      </div>
    ));
  };

  return (
    <div>
      <Header />
      <div className="py-5 region-container">
        <h1 className="text-center text-white pt-5 p-4">Regiões</h1>
        <div className="d-flex justify-content-center w-50 m-auto mb-3">
          <SearchInput
            iconSize={23}
            placeholder="Buscar região"
            value={searchRegion}
            onChange={handleSearch}
          />
        </div>
        <div className="d-flex justify-content-center row mx-5">
          {renderRegions()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Region;
