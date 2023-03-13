import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import NoClub from "../../components/Club/NoClub";

function MyClub() {
  const auth = useSelector((state) => state.auth);

  if (!auth?.club) return <NoClub />;

  if (auth?.club && auth?.clubStatus !== "active")
    return <NoClub status={auth?.clubStatus} />;

  return <Outlet />;
}

export default MyClub;
