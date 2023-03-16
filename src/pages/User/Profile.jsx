/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import transactionInIcon from "../../assets/icons/transactionIn.svg";
import transactionOutIcon from "../../assets/icons/transactionOut.svg";
import walletIcon from "../../assets/icons/wallet.svg";
import addDataimg from "../../assets/img/add-data.svg";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import loadingSpinnerIcon from "../../assets/icons/spinner.svg";

function Profile() {
  const auth = useSelector((state) => state.auth);
  const [transactions, setTransactions] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [watchlistLoading, setWatchlistLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [profileLoading, setProfileLoading] = useState(false);
  const axios = useAxiosPrivate();

  const fetchTransactions = () => {
    axios
      .get("/user/transactions?limit=5")
      .then((res) => {
        if (res?.data?.success) setTransactions(res.data.data);
      })
      .catch(() => {});
  };

  const fetchWatchlist = () => {
    axios
      .get("/user/watchlist?limit=5")
      .then((res) => {
        if (res?.data?.success) setWatchlist(res?.data?.data);
      })
      .catch(() => {})
      .finally(() => {
        setWatchlistLoading(false);
      });
  };

  const fetchUserDetails = () => {
    axios
      .get("/user/profile")
      .then((res) => {
        if (res?.data?.success) setUserProfile(res?.data?.data);
      })
      .catch(() => {})
      .finally(() => {
        setProfileLoading(false);
      });
  };

  useEffect(() => {
    setProfileLoading(true);
    setWatchlistLoading(true);
    fetchUserDetails();
    fetchTransactions();
    fetchWatchlist();
    fetchUserDetails();
  }, []);

  return (
    <div>
      <div className="max-w-[1400px] py-16 mx-auto px-5 sm:px-10 ">
        <div className="flex justify-between flex-col md:flex-row">
          <div className="w-full md:w-[55%] min-[875px]:w-[65%]">
            <h1 className="text-2xl font-semibold text-slate-700">
              Hi, {auth.name}
            </h1>
            <hr />
            {profileLoading ? (
              <div className="w-full flex justify-center items-center h-[60vh]">
                <img
                  src={loadingSpinnerIcon}
                  className="w-8 animate-spin"
                  alt="Loading..."
                />
              </div>
            ) : !profileLoading && !userProfile?.name ? (
              <div className="w-full flex justify-center items-center h-[60vh]">
                <p> Can&apos;t fetch data</p>
              </div>
            ) : (
              <div className="mt-5">
                {userProfile?.club?.name ? (
                  <>
                    <h1 className="mb-1 text-slate-500 text-lg italic font-medium">
                      Your club
                    </h1>
                    <div className="border rounded-md py-2 px-3 flex justify-between gap-4 items-center w-full">
                      <div className="flex items-center justify-between gap-x-4 overflow-hidden">
                        <img
                          src={userProfile.club.profile}
                          className="w-16 rounded-full h-16"
                          alt=""
                        />
                        <div className="overflow-hidden">
                          <h1 className="text-xl font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                            {userProfile?.club?.name}
                          </h1>
                          <div className="flex gap-3">
                            <p className="text-slate-500">
                              {userProfile.club.followers} Followers
                            </p>
                            <p className="text-slate-500">
                              {userProfile.club.players} Players
                            </p>
                            <div className="text-slate-500 flex gap-1 items-center">
                              <div
                                className={`rounded-full w-2 h-2 mt-1 ${
                                  userProfile.club.status === "active"
                                    ? "bg-green-600"
                                    : userProfile.club.status === "awaiting"
                                    ? "bg-yellow-500"
                                    : userProfile.club.status === "rejected"
                                    ? "bg-black"
                                    : "bg-red-600"
                                }`}
                              />
                              <p>{userProfile.club.status}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Link
                        to="/user/club"
                        className="text-blue-800 font-medium"
                      >
                        View
                      </Link>
                    </div>
                  </>
                ) : null}
              </div>
            )}
          </div>
          <div className="w-full mt-10 md:mt-3 md:w-[40%] min-[875px]:w-[30%]">
            <div>
              <div className="shadow-md rounded-md px-3 py-4 flex flex-wrap gap-y-2 justify-between bg-gradient-to-r from-orange-400 to-orange-700">
                <div className="flex items-center gap-x-1">
                  <img src={walletIcon} className="w-6 opacity-90" alt="" />
                  <h1 className="text-2xl text-orange-800 font-black">
                    Wallet
                  </h1>
                </div>
                <div className="ml-auto mr-0">
                  <h1 className="text-slate-200  mr-0 ml-auto text-end">
                    Balance
                  </h1>
                  <h1 className="text-white mr-0 ml-auto text-end">
                    $
                    <span className="text-2xl font-bold text-white">
                      {userProfile.wallet || "00.00"}
                    </span>
                  </h1>
                </div>
              </div>
              {transactions.length ? (
                <div className="mt-3 px-3 py-4">
                  <h1 className="text-lg">Transactions</h1>
                  {transactions.map((ele) =>
                    ele.from === userProfile?.club?.name ? (
                      <div className="flex gap-x-2 my-4  justify-start items-center">
                        <img className="w-8" src={transactionOutIcon} alt="" />
                        <div className="flex w-full justify-between items-center">
                          <div>
                            <h1 className="text-black my-0">
                              <span className="text-slate-500 text-sm">
                                To :{" "}
                              </span>
                              {ele.to}
                            </h1>
                            <p className="-mt-1 text-slate-400 text-sm">
                              {ele.transaction_date}
                            </p>
                          </div>
                          <p className="text-lg text-red-600">-{ele.amount}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-x-2 box-border my-4 justify-start items-center">
                        <img
                          className="w-8 my-auto align-middle mt-1"
                          src={transactionInIcon}
                          alt=""
                        />
                        <div className="flex w-[90%] max-w-full justify-between gap-x-2 items-center">
                          <div className="overflow-hidden">
                            <p className="text-black my-0 text-ellipsis whitespace-nowrap overflow-hidden">
                              <span className="text-slate-500 text-sm">
                                From :{" "}
                              </span>
                              {ele.from}
                            </p>
                            <p className="-mt-1 text-slate-400 text-sm">
                              {ele.transaction_date}
                            </p>
                          </div>
                          <p className="text-lg w-max text-green-600">
                            +{ele.amount}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              ) : null}
            </div>
            <div className="mt-3 px-3 py-4">
              <div className="flex justify-between items-center">
                <h1 className="text-lg">Watchlist</h1>
                <Link to="/user/watchlist" className="text-slate-500 text-sm">
                  View all
                </Link>
              </div>
              <div>
                {watchlistLoading ? (
                  <div className="w-full flex justify-center items-center h-52">
                    <img
                      src={loadingSpinnerIcon}
                      className="w-8 animate-spin"
                      alt="Loading..."
                    />
                  </div>
                ) : !watchlist.length && !watchlistLoading ? (
                  <div className="w-full flex items-center h-52">
                    <Link
                      to="/explore"
                      className="my-auto align-middle mx-auto grayscale hover:grayscale-0"
                    >
                      <img
                        src={addDataimg}
                        className="w-28 mx-auto text-center"
                        alt="No data"
                      />
                      <p className="text-center">No tournaments</p>
                    </Link>
                  </div>
                ) : (
                  watchlist.map((ele) => (
                    <Link
                      to={`/tournament/${ele._id}`}
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
                          {ele.start_date}
                        </p>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
