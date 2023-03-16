/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import spinnerIcon from "../../assets/icons/spinner.svg";
import noDataImg from "../../assets/img/no-data.svg";
import locationIcon from "../../assets/icons/location.svg";
import calendarIcon from "../../assets/icons/calendar-tick.svg";

function Tournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [currentList, setCurrentList] = useState([]);
  const [loadingTournaments, setLoadingTournaments] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("active");
  const [registered, setRegistered] = useState([]);
  const [draft, setDraft] = useState([]);
  const [live, setLive] = useState([]);
  const [pendingReg, setPendingReg] = useState([]);
  const axios = useAxiosPrivate();
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState(
    location.state?.tab || "tournaments"
  );

  const fetchTournaments = () => {
    axios
      .get("/user/tournaments")
      .then((res) => {
        if (res?.data?.success) {
          setTournaments(res?.data?.data);
          setDraft(res?.data?.data.filter((value) => value.status === "draft"));
          setLive(
            res?.data?.data
              .filter((value) => value.status === "live")
              .slice(0, 5)
          );
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
      .get("/user/tournaments/registered")
      .then((res) => {
        if (res?.data?.success) {
          setRegistered(res?.data?.data);
          setPendingReg(
            res?.data?.data.filter((value) => value.status === "pending")
          );
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

  return (
    <div className="py-16">
      <hr />
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 box-border">
        <div className="flex -mt-8">
          <div className="flex gap-1 overflow-auto ml-auto mr-0">
            <Link to="/user/club" className="text-gray-500 px-3 py-1">
              Overview
            </Link>
            <button
              type="button"
              onClick={() => {
                setCurrentTab("tournaments");
              }}
              className={`px-3 py-1 ${
                currentTab === "tournaments" ? "text-primary" : "text-gray-500"
              }`}
            >
              Tournaments
            </button>
            <button
              type="button"
              onClick={() => {
                setCurrentTab("registered");
              }}
              className={`px-3 py-1 ${
                currentTab === "registered" ? "text-primary" : "text-gray-500"
              }`}
            >
              Registered
            </button>
          </div>
        </div>
        <div className="mt-3 flex gap-x-1">
          <button
            type="button"
            className={`${
              currentFilter === "active"
                ? "bg-primary text-white"
                : "bg-slate-200 text-black"
            } py-1 px-3`}
            onClick={() => {
              setCurrentFilter("active");
            }}
          >
            Upcoming
          </button>
          <button
            type="button"
            className={`${
              currentFilter === "live"
                ? "bg-primary text-white"
                : "bg-slate-200 text-black"
            } py-1 px-3`}
            onClick={() => {
              setCurrentFilter("live");
            }}
          >
            Live
          </button>
          <button
            type="button"
            className={`${
              currentFilter === "ended"
                ? "bg-primary text-white"
                : "bg-slate-200 text-black"
            } py-1 px-3`}
            onClick={() => {
              setCurrentFilter("ended");
            }}
          >
            Ended
          </button>
        </div>
        {loadingTournaments ? (
          <div className="flex justify-center items-center h-[80vh]">
            <img
              src={spinnerIcon}
              className="w-9 animate-spin"
              alt="Loading..."
            />
          </div>
        ) : (
          <div className="flex gap-y-10 flex-col min-[700px]:flex-row justify-between">
            <div className="w-full min-[700px]:w-[60%] md:w-[65%]">
              {!currentList.length ? (
                <div className="h-[70vh] flex justify-center flex-col items-center">
                  <img
                    src={noDataImg}
                    className="w-52"
                    alt="waiting for approval"
                  />
                  <div className="py-6 px-5  flex flex-wrap justify-center items-center gap-x-2 text-center">
                    {currentFilter === "active" ? (
                      currentTab === "tournaments" ? (
                        <>
                          <h2 className="text-lg text-center">
                            You don&apos;t have active tournaments!
                          </h2>
                          <Link
                            to="/user/tournament/new"
                            className="text-primary text-lg"
                          >
                            Host new
                          </Link>
                        </>
                      ) : (
                        <>
                          <h2 className="text-lg">
                            You don&apos;t have registered tournaments!
                          </h2>
                          <Link to="/explore" className="text-primary text-lg">
                            Explore
                          </Link>
                        </>
                      )
                    ) : (
                      <h2 className="text-lg">No tournaments found!</h2>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  {currentList.map((ele) => (
                    <Link
                      to={`/tournament/${ele._id}`}
                      key={ele._id}
                      className="flex gap-x-1 h-[100px] shadow-lg rounded-md mt-5 box-border"
                    >
                      <div
                        className="aspect-[16/9] max-w-[30%] bg-center rounded-l-md bg-no-repeat bg-cover relative"
                        style={{ backgroundImage: `url('${ele.cover}')` }}
                      />
                      <div className="py-2 px-2">
                        <p className="text-base sm:text-lg overflow-hidden text-ellipsis tournament-title">
                          {ele.title}
                        </p>
                        <div className="flex justify-start flex-wrap gap-x-5 gap-y-1 my-1 text-xs sm:text-sm">
                          <div className="flex">
                            <img alt="location" src={locationIcon} />{" "}
                            <span className="ml-1 text-primary">
                              {ele?.location}
                            </span>
                          </div>
                          <div className="flex">
                            <img alt="location" src={calendarIcon} />{" "}
                            <span className="ml-1 text-primary">
                              {ele?.start_date}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm">
                          70 <span className="text-gray-500">registered</span>
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className="w-full min-[700px]:w-[35%] md:w-[30%]">
              {currentTab === "tournaments" ? (
                <>
                  {currentFilter !== "live" && live.length > 0 && (
                    <div>
                      <h1>Live :</h1>
                      <hr />
                      {live.map((ele) => (
                        <Link
                          key={ele._id}
                          to={`/tournament/${ele?._id}`}
                          className="flex gap-x-2 px-2 items-center rounded-md mt-1 hover:bg-gradient-to-r hover:from-slate-200 hover:to-slate-50 box-border"
                        >
                          <img
                            src={ele.profile}
                            className="rounded-full w-8 h-8"
                            alt="s"
                          />
                          <div className="py-2">
                            <p className="-mb-1 text-red-600 text-sm">Live</p>
                            <p className="text-sm sm:text-base overflow-hidden text-ellipsis tournament-title">
                              {ele.title}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                  <div>
                    <h1>Draft :</h1>
                    <hr />
                    {!draft.length ? (
                      <div className="flex justify-center gap-2 flex-wrap h-36 items-center w-full">
                        <p>
                          No drafts&nbsp;
                          <Link
                            to="/user/tournament/new"
                            className="text-primary"
                          >
                            Create new
                          </Link>
                        </p>
                      </div>
                    ) : (
                      draft.map((ele) => (
                        <Link
                          key={ele._id}
                          to={`/user/tournament/${ele?._id}/edit`}
                          className="flex gap-x-2 px-2 items-center rounded-md mt-1 hover:bg-gradient-to-r hover:from-slate-200 hover:to-slate-50 box-border"
                        >
                          <img
                            src={ele.cover}
                            className="rounded-full w-8 h-8"
                            alt="s"
                          />
                          <div className="py-2">
                            <p className="text-sm sm:text-base overflow-hidden text-ellipsis tournament-title">
                              {ele.title}
                            </p>
                            <p className="-mt-1 text-slate-400 text-sm">
                              Starting : {ele.start_date}
                            </p>
                          </div>
                        </Link>
                      ))
                    )}
                  </div>
                </>
              ) : (
                <div>
                  <h1>Pending :</h1>
                  <hr />
                  {pendingReg.map((ele) => (
                    <Link
                      key={ele._id}
                      to={`/user/tournament/${ele?._id}/edit`}
                      className="flex gap-x-2 px-2 items-center rounded-md mt-1 hover:bg-gradient-to-r hover:from-slate-200 hover:to-slate-50 box-border"
                    >
                      <img
                        src={ele.cover}
                        className="rounded-full w-8 h-8"
                        alt="s"
                      />
                      <div className="py-2">
                        <p className="text-sm sm:text-base overflow-hidden text-ellipsis tournament-title">
                          {ele.title}
                        </p>
                        <p className="-mt-1 text-slate-400 text-sm">
                          Last date : {ele.last_date}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tournaments;
