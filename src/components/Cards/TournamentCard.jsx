import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import locationIcon from "../../assets/icons/location.svg";
import watchIcon from "../../assets/icons/watch.svg";
import calendarIcon from "../../assets/icons/calendar-tick.svg";
import useAxiosPrivate from "../../hooks/userAxiosPrivate";
import "./TournamentCard.scss";

function TournamentCard({ data, showAvatar, showBookMark }) {
  const [isSaved, setIsSaved] = useState(data?.isSaved || false);
  const auth = useSelector((state) => state.auth);
  const location = useLocation();
  const axios = useAxiosPrivate();
  const navigate = useNavigate();

  const addToWatch = () => {
    if (!auth.accessToken)
      navigate("/login", { state: { from: location.pathname } });
    axios
      .get(`/user/tournament/${data._id}/save`)
      .then((res) => {
        if (res.data.success) {
          setIsSaved(true);
        }
      })
      .catch(() => {});
  };

  return (
    <div className=" w-full border-2 rounded-md">
      <div
        className="w-full aspect-[16/9] rounded-t-md bg-center bg-no-repeat bg-cover relative"
        style={{ backgroundImage: `url('${data.cover}')` }}
      >
        <div className="bg-black/30 w-full h-full rounded-t-md" />
        <div className="absolute flex justify-between top-2 right-2 left-2">
          {showAvatar && (
            <div className="inline-flex flex-row">
              {data?.teams.map((ele) => (
                <span
                  title={ele.name}
                  className="tournament-card_avatar relative border border-white/80 rounded-full overflow-hidden w-[30px]"
                >
                  <img src={ele.profile} alt="profiles" />
                </span>
              ))}
              {data?.teams?.length > 3 && (
                <span className="tournament-card_avatar relative border flex justify-center text-xs items-center bg-white border-white/80 rounded-full overflow-hidden w-[30px]">
                  {parseInt(data?.teams_count, 10) -
                    parseInt(data?.teams?.length, 10)}
                  +
                </span>
              )}
            </div>
          )}

          <div className="flex gap-x-1 ml-auto mr-0">
            {showBookMark && !isSaved && (
              <button
                type="button"
                className="bg-white/40 hover:bg-white/70 disabled:hover:bg-white/40 rounded-full p-1"
                onClick={() => {
                  addToWatch();
                }}
                disabled={isSaved}
              >
                <img alt="watch" className="w-full block" src={watchIcon} />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="py-2 px-2 h-[180px]">
        <Link
          to={`/tournament/${data?._id}`}
          state={{ from: location.pathname }}
          className="cursor-pointer text-lg leading-6 font-medium overflow-hidden text-ellipsis tournament-card_head"
        >
          {data?.title}
        </Link>
        <div className="flex justify-start gap-x-5 my-2 text-sm">
          <div className="flex">
            <img alt="location" src={locationIcon} />{" "}
            <span className="ml-1 text-primary">{data?.location}</span>
          </div>
          <div className="flex">
            <img alt="location" src={calendarIcon} />{" "}
            <span className="ml-1 text-primary">{data?.start_date}</span>
          </div>
        </div>
        <Link
          to={`/tournament/${data?._id}`}
          state={{ from: location.pathname }}
          className="cursor-pointer mb-2 text-ellipsis overflow-hidden tournament-card_desc"
        >
          {data?.short_description}
        </Link>
      </div>
    </div>
  );
}

TournamentCard.defaultProps = {
  showAvatar: true,
  showBookMark: true,
};

TournamentCard.propTypes = {
  data: PropTypes.object.isRequired,
  showAvatar: PropTypes.bool,
  showBookMark: PropTypes.bool,
};

export default TournamentCard;
