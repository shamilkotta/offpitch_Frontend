import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, IconButton, Avatar, Menu } from "@mui/material";

import useScrollPosition from "../../hooks/useScrollPosition";
import menuIcon from "../../assets/icons/menu.svg";
import arrowDownIcon from "../../assets/icons/arrow-down.svg";
import { logoutApi } from "../../helpers/apis/auth";
import { clearAuth } from "../../app/slices/authSlice";

function TopNav({ open }) {
  const scrollpos = useScrollPosition();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const location = useLocation();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <nav
      className={`sticky z-20 top-0 right-0 left-0 box-border ${
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
            <Link to="/" state={{ from: location.pathname }}>
              <img src="/logo.svg" alt="offpitch" width="110" height="100" />
            </Link>
          </li>
          <li className="hidden md:block ">
            <Link to="/explore" state={{ from: location.pathname }}>
              <h3 className="cursor-pointer hover:text-primary">Explore</h3>
            </Link>
          </li>
        </ul>
        {auth?.accessToken ? (
          <ul className="flex justify-between items-center gap-x-10">
            <li className="hidden sm:block">
              <Link
                to="/user/tournament/new"
                state={{ from: location.pathname }}
              >
                <h3 className="cursor-pointer text-red-600 hover:text-primary">
                  Host a tournament
                </h3>
              </Link>
            </li>

            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={auth.name}
                  src={auth.profile}
                  sx={{ width: 32, height: 32 }}
                />
                <img
                  src={arrowDownIcon}
                  alt="profile"
                  className="w-5 h-5 my-auto mx-auto"
                />
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <ul className="px-2 w-44">
                  <li className="border-b" onClick={handleCloseUserMenu}>
                    <Link to="/user" state={{ from: location.pathname }}>
                      <h6 className="py-2 px-3 text-base hover:text-primary">
                        Profile
                      </h6>
                    </Link>
                  </li>
                  <li className="" onClick={handleCloseUserMenu}>
                    <Link to="/user/club" state={{ from: location.pathname }}>
                      <h6 className="py-2 px-3 text-base hover:text-primary">
                        Club
                      </h6>
                    </Link>
                  </li>
                  <li className="" onClick={handleCloseUserMenu}>
                    <Link
                      to="/user/watchlist"
                      state={{ from: location.pathname }}
                    >
                      <h6 className="py-2 px-3 text-base hover:text-primary">
                        Watchlist
                      </h6>
                    </Link>
                  </li>
                  <li className="" onClick={handleCloseUserMenu}>
                    <Link
                      to="/user/transactions"
                      state={{ from: location.pathname }}
                    >
                      <h6 className="py-2 px-3 text-base hover:text-primary">
                        Transactions
                      </h6>
                    </Link>
                  </li>
                  <li className="border-t " onClick={handleCloseUserMenu}>
                    <button
                      type="button"
                      onClick={() => {
                        dispatch(clearAuth());
                        logoutApi();
                      }}
                    >
                      <h6 className="py-2 px-3 text-base text-red-700">
                        Logout
                      </h6>
                    </button>
                  </li>
                </ul>
              </Menu>
            </Box>
          </ul>
        ) : (
          <ul className="flex justify-between items-center gap-x-10">
            <li className="hidden md:block">
              <Link
                to="/user/tournament/new"
                state={{ from: location.pathname }}
              >
                <h3 className="cursor-pointer text-red-600 hover:text-primary">
                  Host a tournament
                </h3>
              </Link>
            </li>
            <li className="hidden sm:block">
              <Link to="/login" state={{ from: location.pathname }}>
                <h3 className="cursor-pointer hover:text-primary">Sign in</h3>
              </Link>
            </li>
            <li>
              <Link to="/signup" state={{ from: location.pathname }}>
                <h3 className="cursor-pointer sm:border-2 sm:rounded border-black sm:hover:bg-primary sm:hover:border-primary hover:text-primary sm:hover:text-white px-3 py-0">
                  Join
                </h3>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

TopNav.propTypes = {
  open: PropTypes.func.isRequired,
};

export default TopNav;
