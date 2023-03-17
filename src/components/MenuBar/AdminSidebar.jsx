import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaUsers, FaFolderOpen } from "react-icons/fa";
import { MdDashboard, MdPayments } from "react-icons/md";
import PropTypes from "prop-types";

import logoutIcon from "../../assets/icons/logout.svg";

function AdminSidebar({ logout }) {
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
    <nav className="h-full bg-white/30 box-border overflow-auto flex flex-col justify-between w-fit min-[850px]:w-64 ">
      <div className="w-full">
        <img
          src="/logo.svg"
          className="h-6 mt-7 ml-5 hidden min-[850px]:block"
          alt="offpitch"
        />
        <img
          src="/favicon.svg"
          className="h-6 w-6 mt-5 mx-auto min-[850px]:hidden"
          alt="offpitch"
        />
      </div>
      <ul className="px-4 hidden min-[850px]:block">
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
              <span className="bg-white p-2 shadow-lg rounded">{ele.icon}</span>
              <span>{ele.holder}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      <ul className="px-4 min-[850px]:hidden">
        {navLinks.map((ele) => (
          <li className="" key={ele.id}>
            <NavLink to={ele.url} end state={{ from: location.pathname }}>
              {({ isActive }) => (
                <div
                  className={`my-1 w-12 h-12 flex ${
                    isActive
                      ? "bg-white text-gray-700 font-medium shadow-xl"
                      : "text-gray-500"
                  } items-center justify-center p-2  rounded`}
                >
                  {ele.icon}
                </div>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="w-full">
        <div className="mx-auto w-fit hidden min-[850px]:block">
          <button
            type="button"
            onClick={() => {
              logout();
            }}
            className="text-red-500 mb-5 flex items-center gap-x-2 font-medium"
          >
            <img src={logoutIcon} className="w-5" alt="logout" />
            Logout
          </button>
        </div>
        <div className="mx-auto w-fit min-[850px]:hidden">
          <button
            type="button"
            onClick={() => {
              logout();
            }}
            className="text-red-500 mb-5 flex items-center gap-x-2 font-medium"
          >
            <img src={logoutIcon} className="w-6" alt="logout" />
          </button>
        </div>
      </div>
    </nav>
  );
}

AdminSidebar.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default AdminSidebar;
