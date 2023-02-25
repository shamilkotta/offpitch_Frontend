import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, IconButton, Avatar, Menu } from "@mui/material";

import useScrollPosition from "../../hooks/useScrollPosition";
import arrowDownIcon from "../../assets/icons/arrow-down.svg";
import useLogout from "../../hooks/useLogout";

function AdminNavbar() {
  const scrollpos = useScrollPosition();
  const auth = useSelector((state) => state.auth);
  const location = useLocation();
  const logout = useLogout();
  const [anchorElUser, setAnchorElUser] = useState(null);

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
        <ul className="flex justify-between items-center gap-x-5">
          <li className="">
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
            <ul className="px-1 w-44">
              <li className="border-b ">
                <Link to="/admin" state={{ from: location.pathname }}>
                  <h6 className="py-2 px-3 text-base hover:text-primary">
                    Dashboard
                  </h6>
                </Link>
              </li>
              <li className="border-t ">
                <button
                  type="button"
                  onClick={() => {
                    logout();
                  }}
                >
                  <h6 className="py-2 px-3 text-base text-red-700">Logout</h6>
                </button>
              </li>
            </ul>
          </Menu>
        </Box>
      </div>
    </nav>
  );
}

export default AdminNavbar;
