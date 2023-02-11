import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import useRefreshToken from "../hooks/useRefreshToken";
import spinnerIcon from "../assets/icons/spinner.svg";

function PersistLogin() {
  const [loading, setLoading] = useState(true);
  const refresh = useRefreshToken();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } finally {
        setLoading(false);
      }
    };

    if (!auth?.accessToken) verifyRefreshToken();
    else setLoading(false);
  }, []);

  return loading ? (
    <div className="h-screen flex justify-center items-center">
      <div>
        <img src={spinnerIcon} alt="Loading..." className="animate-spin w-11" />
      </div>
    </div>
  ) : (
    <Outlet />
  );
}

export default PersistLogin;
