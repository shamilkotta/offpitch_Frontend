import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import Router from "./pages/Router";

function App() {
  return (
    <div className="">
      <ToastContainer />
      <Routes>
        <Route path="/*" element={<Router />} />
      </Routes>
    </div>
  );
}

export default App;
