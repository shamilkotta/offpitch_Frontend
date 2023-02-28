/* eslint-disable no-nested-ternary */
import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, Navigate } from "react-router-dom";

function AdminAuthorization() {
  const auth = useSelector((state) => state.auth);
  const location = useLocation();

  return auth?.accessToken && auth?.role === "admin" ? (
    <Outlet />
  ) : auth?.accessToken ? (
    <Navigate to="/not-found" replace />
  ) : (
    <Navigate to="/admin/login" state={{ from: location.pathname }} replace />
  );
}

export default AdminAuthorization;
