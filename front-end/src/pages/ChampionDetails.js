import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import Button from "../components/Button";
import skillVideos from "../data/skillVideos.json";
import "../css/ChampionDetails.css";

const ChampionDetails = () => {
  const [championDetail, setChampionDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [skillState, setSkillState] = useState("P");
  const [skinState, setSkinState] = useState("default");
  const { championName } = useParams();

  const skillOrder = ["Q", "W", "E", "R"];

  useEffect(() => {
    fetch(
      `http://ddragon.leagueoflegends.com/cdn/13.24.1/data/pt_BR/champion/${championName}.json`
    )
      .then((response) => response.json())
      .then((data) => {
        setChampionDetail(data.data[championName]);
        setLoading(false);
      });
  }, [championName]);

  const { id, name, title, lore, tags, passive, spells, skins } =
    championDetail;

  const renderTags = () => {
    return tags.map((tag) => (
      <span key={tag} className="mx-1">
        {tag}
      </span>
    ));
  };

  const renderImage = (src, alt, testid) => {
    return (
      <img
        src={src}
        alt={alt}
        className="img-fluid mt-2"
        data-testid={testid}
      />
    );
  };

  const renderLore = () => {
    return (
      <div className="border p-4 bg-dark-blue">
        <span>{lore}</span>
      </div>
    );
  };

  const renderSkillButtons = () => {
    return (
      <div className="p-2">
        <Button
          className={`border-0 p-0 mx-2 img-button bg-dark-blue ${
            skillState === "P" ? "active" : ""
          }`}
          dataTestId={"passive-skill"}
          onClick={() => setSkillState("P")}
        >
          <img
            src={`http://ddragon.leagueoflegends.com/cdn/13.24.1/img/passive/${passive.image.full}`}
            alt={passive.name}
            className="button-img"
          />
        </Button>
        {spells.map((spell, index) => (
          <Button
            className={`border-0 p-0 m-2 img-button bg-dark-blue ${
              skillState === skillOrder[index] ? "active" : ""
            }`}
            key={spell.id}
            dataTestId={`${skillOrder[index]}-skill`}
            onClick={() => setSkillState(skillOrder[index])}
          >
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/13.24.1/img/spell/${spell.image.full}`}
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

  const renderSpell = (spell, index) => {
    return (
      <div key={spell.id} className="p-3">
        <span>{skillOrder[index]}</span>
        <h6>{spell.name}</h6>
        <span>{spell.description}</span>
      </div>
    );
  };

  const handleVideoError = () => {
    const noSkillImage = skillVideos.NoSkillVideo.IMG;
    const noSkillImage2 = skillVideos.NoSkillVideo.IMG2;

    return (
      <div className="text-center imgStyle">
        <div>
          <img src={noSkillImage} alt="No Skill Video" className="img-fluid" />
          <div className="img2Style">
            <img
              src={noSkillImage2}
              alt="No Skill Icon"
              className="img-fluid"
            />
            <p className="mt-2 fw-bold">
              Não é possível exibir esta habilidade em vídeo.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderSkillVideo = () => {
    const championVideos = skillVideos[championName];
    if (!championVideos) {
      return <p className="mt-3">Nenhum vídeo disponível para este campeão.</p>;
    }

    const skillVideoUrl = championVideos[skillState];

    return (
      <div className="p-3">
        {skillVideoUrl ? (
          <video
            key={skillState}
            muted
            autoPlay
            loop
            width="60%"
            height="auto"
            onError={() => handleVideoError()}
          >
            <source
              src={skillVideoUrl}
              data-testid={skillState}
              type="video/webm"
            />
            Seu navegador não suporta o elemento de vídeo.
          </video>
        ) : (
          handleVideoError()
        )}
      </div>
    );
  };

  const renderSkillDetails = () => {
    return (
      <div>
        {skillState === "P" && renderPassiveSkill()}
        {spells.map(
          (spell, index) =>
            skillState === skillOrder[index] && renderSpell(spell, index)
        )}
      </div>
    );
  };

  const renderSkinButtons = () => {
    return (
      <div className="p-2">
        {skins.map((skin) => (
          <Button
            className={`border-0 p-0 m-2 img-button bg-dark-blue ${
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
                    <span data-testid={"default-skin"}>{name}</span>
                  ) : (
                    <span data-testid={`${skin.name}-skin`}>{skin.name}</span>
                  )}
                </h6>
                <img
                  className="img-fluid rounded"
                  src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_${skin.num}.jpg`}
                  alt={skin.name}
                  data-testid={`${skin.name}-image`}
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
              <h1>{name}</h1>
              <h2>{title}</h2>
              <div>{renderTags()}</div>
              {renderImage(
                `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg`,
                id,
                "champion-image"
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
              <div className="border bg-dark-blue">
                {renderSkillButtons()}
                <hr className="m-0" />
                {renderSkillVideo()}
                <hr className="m-0" />
                {renderSkillDetails()}
              </div>
            </div>
            <hr className="w-25 mx-auto my-5" />
            <div className="w-75 mx-auto">
              <h3>Skins</h3>
              <div className="border bg-dark-blue">
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

export default ChampionDetails;
