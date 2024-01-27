import React from "react";
import PropTypes from "prop-types";
import "../css/CardRegion.css";

const CardRegion = ({ name, image, icon }) => {
  return (
    <div className={`card border-0 card-region-div`}>
      <div className="image-overlay"></div>
      <img
        src={image}
        alt={name}
        className="card-img-top img-fluid card-region-image"
      />
      <div className="card-body p-0">
        <h5 className="card-title text-center pt-1 text-white">{name}</h5>
        {icon && (
          <div className="icon-overlay">
            <img src={icon} alt={`${name} Icon`} className="centered-icon" />
          </div>
        )}
      </div>
    </div>
  );
};

CardRegion.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  icon: PropTypes.string,
};

CardRegion.defaultProps = {
  image: "",
  icon: "",
};

export default CardRegion;
