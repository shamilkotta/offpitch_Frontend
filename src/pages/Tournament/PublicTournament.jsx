import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import About from "../../components/Tournament/About";
import Header from "../../components/Tournament/Header";
import Sidebar from "../../components/Tournament/Sidebar";
import Notfound from "../Notfound";
import spinnerIcon from "../../assets/icons/spinner.svg";
import { getTournament } from "../../helpers/apis/guest";

function PublicTournament() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [dataFound, setDataFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const auth = useSelector((state) => state.auth);

  const fetchTournament = () => {
    getTournament(id, auth)
      .then((res) => {
        if (res.data.success) {
          setDataFound(true);
          setData(res.data.data);
        }
      })
      .catch(() => {
        setDataFound(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    setDataFound(false);
    fetchTournament();
  }, []);

  if (loading && !dataFound)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <img src={spinnerIcon} className="w-9 animate-spin" alt="Loading..." />
      </div>
    );

  return !loading && !dataFound ? (
    <Notfound />
  ) : (
    <div className="max-w-[1400px] px-5 py-10 sm:px-10 mx-auto">
      <p className="text-3xl font-bold mb-5">{data.title}</p>
      <div className="grid auto-cols-auto md:grid-cols-[60%_auto] grid-rows-[auto_auto_auto]">
        <div className="col-start-1 order-1 col-end-2 mr-2">
          <Header data={data} />
        </div>
        <div className="col-start-1 order-3 col-end-2 mr-2 row-start-3 row-end-4 md:row-start-2 md:row-end-3">
          <About data={data} />
        </div>
        <div className="col-start-1 col-end-2 md:col-start-2 md:col-end-3 order-2 mt-6 md:mt-2 row-start-2 row-end-3 md:row-start-1 md:row-end-4">
          <Sidebar data={data} />
        </div>
      </div>
    </div>
  );
}

export default PublicTournament;
