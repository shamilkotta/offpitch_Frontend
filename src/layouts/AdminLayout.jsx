import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import AdminMobSidebar from "../components/MenuBar/AdminMobSidebar";
import AdminSidebar from "../components/MenuBar/AdminSidebar";
import menuIcon from "../assets/icons/menu.svg";
import useLogout from "../hooks/useLogout";

function AdminLayout() {
  const [toggleNav, setToggleNav] = useState(false);
  const logout = useLogout();

  return (
    <div className="bg-gray-200">
      <div className="max-w-[1600px] grid grid-cols-[auto_1fr] h-full w-full mx-auto relative">
        <div className="sm:hidden">
          <AdminMobSidebar
            openState={toggleNav}
            close={() => {
              setToggleNav(false);
            }}
          />
        </div>
        <div className="col-start-1 col-end-2 row-start-1 row-end-3 hidden sm:block">
          <AdminSidebar />
        </div>
        <div className="col-start-2 w-full col-end-3 px-3 py-3 sm:px-6 h-[100vh]  overflow-y-auto">
          <div className="h-16 sticky rounded flex items-center px-3 sm:static top-0 left-2 right-2 justify-between bg-slate-100 shadow-md">
            <div className="hidden sm:block" />
            <img
              className="sm:hidden"
              src={menuIcon}
              alt="menu"
              onClick={() => {
                setToggleNav(true);
              }}
            />
            <button
              type="button"
              onClick={() => {
                logout();
              }}
              className="text-red-500"
            >
              Logout
            </button>
          </div>
          <div className="mt-3">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
