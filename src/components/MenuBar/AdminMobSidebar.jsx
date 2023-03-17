import React from "react";
import { Drawer, Box } from "@mui/material";
import PropTypes from "prop-types";
import { NavLink, useLocation } from "react-router-dom";
import { FaUsers, FaFolderOpen } from "react-icons/fa";
import { MdDashboard, MdPayments } from "react-icons/md";

import logoutIcon from "../../assets/icons/logout.svg";

function AdminMobSidebar({ openState, close, logout }) {
  const location = useLocation();

  const navLinks = [
    {
      id: 1,
      url: "/admin",
      holder: "Dashboard",
      icon: <MdDashboard size="20px" />,
    },
    {
      id: 2,
      url: "/admin/users",
      holder: "Users",
      icon: <FaUsers size="20px" />,
    },
    {
      id: 3,
      url: "/admin/clubs",
      holder: "Clubs",
      icon: <FaFolderOpen size="20px" />,
    },
    {
      id: 3,
      url: "/admin/transactions",
      holder: "Transactions",
      icon: <MdPayments size="22px" />,
    },
  ];

  return (
    <Drawer anchor="left" open={openState} className="relative" onClose={close}>
      <Box role="presentation" onClick={close} onKeyDown={close}>
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="w-full">
              <img src="/logo.svg" className="h-6 mt-7 ml-5 " alt="offpitch" />
            </div>
            <nav className="mt-16">
              <ul className="px-4 w-64">
                {navLinks.map((ele) => (
                  <li className="" key={ele.id}>
                    <NavLink
                      to={ele.url}
                      end
                      state={{ from: location.pathname }}
                      className={({ isActive }) =>
                        `${
                          isActive
                            ? "bg-white text-gray-700 font-medium shadow-xl"
                            : "text-gray-500"
                        } my-1 py-2 px-4  rounded-md  flex gap-x-4 items-center `
                      }
                    >
                      <span className="bg-white p-2 shadow-lg rounded">
                        {ele.icon}
                      </span>
                      <span>{ele.holder}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="h-full">
            <div className="mx-auto w-fit">
              <button
                type="button"
                onClick={() => {
                  logout();
                }}
                className="text-red-500 absolute flex bottom-0 left-6 mb-3 items-center gap-x-2 font-medium"
              >
                <img src={logoutIcon} className="w-5" alt="logout" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </Box>
    </Drawer>
  );
}

AdminMobSidebar.propTypes = {
  openState: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export default AdminMobSidebar;
