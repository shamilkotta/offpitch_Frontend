import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { BiMenuAltRight } from "react-icons/bi";

import AdminMobSidebar from "../components/MenuBar/AdminMobSidebar";
import AdminSidebar from "../components/MenuBar/AdminSidebar";
// import menuIcon from "../assets/icons/menu.svg";
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
            logout={logout}
            close={() => {
              setToggleNav(false);
            }}
          />
        </div>
        <div className="col-start-1 col-end-2 row-start-1 row-end-3 hidden sm:block">
          <AdminSidebar logout={logout} />
        </div>
        <div className="col-start-2 w-full col-end-3 px-3 py-3 sm:px-6 h-[100vh]  overflow-y-auto">
          <div className="h-16 sticky rounded flex items-center px-3 sm:static top-0 left-2 right-2 justify-between">
            <div className="">
              <h1 className="text-lg font-medium">Welcome!</h1>
            </div>
            <BiMenuAltRight
              className="sm:hidden text-3xl"
              onClick={() => {
                setToggleNav(true);
              }}
            />
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
