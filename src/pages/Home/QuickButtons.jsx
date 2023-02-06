import React from "react";

import leageImg from "../../assets/img/soccor1.jpg";
import tournamentImg from "../../assets/img/soccor3.jpg";
import matchImg from "../../assets/img/soccor.jpg";
import liveImg from "../../assets/img/soccor4.jpeg";

function QuickButtons() {
  return (
    <div>
      <div className="flex items-center justify-center gap-y-6 gap-x-6 md:gap-x-12 px-5 py-10 flex-wrap lg:gap-x-24 text-center sm:p-10 max-w-[1500px] mx-auto">
        <div>
          <img
            className="border-2 border-black mx-auto rounded-full w-20 h-20"
            src={leageImg}
            alt="leagues"
          />{" "}
          <p className="text-lg font-medium mt-3">Leagues</p>
        </div>
        <div>
          <img
            className="border-2 border-black mx-auto rounded-full w-20 h-20"
            src={tournamentImg}
            alt="torunaments"
          />{" "}
          <p className="text-lg font-medium mt-3">Tournaments</p>
        </div>
        <div>
          <img
            className="border-2 border-black mx-auto rounded-full w-20 h-20"
            src={matchImg}
            alt="matches"
          />{" "}
          <p className="text-lg font-medium mt-3">Matches</p>
        </div>
        <div>
          <img
            className="border-2 border-black mx-auto rounded-full w-20 h-20"
            src={liveImg}
            alt="lives"
          />{" "}
          <p className="text-lg font-medium mt-3">Live</p>
        </div>
      </div>
    </div>
  );
}

export default QuickButtons;
