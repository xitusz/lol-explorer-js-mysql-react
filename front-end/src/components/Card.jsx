import React from "react";
import PropTypes from "prop-types";
import "../css/Card.css";

const Card = ({ name, image }) => {
  return (
    <div className="card border-0 card-div">
      <img
        src={image}
        alt={name}
        className="card-img-top img-fluid card-image"
      />
      <div className="card-body p-0">
        <h5 className="card-title text-center pt-1 text-white">{name}</h5>
      </div>
    </div>
  );
};

Card.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
};

Card.defaultProps = {
  image: "",
};

export default Card;
