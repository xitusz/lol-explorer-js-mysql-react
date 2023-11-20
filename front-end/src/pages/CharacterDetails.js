import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import Button from "../components/Button";

const CharacterDetails = () => {
  const [championDetail, setChampionDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [skillState, setSkillState] = useState("passive");
  const [skinState, setSkinState] = useState("default");
  const { championName } = useParams();

  useEffect(() => {
    fetch(
      `http://ddragon.leagueoflegends.com/cdn/13.9.1/data/pt_BR/champion/${championName}.json`
    )
      .then((response) => response.json())
      .then((data) => {
        setChampionDetail(data.data[championName]);
        setLoading(false);
      });
  }, [championName]);

  const { id, title, lore, tags, passive, spells, skins } = championDetail;

  const renderTags = () => {
    return tags.map((tag) => (
      <span key={tag} className="mx-1">
        {tag}
      </span>
    ));
  };

  const renderImage = (src, alt) => {
    return <img src={src} alt={alt} className="img-fluid mt-2" />;
  };

  const renderLore = () => {
    return (
      <div className="border p-4">
        <span>{lore}</span>
      </div>
    );
  };

  const renderSkillButtons = () => {
    return (
      <div className="p-2">
        <Button
          className={`border-0 p-0 mx-2 img-button ${
            skillState === "passive" ? "active" : ""
          }`}
          dataTestId={"passive-skill"}
          onClick={() => setSkillState("passive")}
        >
          <img
            src={`http://ddragon.leagueoflegends.com/cdn/13.9.1/img/passive/${passive.image.full}`}
            alt={passive.name}
            className="button-img"
          />
        </Button>
        {spells.map((spell) => (
          <Button
            className={`border-0 p-0 m-2 img-button ${
              skillState === spell.name ? "active" : ""
            }`}
            key={spell.id}
            dataTestId={`${spell.id.charAt(spell.id.length - 1)}-skill`}
            onClick={() => setSkillState(spell.name)}
          >
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/13.9.1/img/spell/${spell.image.full}`}
              alt={spell.name}
              className="button-img"
            />
          </Button>
        ))}
      </div>
    );
  };

  const renderPassiveSkill = () => {
    return (
      <div className="p-3">
        <span>Passiva</span>
        <h6>{passive.name}</h6>
        <span>{passive.description}</span>
      </div>
    );
  };

  const renderSpell = (spell) => {
    return (
      <div key={spell.id} className="p-3">
        <span>{spell.id.charAt(spell.id.length - 1)}</span>
        <h6>{spell.name}</h6>
        <span>{spell.description}</span>
      </div>
    );
  };

  const renderSkillDetails = () => {
    return (
      <div>
        {skillState === "passive" && renderPassiveSkill()}
        {spells.map((spell) => skillState === spell.name && renderSpell(spell))}
      </div>
    );
  };

  const renderSkinButtons = () => {
    return (
      <div className="p-2">
        {skins.map((skin) => (
          <Button
            className={`border-0 p-0 m-2 img-button ${
              skinState === skin.name ? "active" : ""
            }`}
            key={skin.id}
            dataTestId={`${skin.name}-button`}
            onClick={() => setSkinState(skin.name)}
          >
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_${skin.num}.jpg`}
              alt={skin.name}
              className="button-img"
            />
          </Button>
        ))}
      </div>
    );
  };

  const renderSkinDetails = () => {
    return (
      <div className="d-flex p-3">
        {skins.map(
          (skin) =>
            skinState === skin.name && (
              <div key={skin.num} className="mx-auto">
                <h6>
                  {skin.name === "default" ? (
                    <span data-testid={"default-skin"}>{id}</span>
                  ) : (
                    <span data-testid={`${skin.name}-skin`}>{skin.name}</span>
                  )}
                </h6>
                <img
                  className="img-fluid rounded"
                  src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_${skin.num}.jpg`}
                  alt={skin.name}
                />
              </div>
            )
        )}
      </div>
    );
  };

  return (
    <div>
      <Header />
      <div className="py-5">
        {loading ? (
          <Loading />
        ) : (
          <div className="p-5 text-white text-center">
            <div>
              <h1>{id}</h1>
              <h2>{title}</h2>
              <div>{renderTags()}</div>
              {renderImage(
                `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg`,
                id
              )}
            </div>
            <hr className="w-25 mx-auto my-5" />
            <div className="w-75 mx-auto">
              <h3>História</h3>
              {renderLore()}
            </div>
            <hr className="w-25 mx-auto my-5" />
            <div className="w-75 mx-auto">
              <h3>Habilidades</h3>
              <div className="border">
                {renderSkillButtons()}
                <hr className="m-0" />
                {renderSkillDetails()}
              </div>
            </div>
            <hr className="w-25 mx-auto my-5" />
            <div className="w-75 mx-auto">
              <h3>Skins</h3>
              <div className="border">
                {renderSkinButtons()}
                <hr className="m-0" />
                {renderSkinDetails()}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CharacterDetails;
