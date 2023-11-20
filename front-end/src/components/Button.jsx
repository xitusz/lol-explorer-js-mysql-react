import React from "react";
import PropTypes from "prop-types";

const Button = ({
  className,
  type,
  onClick,
  disabled,
  children,
  dataTestId,
}) => (
  <button
    className={className}
    type={type}
    onClick={onClick}
    disabled={disabled}
    data-testid={dataTestId}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  dataTestId: PropTypes.string,
};

Button.defaultProps = {
  className: "",
  type: "button",
  onClick: () => {},
  disabled: false,
  dataTestId: "",
};

export default Button;
