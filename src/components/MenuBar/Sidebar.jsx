import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Drawer, Box } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { logoutApi } from "../../helpers/apis/auth";
import { clearAuth } from "../../app/slices/authSlice";

function Sidebar({ openState, close }) {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <Drawer anchor="left" open={openState} onClose={close}>
      <Box role="presentation" onClick={close} onKeyDown={close}>
        <nav className="mt-5">
          {auth?.accessToken ? (
            <ul className="text-base font-medium px-3 py-6">
              <li className="border-b ">
                <Link to="/user" className="flex items-center">
                  <img
                    src={auth.profile}
                    alt="pr"
                    className="w-8 h-8 rounded-full"
                  />
                  <h6 className="py-2 leading-tight px-3 text-lg hover:text-primary">
                    {auth.name}
                    <br />
                    <p className="text-sm -mt-1 text-ellipsis overflow-hidden">
                      {auth.email}
                    </p>
                  </h6>
                </Link>
              </li>
              <li className="">
                <Link to="/explore">
                  <h6 className="py-2 px-3 hover:text-primary">Explore</h6>
                </Link>
              </li>
              <li className="border-b ">
                <Link to="/user/tournament/new">
                  <h6 className="py-2 px-3 hover:text-primary text-red-700">
                    Host a tournament
                  </h6>
                </Link>
              </li>
              <li className="">
                <Link to="/user/club">
                  <h6 className="py-2 px-3 hover:text-primary">Club</h6>
                </Link>
              </li>
              <li className="">
                <Link to="/user/watchlist">
                  <h6 className="py-2 px-3 hover:text-primary">Watchlist</h6>
                </Link>
              </li>
              <li className="">
                <Link to="/user/transactions">
                  <h6 className="py-2 px-3 hover:text-primary">Transactions</h6>
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
                  <h6 className="py-2 px-3 text-red-700">Logout</h6>
                </button>
              </li>
            </ul>
          ) : (
            <ul className="text-base font-medium w-60 px-3 py-6">
              <li className="my-4 ">
                <Link to="/signup">
                  <span className="cursor-pointer border-2 rounded border-primary w-fit bg-primary text-white px-4 py-2 ">
                    Join offpitch
                  </span>
                </Link>
              </li>
              <li className="">
                <Link to="/login">
                  <h6 className="py-2 px-3 hover:text-primary">Sign in</h6>
                </Link>
              </li>
              <li className="">
                <Link to="/explore">
                  <h6 className="py-2 px-3 hover:text-primary">Explore</h6>
                </Link>
              </li>
              <Link to="/user/tournament/new">
                <h6 className="py-2 px-3 hover:text-primary text-red-700">
                  Host a tournament
                </h6>
              </Link>
            </ul>
          )}
        </nav>
      </Box>
    </Drawer>
  );
}

Sidebar.propTypes = {
  openState: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default Sidebar;
