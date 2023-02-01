import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";

function Navbar() {
  const [toggleNav, setToggleNav] = useState(false);

  return (
    <>
      <TopNav
        open={() => {
          setToggleNav(true);
        }}
      />
      {toggleNav && (
        <Sidebar
          close={() => {
            setToggleNav(false);
          }}
        />
      )}
    </>
  );
}

export default Navbar;
