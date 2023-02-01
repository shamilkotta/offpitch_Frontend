import React from "react";
import PropTypes from "prop-types";

import closeIcon from "../../assets/icons/close.svg";

function Sidebar({ close }) {
  return (
    <div className="fixed z-50 inset-0 overflow-y-auto lg:hidden">
      <div
        onClick={close}
        className="fixed inset-0 bg-white/50 backdrop-blur-sm"
      />
      <div className="relative bg-white w-80 z-20 max-w-[calc(100%-3rem)] h-screen p-6 shadow ">
        <nav>
          <ul className="text-lg font-medium">
            <li onClick={close}>
              <img className="ml-auto mr-0 p-2" src={closeIcon} alt="close" />
            </li>
            <li className="my-1 mb-8 ">
              <span className="cursor-pointer border-2 rounded border-primary w-fit bg-primary text-white px-4 py-2 ">
                Join offpitch
              </span>
            </li>
            <li className="my-4">Sign in</li>
            <li className="my-4">Explore</li>
            <li className="text-red-600 my-4">Host a tournament</li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  close: PropTypes.func.isRequired,
};

export default Sidebar;
