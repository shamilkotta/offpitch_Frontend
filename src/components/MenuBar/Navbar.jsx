import React, { useState } from "react";
import { useSelector } from "react-redux";
import AdminNavbar from "./AdminTopNav";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";

function Navbar() {
  const [toggleNav, setToggleNav] = useState(false);
  const auth = useSelector((state) => state.auth);

  return (
    <>
      {auth?.role === "admin" ? (
        <AdminNavbar />
      ) : (
        <TopNav
          open={() => {
            setToggleNav(true);
          }}
        />
      )}

      {toggleNav && (
        <Sidebar
          openState={toggleNav}
          close={() => {
            setToggleNav(false);
          }}
        />
      )}
    </>
  );
}

export default Navbar;
