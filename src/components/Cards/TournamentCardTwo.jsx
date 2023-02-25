import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

import watchIcon from "../../assets/icons/watch.svg";
import editIcon from "../../assets/icons/edit.svg";
import "./TournamentCard.scss";

function TournamentCardTwo({ data, showAvatar, showBookMark, showEditButton }) {
  const location = useLocation();

  return (
    <div className=" w-full">
      <div
        className="w-full aspect-[16/9] rounded-md bg-center bg-no-repeat bg-cover relative"
        style={{ backgroundImage: `url('${data?.cover}')` }}
      >
        <div className="bg-black/30 w-full h-full rounded-md" />
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
      <div className="py-2 px-2 h-[180px] mt-2">
        <div className="flex justify-start gap-x-5 my-2 text-sm">
          <span className="text-gray-500">{data?.start_date}</span>
        </div>
        <Link
          to={`/tournament/${data?._id}`}
          state={{ from: location.pathname }}
          className="cursor-pointer text-lg leading-6 font-medium overflow-hidden text-ellipsis tournament-card_head"
        >
          {data?.title}
        </Link>

        <Link
          to={`/tournament/${data?._id}`}
          state={{ from: location.pathname }}
          className="cursor-pointer my-2 text-ellipsis text-gray-600 overflow-hidden tournament-card_desc"
        >
          {data?.short_description}
        </Link>
      </div>
    </div>
  );
}

TournamentCardTwo.defaultProps = {
  showAvatar: true,
  showBookMark: true,
  showEditButton: false,
};

TournamentCardTwo.propTypes = {
  data: PropTypes.object.isRequired,
  showAvatar: PropTypes.bool,
  showBookMark: PropTypes.bool,
  showEditButton: PropTypes.bool,
};

export default TournamentCardTwo;
