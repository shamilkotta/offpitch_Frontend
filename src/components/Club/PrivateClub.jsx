/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import follwersIcon from "../../assets/icons/followers.svg";
import smsIcon from "../../assets/icons/sms.svg";
import callIcon from "../../assets/icons/call.svg";
import PlayerFrom from "./PlayerForm";
import ClubForm from "./ClubForm";
import useAxiosPrivate from "../../hooks/userAxiosPrivate";
import { useErrorToast } from "../../hooks/useToast";
import spinnerIcon from "../../assets/icons/spinner.svg";
import { setClubData } from "../../app/slices/clubSlice";
import TournamentCard from "../Cards/TournamentCard";

function PrivateClub() {
  const [currentTab, setCurrentTab] = useState("players");
  const [addPlayerModal, setAddPlayerModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [data, setData] = useState({});
  const [players, setPlayers] = useState([]);
  const club = useSelector((state) => state.club);
  const dispatch = useDispatch();
  const [tournaments, setTournaments] = useState([]);
  const [currentList, setCurrentList] = useState([]);
  const [loadingTournaments, setLoadingTournaments] = useState(false);
  const [registered, setRegistered] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("active");
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
          dispatch(setClubData(res?.data?.data));
        } else {
          useErrorToast({
            message: res?.data?.message || "Something went wrong",
          });
          navigate(location.state?.from || "/user");
        }
      })
      .catch((err) => {
        useErrorToast({ message: err?.response?.data?.message });
        navigate(location.state?.from || "/user");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchTournaments = () => {
    axios
      .get("/user/tournaments")
      .then((res) => {
        if (res?.data?.success) {
          setTournaments(res?.data?.data);
        } else {
          setTournaments([]);
        }
      })
      .catch(() => {
        setTournaments([]);
      })
      .finally(() => {
        setLoadingTournaments(false);
      });
  };

  const fetchRegistered = () => {
    axios
      .get("/user/registered-tournaments")
      .then((res) => {
        if (res?.data?.success) {
          setRegistered(res?.data?.data);
        } else {
          setRegistered([]);
        }
      })
      .catch(() => {
        setRegistered([]);
      })
      .finally(() => {
        setLoadingTournaments(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    if (club.name) {
      setData(club);
      setPlayers(club.players);
      setLoading(false);
    } else fetchData();
  }, []);

  useEffect(() => {
    setCurrentFilter("active");
    if (currentTab === "tournaments" && !tournaments.length) {
      setLoadingTournaments(true);
      fetchTournaments();
    } else if (currentTab === "registered" && !registered.length) {
      setLoadingTournaments(true);
      fetchRegistered();
    }
  }, [currentTab]);

  useEffect(() => {
    if (currentTab === "tournaments")
      setCurrentList(
        tournaments.filter((value) => value.status === currentFilter)
      );
    else if (currentTab === "registered")
      setCurrentList(
        registered.filter((value) => value.status === currentFilter)
      );
  }, [currentFilter, tournaments, currentTab, registered]);

  return loading ? (
    <div className="flex justify-center items-center h-[90vh]">
      <img src={spinnerIcon} className="w-9 animate-spin" alt="Loading..." />
    </div>
  ) : (
    <div className="">
      <div className="max-w-[1400px] mx-auto py-16 px-5 sm:px-10 ">
        <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1  mb-8">
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
          <div className="order-4 text-gray-600 sm:order-5 md:order-4 row-span-1 col-start-1 col-end-3 md:col-start-2 md:col-end-4">
            <p className="">{data.description}</p>
          </div>
          <div className="order-3 md:order-5 row-span-1 col-start-2 col-end-3 flex flex-col sm:flex-row gap-x-3 gap-y-1 text-center text-base flex-wrap">
            <Link
              to={`/club/${data._id}`}
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
        <div className="mt-4 flex justify-between">
          <div className="flex gap-1 flex-wrap">
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
              My Tournaments
            </button>
            <button
              type="button"
              className={`px-3 py-1 rounded-r-sm  ${
                currentTab === "registered"
                  ? "bg-primary text-white"
                  : "bg-slate-200 text-black"
              }`}
              onClick={() => {
                setCurrentTab("registered");
              }}
            >
              Registered
            </button>
          </div>
          <div className="">
            {(currentTab === "tournaments" || currentTab === "registered") && (
              <select
                className=" px-3 py-1 rounded-r-sm bg-slate-200 outline-0"
                value={currentFilter}
                onChange={(e) => {
                  setCurrentFilter(e.target.value);
                }}
              >
                <option value="active">Upcoming</option>
                <option value="ended">Ended</option>
                {currentTab === "tournaments" && (
                  <option value="draft">Draft</option>
                )}
              </select>
            )}
          </div>
        </div>
        <div className="mt-12">
          {currentTab === "players" ? (
            <div className="grid grid-cols-2 min-[440px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 auto-rows-auto gap-2">
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
            <div className="mt-4 grid grid-cols-1 min-[580px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-auto gap-2">
              {loadingTournaments ? (
                <div>
                  <img
                    src={spinnerIcon}
                    className="w-8 animate-spin"
                    alt="Loading..."
                  />
                </div>
              ) : currentTab === "tournaments" ? (
                !currentList.length ? (
                  <div>No data found</div>
                ) : (
                  currentList.map((ele) => (
                    <TournamentCard
                      data={ele}
                      showEditButton={ele.status === "draft"}
                      showAvatar={false}
                      showBookMark={false}
                    />
                  ))
                )
              ) : !currentList.length ? (
                <div>No data found</div>
              ) : (
                currentList.map((ele) => (
                  <TournamentCard
                    data={ele}
                    showEditButton={ele.status === "draft"}
                    showAvatar={false}
                    showBookMark={false}
                  />
                ))
              )}
            </div>
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
          isEdit
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
