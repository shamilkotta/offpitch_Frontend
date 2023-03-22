import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/MenuBar/Navbar";

function UserLayout() {
  return (
    <>
      <Navbar />
      <div className="min-h-[90vh]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default UserLayout;
