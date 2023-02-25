/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import CreateTournament from "../../components/CreateTournament/CreateTournament";

function NewTournament() {
  const auth = useSelector((state) => state.auth);

  return auth?.clubStatus !== "active" ? (
    <Navigate to="/user/club" replace />
  ) : (
    <CreateTournament />
  );
}

export default NewTournament;
