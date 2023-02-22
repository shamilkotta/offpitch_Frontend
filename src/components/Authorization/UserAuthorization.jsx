/* eslint-disable no-nested-ternary */
import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, Navigate } from "react-router-dom";

function UserAuthorization() {
  const auth = useSelector((state) => state.auth);
  const location = useLocation();

  return auth?.accessToken && auth?.role !== "admin" ? (
    <Outlet />
  ) : auth?.accessToken && auth?.role === "admin" ? (
    <Navigate to="/admin" state={{ from: location.pathname }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
}

export default UserAuthorization;
