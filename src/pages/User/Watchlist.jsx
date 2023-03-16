import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import calendarIcon from "../../assets/icons/calendar-tick.svg";
import spinnerIcon from "../../assets/icons/spinner.svg";
import noDataImg from "../../assets/img/no-data.svg";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function Watchlist() {
  const [currentList, setCurrentList] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [loadingTournaments, setLoadingTournaments] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("active");
  const axios = useAxiosPrivate();

  const fetchTournaments = () => {
    axios
      .get("/user/watchlist")
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

  useEffect(() => {
    setCurrentFilter("active");
    if (!tournaments.length) {
      setLoadingTournaments(true);
      fetchTournaments();
    }
  }, []);

  useEffect(() => {
    setCurrentList(
      tournaments.filter((value) => value.status === currentFilter)
    );
  }, [currentFilter, tournaments]);

  return (
    <div className="py-16">
      <hr />
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 box-border">
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
                    <h2 className="text-lg">You&apos;r list is empty!</h2>
                    <Link to="/explore" className="text-primary text-lg">
                      Explore
                    </Link>
                  </div>
                </div>
              ) : (
                <div>
                  {currentList.map((ele) => (
                    <Link
                      to={`/tournament/${ele._id}`}
                      key={ele._id}
                      className="flex gap-x-1 h-[80px] shadow-lg rounded-md mt-5 box-border"
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
                            <img alt="location" src={calendarIcon} />{" "}
                            <span className="ml-1 text-primary">
                              {ele?.start_date}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className="w-full min-[700px]:w-[35%] md:w-[30%]" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Watchlist;
