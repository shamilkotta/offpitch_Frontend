/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";

function InputFields({
  type,
  name,
  value,
  className,
  maxLength,
  holder,
  onChange,
  ...props
}) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      className={`form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700
          bg-white bg-clip-padding border-2 border-solid border-gray-300 rounded transition ease-in-out m-0
          focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none ${className}`}
      maxLength={maxLength}
      placeholder={holder}
      onChange={onChange}
      {...props}
    />
  );
}

InputFields.defaultProps = {
  type: "text",
  maxLength: 1000,
  className: "",
};

InputFields.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  holder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export function InputSubmit({ type, className, loadingValue, onClick, value }) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={`bg-primary font-medium text-white py-1 px-3 w-full h-11 rounded disabled:bg-opacity-30 ${className}`}
      onClick={onClick}
      disabled={loadingValue}
      value={value}
    >
      {loadingValue ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {loadingValue}
        </>
      ) : (
        value
      )}
    </button>
  );
}

InputSubmit.defaultProps = {
  type: "submit",
  className: "",
  loadingValue: "",
  value: "Submit",
};

InputSubmit.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  loadingValue: PropTypes.string,
  value: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default InputFields;
