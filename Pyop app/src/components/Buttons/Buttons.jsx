import React from "react";
import PropTypes from "prop-types";

const Button = ({ text, onClick, style, className, disabled }) => {
  return (
    <button
      onClick={onClick}
      style={style}
      className={`btn px-4 ${className}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  onClick: () => {},
  style: {},
  className: "",
  disabled: false,
};

export default Button;
