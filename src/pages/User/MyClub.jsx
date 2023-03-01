import React from "react";
import { useSelector } from "react-redux";

import NoClub from "../../components/Club/NoClub";
import PrivateClub from "../../components/Club/PrivateClub";

function MyClub() {
  const auth = useSelector((state) => state.auth);

  if (!auth?.club) return <NoClub />;

  if (auth?.club && auth?.clubStatus !== "active")
    return <NoClub status={auth?.clubStatus} />;

  return <PrivateClub />;
}

export default MyClub;
