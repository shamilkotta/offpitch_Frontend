import React from "react";
import PropTypes from "prop-types";

import "./Tournament.scss";

function Header({ data }) {
  return (
    <div
      style={{ backgroundImage: `url('${data.cover}')` }}
      className="rounded w-full aspect-[16/9] bg-cover bg-center bg-no-repeat"
    />
  );
}

Header.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Header;
