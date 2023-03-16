/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import calendarIcon from "../../assets/icons/calendar-tick-dark.svg";
import locationIcon from "../../assets/icons/location-dark.svg";
import ticketIcon from "../../assets/icons/ticket.svg";
import calendarIconLight from "../../assets/icons/calendar-tick.svg";
import locationIconLight from "../../assets/icons/location.svg";
import clockIcon from "../../assets/icons/clock.svg";
import { InputSubmit } from "../InputFields/InputFields";
import RegisterForm from "./RegisterForm";
import { useErrorToast, useSuccessToast } from "../../hooks/useToast";
import deniedImg from "../../assets/img/access-denied.svg";
import registredImg from "../../assets/img/registered.svg";
import useAxiosPrivate from "../../hooks/userAxiosPrivate";
import spinnerIcon from "../../assets/icons/spinner.svg";

function CountdownTimer({ date }) {
  const [countdown, setCountdown] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const targetDate = new Date(date);
      targetDate.setDate(targetDate.getDate() + 1);
      const currentDate = new Date();
      const timeDiff = targetDate.getTime() - currentDate.getTime();
      setCountdown({
        days: Math.floor(timeDiff / (1000 * 60 * 60 * 24))
          .toString()
          .padStart(2, "0"),
        hours: Math.floor((timeDiff / (1000 * 60 * 60)) % 24)
          .toString()
          .padStart(2, "0"),
        minutes: Math.floor((timeDiff / (1000 * 60)) % 60)
          .toString()
          .padStart(2, "0"),
        seconds: Math.floor((timeDiff / 1000) % 60)
          .toString()
          .padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="shadow-lg rounded-md px-3 py-4">
      <h1 className="my-2 text-md mb-3 text-slate-500 text-center">
        Registration closes in
      </h1>
      <div className="flex justify-center items-center">
        <div className="mx-auto">
          <p className="text-2xl text-center font-medium ">{countdown.days}</p>
          <p className="text-sm text-center text-slate-600">Days</p>
        </div>
        <div className="mx-auto">
          <p className="text-2xl text-center font-medium ">{countdown.hours}</p>
          <p className="text-sm text-center text-slate-600">Hours</p>
        </div>
        <div className="mx-auto">
          <p className="text-2xl text-center font-medium ">
            {countdown.minutes}
          </p>
          <p className="text-sm text-center text-slate-600">Minutes</p>
        </div>
        <div className="mx-auto">
          <p className="text-2xl text-center font-medium ">
            {countdown.seconds}
          </p>
          <p className="text-sm text-center text-slate-600">Seconds</p>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ data }) {
  const [registerModal, setRegisterModal] = useState(false);
  const [isRegistered, setIsRegistered] = useState(data?.isRegistered);
  const auth = useSelector((state) => state.auth);
  const [tournamentScheduler, setTournamentScheduler] = useState(false);
  const axios = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const scheduleTournament = () => {
    setTournamentScheduler(true);
    axios
      .get(`/user/tournament/${data._id}/schedule`)
      .then((res) => {
        if (res?.data?.success)
          useSuccessToast({ message: res?.data?.message });
        else
          useErrorToast({
            message: res?.data?.message || "Something went wrong",
          });
      })
      .catch((err) => {
        useErrorToast({
          message: err?.response?.data?.message || "Something went wrong",
        });
      })
      .finally(() => {
        setTournamentScheduler(false);
      });
  };

  return (
    <div className="mx-auto md:px-3 md:max-w-[450px] mb-6">
      <div className="mb-6">
        <p>{data.short_description}</p>
      </div>
      <div className="flex justify-start gap-x-10 gap-y-3 flex-wrap my-6">
        <div className="flex gap-1">
          <button
            type="button"
            className="bg-slate-200/70 p-3 aspect-square h-full rounded"
          >
            <img
              src={calendarIconLight}
              alt="date"
              className="mx-auto h-full w-full"
            />
          </button>
          <div className="whitespace-nowrap text-sm">
            <p className="text-base">
              {data?.start_date?.split(" ").slice(0, 2).join(" ")}
            </p>
            <p className="text-base -mt-2">
              {data?.start_date?.split(" ").splice(2)}
            </p>
          </div>
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            className="bg-slate-200/70 p-3 aspect-square h-full rounded"
          >
            <img
              src={locationIconLight}
              alt="date"
              className="mx-auto h-full w-full"
            />
          </button>
          <div className="whitespace-nowrap  text-sm">
            <p className="text-base">{data?.location?.split(",")[0]}</p>
            <p className="text-base -mt-1">
              {data?.location?.split(",").splice(1).join(",")}
            </p>
          </div>
        </div>
      </div>

      <hr />

      {data?.tickets?.matchday_ticket?.is ||
      data?.tickets?.season_ticket?.is ? (
        <div className="my-10">
          <p className="text-xl font-semibold mb-3">Buy tickets</p>
          <div className="border rounded-lg py-2 px-3">
            <p className="text-base text-gray-600">{data?.host?.name}</p>
            <p className="text-lg -mt-1 mb-4 font-medium">{data?.title}</p>
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              <div className="flex flex-col gap-y-1">
                <div className="flex items-center gap-1">
                  <img src={calendarIcon} alt="calendar" />
                  <p className="text-sm">{data?.start_date}</p>
                </div>
                <div className="flex items-center gap-1">
                  <img src={locationIcon} alt="calendar" />
                  <p className="text-sm">
                    {data?.location}
                    {data?.state}, {data?.country}
                  </p>
                </div>
              </div>
              <div>
                {data?.tickets?.season_ticket.is && (
                  <div className="flex items-center gap-1">
                    <img src={ticketIcon} alt="calendar" className="w-4" />
                    <p className="text-sm">Season ticket</p>
                  </div>
                )}
                {data?.tickets?.matchday_ticket.is && (
                  <div className="flex items-center gap-1">
                    <img src={ticketIcon} alt="calendar" className="w-4" />
                    <p className="text-sm">Matchday ticket</p>
                  </div>
                )}
              </div>
            </div>
            <div className="border border-dashed my-4 w-full" />
            <div className="flex justify-between">
              <div>
                <p className="">
                  ₹
                  <span className="text-3xl font-semibold">
                    {data?.tickets?.matchday_ticket.is
                      ? data?.tickets?.matchday_ticket.amount
                      : data?.tickets?.season_ticket.amount}
                  </span>
                </p>
              </div>
              <InputSubmit
                type="button"
                value="Buy now"
                className="w-1/3 min-w-[100px] h-9"
              />
            </div>
          </div>
        </div>
      ) : (
        <div />
      )}

      <hr />

      {(!isRegistered || data?.isHost) &&
      data?.registration?.status === "open" ? (
        <div className="mt-5">
          <CountdownTimer date={data?.registration?.last_date} />
        </div>
      ) : (
        data?.isHost &&
        data?.registration?.status === "closed" && (
          <div className="mt-5 rounded-md px-3 py-4 flex justify-between items-center">
            <p className="text-red-600 text-lg font-medium">
              Schedule tournament
            </p>
            <button
              className="hover:shadow border flex gap-x-2 disabled:bg-slate-300 disabled:border-slate-300 disabled:text-gray-600 border-red-600 rounded text-red-600 hover:bg-red-600 hover:text-white px-3 py-1"
              type="button"
              onClick={() => {
                scheduleTournament();
              }}
              disabled={tournamentScheduler}
            >
              {tournamentScheduler && (
                <img src={spinnerIcon} className="animate-spin w-5" alt="..." />
              )}
              Schedule
            </button>
          </div>
        )
      )}

      {!isRegistered &&
      data?.registration?.status === "open" &&
      !data?.isHost ? (
        // public user who didn't registered
        <div className="my-6">
          <p className="text-xl font-semibold mb-3">Register you team</p>
          <div className="rounded-lg py-2 px-3">
            <div className="flex justify-between items-start gap-x-4 gap-y-4">
              <div className="flex items-start gap-x-1">
                <img src={clockIcon} alt="last date" className="self-start" />
                <div className="">
                  <p className="text-sm">Last date </p>
                  <p className="text-sm">{data?.registration.last_date}</p>
                </div>
              </div>

              <div className="flex items-start gap-x-1">
                <img src={ticketIcon} alt="calendar" className="w-4" />
                <div>
                  <p className="text-sm">Fee </p>
                  <p className="">
                    ₹
                    <span className="text-2xl font-semibold">
                      {data?.registration?.fee?.amount}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex mt-4  justify-end">
              <InputSubmit
                type="button"
                value="Register now"
                className="w-1/3 min-w-[130px] h-9"
                onClick={() => {
                  if (!auth.name)
                    navigate("/login", { state: { from: location.pathname } });
                  else setRegisterModal(true);
                }}
              />
            </div>
          </div>
        </div>
      ) : data?.isHost ? (
        // viewing as tournament author
        <>
          {!isRegistered && data?.registration?.status === "open" && (
            <div className="mt-4 rounded-md px-3 py-4 flex justify-between items-center">
              <p className="text-black text-md">Register you team</p>
              <button
                className="hover:shadow border border-black rounded text-black hover:bg-black hover:text-white px-3 py-1"
                type="button"
                onClick={() => {
                  setRegisterModal(true);
                }}
              >
                Register
              </button>
            </div>
          )}

          <div className="my-6">
            <p className="text-xl font-semibold mb-3">Registered teams</p>
            {data?.teams?.length ? (
              data?.teams?.map((ele) => (
                <div
                  key={ele._id}
                  className="flex gap-x-2 px-2 items-center rounded-md mt-1 hover:bg-gradient-to-r hover:from-slate-200 hover:to-slate-50 box-border"
                >
                  <img
                    src={ele.profile}
                    className="rounded-full w-8 h-8"
                    alt="s"
                  />
                  <div className="py-2">
                    <p className="text-base sm:text-lg overflow-hidden text-ellipsis tournament-title">
                      {ele.name}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full flex items-center h-20">
                <p className="my-auto align-middle mx-auto text-slate-500">
                  Zero registration..
                </p>
              </div>
            )}
          </div>
        </>
      ) : isRegistered ? (
        // already registered
        <div className="w-full my-6 flex items-center h-52">
          <div className="my-auto align-middle mx-auto">
            <img
              src={registredImg}
              className="w-28 text-center mx-auto"
              alt="already registered"
            />
            <p className="text-center">Already registered</p>
          </div>
        </div>
      ) : (
        // registration closed
        <div className="w-full my-6 flex items-center h-52">
          <div className="my-auto align-middle mx-auto grayscale">
            <img
              src={deniedImg}
              className="w-28 text-center mx-auto"
              alt="registration closed"
            />
            <p className="text-center">Registration closed</p>
          </div>
        </div>
      )}

      {registerModal && (
        <RegisterForm
          data={data}
          setIsRegistered={setIsRegistered}
          showMessage={(arg) => {
            if (arg.type === "success")
              useSuccessToast({ message: arg.message });
            else useErrorToast({ message: arg.message });
          }}
          close={() => {
            setRegisterModal(false);
          }}
        />
      )}
    </div>
  );
}

CountdownTimer.propTypes = {
  date: PropTypes.string.isRequired,
};

Sidebar.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Sidebar;
