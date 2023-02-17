import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

import locationIcon from "../../assets/icons/location.svg";
import watchIcon from "../../assets/icons/watch.svg";
import calendarIcon from "../../assets/icons/calendar-tick.svg";
import editIcon from "../../assets/icons/edit.svg";
import "./TournamentCard.scss";

import bannerImg from "../../assets/img/soccor2.jpg";

function TournamentCard({ data, showAvatar, showBookMark, showEditButton }) {
  const location = useLocation();

  return (
    <div className=" w-full aspect-[4/5] h-[370px] border-2 rounded-md">
      <div
        className="w-full h-[180px] rounded-t-md bg-center bg-no-repeat bg-cover relative"
        style={{ backgroundImage: `url('${data?.cover || bannerImg}')` }}
      >
        <div className="bg-black/30 w-full h-full rounded-t-md" />
        <div className="absolute flex justify-between top-2 right-2 left-2">
          {showAvatar && (
            <div className="inline-flex flex-row">
              {[
                "https://picsum.photos/70",
                "https://picsum.photos/90",
                "https://picsum.photos/70",
              ].map((ele) => (
                <span className="tournament-card_avatar relative border border-white/80 rounded-full overflow-hidden w-[30px]">
                  <img src={ele} alt="profiles" />
                </span>
              ))}
              <span className="tournament-card_avatar relative border flex justify-center text-xs items-center bg-white border-white/80 rounded-full overflow-hidden w-[30px]">
                5+
              </span>
            </div>
          )}

          <div className="flex gap-x-1 ml-auto mr-0">
            {showBookMark && (
              <button
                type="button"
                className="bg-white/40 hover:bg-white/70 rounded-full p-1"
              >
                <img alt="watch" className="w-full block" src={watchIcon} />
              </button>
            )}

            {showEditButton && (
              <Link
                to={`/user/tournament/${data?._id}/edit`}
                state={{ from: location.pathname }}
                className="bg-white/40 hover:bg-white/70 rounded-full py-2 px-2"
              >
                <img alt="watch" className="w-full block" src={editIcon} />
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="py-2 px-2">
        <p className="cursor-pointer text-lg leading-6 font-medium overflow-hidden text-ellipsis tournament-card_head">
          {data?.title}
        </p>
        <div className="flex justify-between my-2 text-sm">
          <div className="flex">
            <img alt="location" src={locationIcon} />{" "}
            <span className="ml-1 text-primary">{data?.location}</span>
          </div>
          <div className="flex">
            <img alt="location" src={calendarIcon} />{" "}
            <span className="ml-1 text-primary">{data?.start_date}</span>
          </div>
        </div>
        <p className="cursor-pointer mb-2 text-ellipsis overflow-hidden tournament-card_desc">
          {data?.short_description}
        </p>
      </div>
    </div>
  );
}

TournamentCard.defaultProps = {
  showAvatar: true,
  showBookMark: true,
  showEditButton: false,
};

TournamentCard.propTypes = {
  data: PropTypes.object.isRequired,
  showAvatar: PropTypes.bool,
  showBookMark: PropTypes.bool,
  showEditButton: PropTypes.bool,
};

export default TournamentCard;
