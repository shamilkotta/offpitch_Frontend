/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";

import "./InputFields.scss";

function InputCheckBox({ label, className, onChange, name, checked, id }) {
  return (
    <div>
      <label htmlFor={id} className={`checkbox ${className}`}>
        {label}
        <input
          name={name}
          type="checkbox"
          onChange={onChange}
          id={id}
          checked={checked}
        />
        <span className="checkmark" />
      </label>
    </div>
  );
}

InputCheckBox.defaultProps = {
  className: "",
};

InputCheckBox.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export function InputRadio({ label, className, name, id, onChange, ...props }) {
  return (
    <div>
      <label htmlFor={id} className={`radio ${className}`}>
        {label}
        <input
          type="radio"
          name={name}
          id={id}
          onChange={onChange}
          {...props}
        />
        <span className="checkmark" />
      </label>
    </div>
  );
}

InputRadio.defaultProps = {
  className: "",
};

InputRadio.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputCheckBox;
