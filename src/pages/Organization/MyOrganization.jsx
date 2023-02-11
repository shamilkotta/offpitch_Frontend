import React from "react";
import { useSelector } from "react-redux";

import NoOrg from "../../components/Organization/NoOrg";
import PrivateOrg from "../../components/Organization/PrivateOrg";

function MyOrganization() {
  const auth = useSelector((state) => state.auth);

  return auth?.organization ? <PrivateOrg /> : <NoOrg />;
}

export default MyOrganization;
