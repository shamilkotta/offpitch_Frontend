import React, { useEffect, useState } from "react";
import {
  CiGlobe,
  CiStreamOn,
  CiTimer,
  CiMicrochip,
  CiUser,
} from "react-icons/ci";

import walletIcon from "../../assets/icons/wallet.svg";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useErrorToast } from "../../hooks/useToast";

function Dashboard() {
  const [data, setData] = useState({
    userCount: 0,
    clubCount: 0,
    allTournament: 0,
    activeTournament: 0,
    upcomingTournament: 0,
    wallet: 0,
  });
  const axios = useAxiosPrivate();

  useEffect(() => {
    axios
      .get("/admin/dashboard-data")
      .then((res) => {
        if (res?.data?.success) {
          setData(res.data.data);
        } else {
          useErrorToast({
            message: res?.data?.message || "Something went wrong",
          });
        }
      })
      .catch((err) => {
        useErrorToast({
          message: err?.response?.data?.message || "Something went wrong",
        });
      });
  }, []);

  return (
    <div className="my-2 mt-10">
      <div className="flex flex-col min-[760px]:flex-row gap-y-5 justify-between h-fit">
        <div className="min-[760px]:w-[76%] w-full flex flex-col gap-y-5">
          <div className="flex flex-wrap min-[1000px]:flex-nowrap gap-5">
            <div className="shadow-xl py-3 w-full sm:w-[48%] min-[1000px]:w-full px-3 bg-white rounded-md flex gap-x-3">
              <div className="bg-slate-900 w-fit h-fit px-2 rounded py-2">
                <CiGlobe color="white" size="30px" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-slate-900 font-semibold text-lg">
                  {data.allTournament}
                </h1>
                <h1 className="text-slate-500 font-medium -mt-1">
                  Tournaments
                </h1>
              </div>
            </div>
            <div className="shadow-xl py-3 w-full sm:w-[48%] min-[1000px]:w-full px-3 bg-white rounded-md flex gap-x-3">
              <div className="bg-slate-900 w-fit h-fit px-2 rounded py-2">
                <CiStreamOn color="white" size="30px" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-slate-900 font-semibold text-lg">
                  {data.activeTournament}
                </h1>
                <h1 className="text-slate-500 font-medium -mt-1">Live</h1>
              </div>
            </div>
            <div className="shadow-xl py-3 w-full px-3 bg-white rounded-md flex gap-x-3">
              <div className="bg-slate-900 w-fit h-fit px-2 rounded py-2">
                <CiTimer color="white" size="30px" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-slate-900 font-semibold text-lg">
                  {data.upcomingTournament}
                </h1>
                <h1 className="text-slate-500 font-medium -mt-1">Upcoming</h1>
              </div>
            </div>
          </div>
          <div className="flex gap-x-5">
            <div className="shadow-xl w-full py-3 px-3 bg-white rounded-md flex gap-x-3">
              <div className="bg-slate-900 w-fit h-fit px-2 rounded py-2">
                <CiUser color="white" size="30px" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-slate-900 font-semibold text-lg">
                  {data.userCount}
                </h1>
                <h1 className="text-slate-500 font-medium -mt-1">Users</h1>
              </div>
            </div>
            <div className="shadow-xl w-full py-3 px-3 bg-white rounded-md flex gap-x-3">
              <div className="bg-slate-900 w-fit h-fit px-2 rounded py-2">
                <CiMicrochip color="white" size="30px" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-slate-900 font-semibold text-lg">
                  {data.clubCount}
                </h1>
                <h1 className="text-slate-500 font-medium -mt-1">Clubs</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="min-[760px]:w-[23%] w-full">
          <div className="shadow-md rounded-md px-3 py-4 gap-y-2 flex flex-col items-center justify-center bg-gradient-to-b h-full from-orange-400 to-orange-700">
            <div className="flex items-center gap-x-1">
              <img src={walletIcon} className="w-6 opacity-90" alt="" />
              <h1 className="text-2xl text-orange-900 font-black">Wallet</h1>
            </div>
            <div className="mx-auto">
              <h1 className="text-white mr-0 ml-auto text-end">
                ₹
                <span className="text-2xl font-bold text-white">
                  {data.wallet}
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
