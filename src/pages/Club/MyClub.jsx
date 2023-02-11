import React from "react";
import { useSelector } from "react-redux";

import NoClub from "../../components/Club/NoClub";
import PrivateClub from "../../components/Club/PrivateClub";

function MyClub() {
  const auth = useSelector((state) => state.auth);

  return auth?.club ? <PrivateClub /> : <NoClub />;
}

export default MyClub;
