import React from "react";
import PropTypes from "prop-types";
import { AiOutlineSearch } from "react-icons/ai";
import "../css/SearchInput.css";

const SearchInput = ({ iconSize, placeholder, value, onChange }) => {
  return (
    <div className="input-group mb-4 rounded-1">
      <span className="input-group-text search-input border-0 text-white p-2 px-3">
        <AiOutlineSearch size={iconSize} />
      </span>
      <input
        type="text"
        className="form-control search-input text-white border-0 p-0"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

SearchInput.propTypes = {
  iconSize: PropTypes.number,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

SearchInput.defaultProps = {
  iconSize: 23,
};

export default SearchInput;
