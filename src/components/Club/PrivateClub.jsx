import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import follwersIcon from "../../assets/icons/followers.svg";
import smsIcon from "../../assets/icons/sms.svg";
import callIcon from "../../assets/icons/call.svg";
import PlayerFrom from "./PlayerForm";
import ClubForm from "./ClubForm";
import useAxiosPrivate from "../../hooks/userAxiosPrivate";
import { useErrorToast } from "../../hooks/useToast";
import spinnerIcon from "../../assets/icons/spinner.svg";

function PrivateClub() {
  const [currentTab, setCurrentTab] = useState("players");
  const [addPlayerModal, setAddPlayerModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [data, setData] = useState({});
  const [players, setPlayers] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(false);
  const axios = useAxiosPrivate();
  const location = useLocation();
  const navigate = useNavigate();

  const fetchData = () => {
    axios
      .get("/user/club")
      .then((res) => {
        if (res.data.success) {
          setData(res?.data?.data);
          setPlayers(res?.data?.data?.players);
          setTournaments(res?.data?.data?.tournaments);
          setData((prvs) => ({ ...prvs, players: "", tournaments: "" }));
        } else {
          useErrorToast({
            message: res?.data?.message || "Something went wrong",
          });
          navigate(location.state?.from || "/");
        }
      })
      .catch((err) => {
        useErrorToast({ message: err?.response?.data?.message });
        navigate(location.state?.from || "/");
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
    <div className="flex justify-center items-center h-[90vh]">
      <img src={spinnerIcon} className="w-9 animate-spin" alt="Loading..." />
    </div>
  ) : (
    <div className="">
      <div className="max-w-[1400px] mx-auto py-16 px-10 ">
        <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 grid-rows-[auto_auto_auto_1fr] mb-8">
          <div className="col-span-1 row-start-1 row-end-3 sm:row-end-4 order-1">
            <img
              src={data.profile}
              alt="profile"
              className="w-32 h-36 sm:w-36 h:w-40 border-2 border-black rounded"
            />
          </div>
          <div className="row-sapn-1 col-start-2 col-end-3 order-2 h-fit">
            <p className="text-2xl font-medium py-0 my-0">{data.name}</p>
          </div>
          <div className="order-5 sm:order-4 md:order-3 row-span-1 col-start-1 col-end-3 sm:col-start-2 sm:col-end-3 md:col-start-3 md:col-end-4">
            <button
              type="button"
              className="border bg-gray-200 font-medium px-3 py-1 rounded-sm"
              onClick={() => {
                setEditModal(true);
              }}
            >
              Edit details
            </button>
          </div>
          <div className="order-4 sm:order-5 md:order-4 row-span-1 col-start-1 col-end-3 md:col-start-2 md:col-end-4">
            <p className="">{data.description}</p>
          </div>
          <div className="order-3 md:order-5 row-span-1 col-start-2 col-end-3 flex gap-x-3 gap-y-1 text-center text-base flex-wrap">
            <Link
              to={`/club/${data.uid}`}
              state={{ from: location.pathname }}
              className="flex flex-nowrap gap-1 hover:text-primary items-center"
            >
              <img src={follwersIcon} alt="followers" className="w-5" />
              <p>{data.followers} followers</p>
            </Link>
            <a
              href={`mailto:${data.email}`}
              className="flex flex-nowrap gap-1 hover:text-primary items-center"
            >
              <img src={smsIcon} alt="followers" className="w-5" />
              <p className="text-ellipsis">{data.email}</p>
            </a>
            <a
              href={`tel:${data.phone}`}
              className="flex flex-nowrap gap-1 hover:text-primary items-center"
            >
              <img src={callIcon} alt="followers" className="w-5" />
              <p>{data.phone}</p>
            </a>
          </div>
        </div>
        <hr />
        <div className="mt-4">
          <div className="flex gap-1 flex-nowrap">
            <button
              type="button"
              className={`${
                currentTab === "players"
                  ? "bg-primary text-white"
                  : "bg-slate-200 text-black"
              } px-3 py-1 rounded-l-sm`}
              onClick={() => {
                setCurrentTab("players");
              }}
            >
              Players
            </button>
            <button
              type="button"
              className={`px-3 py-1 rounded-r-sm  ${
                currentTab === "tournaments"
                  ? "bg-primary text-white"
                  : "bg-slate-200 text-black"
              }`}
              onClick={() => {
                setCurrentTab("tournaments");
              }}
            >
              Tournaments
            </button>
            {currentTab === "tournaments" && (
              <select className=" px-3 py-1 rounded-r-sm bg-slate-200 outline-0">
                <option value="upcoming">Upcoming</option>
                <option value="ended">Ended</option>
              </select>
            )}
          </div>
        </div>
        <div className="mt-12">
          {currentTab === "players" ? (
            <div className="grid grid-cols-2 min-[440px]:grid-cols-3  sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 auto-rows-auto gap-2">
              <button
                type="button"
                className="w-full aspect-[7/8] p-4 bg-slate-200"
                onClick={() => {
                  setAddPlayerModal(true);
                }}
              >
                <div className="w-full h-full flex justify-center items-center border-dashed border-2 border-sky-500">
                  Add a player
                </div>
              </button>
              {players?.map((ele) => (
                <div
                  // eslint-disable-next-line no-underscore-dangle
                  key={ele._id}
                  className="w-full aspect-[7/8] px-2 rounded border-black shadow border relative bg-center bg-cover bg-no-repeat flex items-end after:content-[''] after:bg-gradient-to-t after:from-black after:via-transparent after:to-transparent after:absolute after:top-0 after:bottom-0 after:right-0 after:left-0"
                  style={{
                    backgroundImage: `url('${ele.profile}')`,
                  }}
                >
                  <div className="z-10 text-white mb-2">
                    <h2 className="text-lg font-bold leading-5">{ele.name}</h2>
                    <p className="">Age: {ele.age}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
      {addPlayerModal && (
        <PlayerFrom
          onClose={() => {
            setAddPlayerModal(false);
          }}
          reRender={fetchData}
        />
      )}
      {editModal && (
        <ClubForm
          onClose={() => {
            setEditModal(false);
          }}
          data={{
            name: data.name,
            email: data.email,
            phone: data.phone,
            description: data.description,
          }}
          profile={data.profile}
          reRender={fetchData}
        />
      )}
    </div>
  );
}

export default PrivateClub;
