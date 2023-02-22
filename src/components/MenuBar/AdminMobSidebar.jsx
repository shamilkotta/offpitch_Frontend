import React from "react";
import { Drawer, Box } from "@mui/material";
import PropTypes from "prop-types";
import { NavLink, useLocation } from "react-router-dom";
import { FaUsers, FaFolderOpen } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

function AdminMobSidebar({ openState, close }) {
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
  ];

  return (
    <Drawer anchor="left" open={openState} onClose={close}>
      <Box role="presentation" onClick={close} onKeyDown={close}>
        <nav className="mt-10">
          <div />
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
      </Box>
    </Drawer>
  );
}

AdminMobSidebar.propTypes = {
  openState: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default AdminMobSidebar;
