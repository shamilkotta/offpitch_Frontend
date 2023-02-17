import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import CreateTournament from "../../components/CreateTournament/CreateTournament";
import useAxiosPrivate from "../../hooks/userAxiosPrivate";
import spinnerIcon from "../../assets/icons/spinner.svg";

function EditTournament() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const axios = useAxiosPrivate();
  const { id } = useParams();
  // const location = useLocation();
  const navigate = useNavigate();

  const fetchData = () => {
    axios
      .get(`/user/tournament/${id}`)
      .then((res) => {
        if (res?.data?.success && res?.data?.data?.status === "draft") {
          const result = res.data.data;
          result.cover = {
            url: res.data?.data?.cover,
          };
          setData(result);
        } else
          navigate("/not-found", {
            replace: true,
          });
      })
      .catch(() => {
        navigate("/not-found", {
          replace: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  return loading ? (
    <div className="flex justify-center items-center h-[80vh]">
      <img src={spinnerIcon} className="w-8 animate-spin" alt="Loading..." />
    </div>
  ) : (
    <CreateTournament data={data} />
  );
}

export default EditTournament;
