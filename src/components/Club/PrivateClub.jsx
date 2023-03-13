/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef, useState } from "react";
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
import editIcon from "../../assets/icons/edit.svg";
import "./Club.scss";

function PrivateClub() {
  const [addPlayerModal, setAddPlayerModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [data, setData] = useState({});
  const [players, setPlayers] = useState([]);
  const club = useSelector((state) => state.club);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const axios = useAxiosPrivate();
  const location = useLocation();
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const [numLines, setNumLines] = useState(0);
  const paragraphRef = useRef(null);

  useEffect(() => {
    const height = paragraphRef.current.scrollHeight;
    const lineHeight = parseInt(
      window.getComputedStyle(paragraphRef.current).lineHeight,
      10
    );
    const lines = Math.round(height / lineHeight);
    setNumLines(lines);
  }, [data]);

  function handleShowMore() {
    setShowMore(!showMore);
  }

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

  useEffect(() => {
    setLoading(true);
    if (club.name) {
      setData(club);
      setPlayers(club.players);
      setLoading(false);
    } else fetchData();
  }, []);

  return (
    <div className="py-16">
      <hr />
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 ">
        <div className="flex -mt-8">
          <div className="flex gap-1 overflow-auto ml-auto mr-0">
            <Link to="/user/club" className="text-primary px-3 py-1">
              Overview
            </Link>
            <Link
              to="/user/club/tournaments"
              state={{ tab: "tournaments" }}
              className="px-3 py-1 text-gray-500"
            >
              Tournaments
            </Link>
            <Link
              to="/user/club/tournaments"
              state={{ tab: "registered" }}
              className="px-3 py-1 text-gray-500"
            >
              Registered
            </Link>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-[80vh]">
            <img
              src={spinnerIcon}
              className="w-9 animate-spin"
              alt="Loading..."
            />
          </div>
        ) : (
          <div className="flex flex-col gap-5 md:flex-row md:justify-between">
            <div className="w-full md:w-[30%] mt-4 min-[480px]:-mt-5">
              <div className="">
                <div className="flex justify-between flex-wrap gap-2 mb-2">
                  <div className="order-2 self-end">
                    <button
                      type="button"
                      className="font-medium flex text-gray-500"
                      onClick={() => {
                        setEditModal(true);
                      }}
                    >
                      <img
                        className="w-4 h-4 my-auto"
                        src={editIcon}
                        alt="edit"
                      />
                      Edit
                    </button>
                  </div>
                  <div className="rounded-full w-fit bg-white border-gray-400 border p-2">
                    <img
                      src={data.profile}
                      alt="profile"
                      className="w-28 h-28 sm:w-32 sm:h-32 rounded-full"
                    />
                  </div>
                </div>
                <div className="">
                  <p className="text-2xl font-medium py-0 my-0">{data.name}</p>
                </div>

                <div className=" text-gray-600">
                  <div className="relative flex flex-col justify-start">
                    <p
                      className={`${
                        showMore
                          ? "club-description-show-more"
                          : "club-description-show-less"
                      }`}
                      ref={paragraphRef}
                    >
                      {data.description}
                    </p>
                    {numLines > 3 && (
                      <button
                        type="button"
                        onClick={handleShowMore}
                        className={`text-blue-800  text-xs bg-white/80 font-bold p-1 ${
                          !showMore
                            ? "absolute -bottom-1 right-1"
                            : "relative ml-auto mt-0 py-0 mr-1"
                        }`}
                      >
                        {showMore ? "Hide" : "More"}
                      </button>
                    )}
                  </div>
                </div>
                <div className="mt-3 flex md:flex-col gap-y-2 gap-x-4 text-center text-base flex-wrap">
                  <Link
                    to={`/club/${data._id}`}
                    state={{ from: location.pathname }}
                    className="flex flex-nowrap gap-2 hover:text-primary items-center"
                  >
                    <img src={follwersIcon} alt="followers" className="w-5" />
                    <p className="text-gray-600 ">{data.followers} followers</p>
                  </Link>
                  <a
                    href={`mailto:${data.email}`}
                    className="flex flex-nowrap gap-2 text-gray-600 items-center"
                  >
                    <img src={smsIcon} alt="followers" className="w-5" />
                    <p className="text-ellipsis overflow-hidden">
                      {data.email}
                    </p>
                  </a>
                  <a
                    href={`tel:${data.phone}`}
                    className="flex flex-nowrap gap-2 text-gray-600 items-center"
                  >
                    <img src={callIcon} alt="followers" className="w-5" />
                    <p>{data.phone}</p>
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full md:w-[65%]">
              <div className="mt-10">
                <h1 className="mb-3 text-lg text-gray-500">Players</h1>
                <div className="grid grid-cols-2 min-[440px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-auto gap-2">
                  <button
                    type="button"
                    className="w-full aspect-[7/8] p-4 bg-slate-100"
                    onClick={() => {
                      setAddPlayerModal(true);
                    }}
                  >
                    <div className="w-full h-full flex justify-center text-slate-500 items-center border-dashed border-2 border-sky-500">
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
                        <h2 className="text-base font-bold leading-4">
                          {ele.name}
                        </h2>
                        <p className="text-sm">Age: {ele.age}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

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
    </div>
  );
}

export default PrivateClub;
