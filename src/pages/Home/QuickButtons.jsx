import React from "react";
import { Link } from "react-router-dom";

import leagueImg from "../../assets/img/soccor1.jpg";
import tournamentImg from "../../assets/img/soccor3.jpg";
import liveImg from "../../assets/img/soccor4.jpeg";

function QuickButtons() {
  return (
    <div>
      <div className="flex items-center justify-between gap-x-2 gap-y-6 w-full px-5 py-10 flex-wrap text-center sm:p-10 max-w-[1500px] mx-auto">
        <Link
          to="/explore"
          className="mx-auto shadow-lg rounded-md w-60 h-32 bg-cover relative bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${leagueImg}')` }}
        >
          <div className="bg-black/30 w-full h-full rounded-md" />
          <p className="text-lg font-medium left-3 bottom-2 text-white absolute">
            Leagues
          </p>
        </Link>
        <Link
          to="/explore"
          className="mx-auto shadow-lg rounded-md w-60 h-32 bg-cover relative bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${tournamentImg}')` }}
        >
          <div className="bg-black/30 w-full h-full rounded-md" />
          <p className="text-lg font-medium left-3 bottom-2 text-white absolute">
            Tournaments
          </p>
        </Link>
        <Link
          to="/explore"
          className="mx-auto shadow-lg rounded-md w-60 h-32 bg-cover relative bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${liveImg}')` }}
        >
          <div className="bg-black/30 w-full h-full rounded-md" />
          <p className="text-lg font-medium left-3 bottom-2 text-white absolute">
            Live
          </p>
        </Link>
      </div>
    </div>
  );
}

export default QuickButtons;
