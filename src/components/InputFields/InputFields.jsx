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
  errorMsg,
  ...props
}) {
  return (
    <>
      <input
        type={type}
        name={name}
        value={value}
        className={`form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700
          bg-white bg-clip-padding border-2 border-solid  rounded transition ease-in-out m-0
          focus:text-gray-700 focus:bg-white ${
            errorMsg
              ? "border-red-600 focus:border-red-600"
              : "focus:border-primary border-gray-300"
          } focus:outline-none ${className}`}
        maxLength={maxLength}
        placeholder={holder}
        onChange={onChange}
        {...props}
      />
      <span className="text-red-600">{errorMsg}</span>
    </>
  );
}

InputFields.defaultProps = {
  type: "text",
  maxLength: 1000,
  className: "",
  errorMsg: "",
};

InputFields.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  holder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errorMsg: PropTypes.string,
};

export function InputSubmit({ type, className, loadingValue, onClick, value }) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={`bg-primary font-medium text-white py-1 px-3 w-full h-11 rounded disabled:bg-opacity-90 disabled:bg-orange-600 ${className}`}
      onClick={onClick}
      disabled={loadingValue}
      value={value}
    >
      {loadingValue ? (
        <span className="flex gap-x-3 items-center justify-center">
          <svg
            className="animate-spin"
            width="20"
            height="20"
            viewBox="0 0 110 110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.3"
              d="M110 55C110 85.3757 85.3757 110 55 110C24.6243 110 0 85.3757 0 55C0 24.6243 24.6243 0 55 0C85.3757 0 110 24.6243 110 55ZM17.1499 55C17.1499 75.904 34.096 92.8501 55 92.8501C75.904 92.8501 92.8501 75.904 92.8501 55C92.8501 34.096 75.904 17.1499 55 17.1499C34.096 17.1499 17.1499 34.096 17.1499 55Z"
              fill="#FFF"
            />
            <path
              d="M101.425 55C106.161 55 110.068 51.138 109.333 46.4597C108.66 42.176 107.48 37.9771 105.813 33.9524C103.049 27.2795 98.9981 21.2163 93.8909 16.1091C88.7836 11.0019 82.7205 6.95063 76.0476 4.18663C72.0229 2.51955 67.824 1.34044 63.5403 0.66711C58.8619 -0.0682658 55 3.83914 55 8.57497V8.57497C55 13.3108 58.887 17.0534 63.5018 18.1171C65.5409 18.5871 67.5422 19.2265 69.4846 20.0311C74.0768 21.9332 78.2493 24.7213 81.764 28.236C85.2787 31.7507 88.0668 35.9232 89.9689 40.5154C90.7735 42.4578 91.4129 44.4591 91.8829 46.4982C92.9466 51.113 96.6892 55 101.425 55V55Z"
              fill="#F6F6F6"
            />
          </svg>
          {loadingValue}
        </span>
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
