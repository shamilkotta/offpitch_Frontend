import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import closeIcon from "../../assets/icons/close.svg";
import { logoutApi } from "../../helpers/apis/auth";
import { clearAuth } from "../../app/slices/authSlice";

function Sidebar({ close }) {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="fixed z-40 inset-0 overflow-y-auto lg:hidden">
      <div
        onClick={close}
        className="fixed inset-0 bg-white/50 backdrop-blur-sm"
      />
      <div className="relative bg-white w-80 overflow-x-hidden z-20 max-w-[calc(100%-3rem)] h-screen p-6 shadow-lg ">
        <nav>
          {auth?.accessToken ? (
            <ul className="text-lg font-medium">
              <li onClick={close}>
                <img className="ml-auto mr-0 p-2" src={closeIcon} alt="close" />
              </li>
              <li className="border-b ">
                <Link to="/" className="flex items-center">
                  <img
                    src={auth.profile}
                    alt="pr"
                    className="w-8 h-8 rounded-full"
                  />
                  <h6 className="py-2 leading-tight px-3 text-lg hover:text-primary">
                    {auth.name}
                    <br />
                    <p className="text-sm text-ellipsis overflow-hidden">
                      {auth.email}
                    </p>
                  </h6>
                </Link>
              </li>
              <li className="border-b ">
                <Link to="/">
                  <h6 className="py-2 px-3 text-lg hover:text-primary text-red-700">
                    Host a tournament
                  </h6>
                </Link>
              </li>
              <li className="">
                <Link to="/">
                  <h6 className="py-2 px-3 text-lg hover:text-primary">
                    Organization
                  </h6>
                </Link>
              </li>
              <li className="">
                <Link to="/">
                  <h6 className="py-2 px-3 text-lg hover:text-primary">Club</h6>
                </Link>
              </li>
              <li className="">
                <Link to="/">
                  <h6 className="py-2 px-3 text-lg hover:text-primary">
                    Watchlist
                  </h6>
                </Link>
              </li>
              <li className="">
                <Link to="/">
                  <h6 className="py-2 px-3 text-lg hover:text-primary">
                    Transactions
                  </h6>
                </Link>
              </li>
              <li className="border-t ">
                <button
                  type="button"
                  onClick={() => {
                    dispatch(clearAuth());
                    logoutApi();
                  }}
                >
                  <h6 className="py-2 px-3 text-lg text-red-700">Logout</h6>
                </button>
              </li>
            </ul>
          ) : (
            <ul className="text-lg font-medium">
              <li onClick={close}>
                <img className="ml-auto mr-0 p-2" src={closeIcon} alt="close" />
              </li>
              <li className="my-1 mb-8 ">
                <Link to="/signup">
                  <span className="cursor-pointer border-2 rounded border-primary w-fit bg-primary text-white px-4 py-2 ">
                    Join offpitch
                  </span>
                </Link>
              </li>
              <li className="my-4">
                <Link to="/login">Sign in</Link>
              </li>
              <li className="my-4">
                <Link to="/explore">Explore</Link>
              </li>
              <li className="text-red-600 my-4">Host a tournament</li>
            </ul>
          )}
        </nav>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  close: PropTypes.func.isRequired,
};

export default Sidebar;
