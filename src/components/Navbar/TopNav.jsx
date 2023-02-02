import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import useScrollPosition from "../../hooks/useScrollPosition";
import menuIcon from "../../assets/icons/menu.svg";

function TopNav({ open }) {
  const scrollpos = useScrollPosition();
  return (
    <nav
      className={`sticky z-10 top-0 right-0 left-0 box-border ${
        scrollpos >= 100 ? "shadow-md" : "shadow-none"
      } py-3 bg-white`}
    >
      <div className="flex justify-between items-center text-lg font-medium px-4 py-1 sm:px-10 max-w-[1500px] mx-auto box-border">
        <ul className="flex items-center gap-x-2 md:hidden">
          <li onClick={open}>
            <img src={menuIcon} alt="menu" />
          </li>
          <li>
            <img
              src="/logo.svg"
              alt="offpitch"
              className="hidden sm:block"
              width="110"
              height="100"
            />
          </li>
        </ul>
        <ul className="flex justify-between items-center gap-x-5">
          <li className="sm:hidden md:block">
            <Link to="/">
              <img src="/logo.svg" alt="offpitch" width="110" height="100" />
            </Link>
          </li>
          <li className="hidden md:block ">
            <Link to="/explore">
              <h3 className="cursor-pointer hover:text-primary">Explore</h3>
            </Link>
          </li>
        </ul>
        <ul className="flex justify-between items-center gap-x-10">
          <li className="hidden md:block">
            <Link to="/">
              <h3 className="cursor-pointer text-red-600 hover:text-primary">
                Host a tournament
              </h3>
            </Link>
          </li>
          <li className="hidden sm:block">
            <Link to="/login">
              <h3 className="cursor-pointer hover:text-primary">Sign in</h3>
            </Link>
          </li>
          <li>
            <Link to="/signup">
              <h3 className="cursor-pointer sm:border-2 sm:rounded border-black sm:hover:bg-primary sm:hover:border-primary hover:text-primary sm:hover:text-white px-3 py-0">
                Join
              </h3>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

TopNav.propTypes = {
  open: PropTypes.func.isRequired,
};

export default TopNav;
