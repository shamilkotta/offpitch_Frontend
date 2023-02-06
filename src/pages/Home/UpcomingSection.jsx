import React from "react";

import TournamentCard from "../../components/Cards/TournamentCard";
import arrowIcon from "../../assets/icons/arrow.svg";

function UpcomingSection() {
  const cards = [1, 2, 3, 4];
  return (
    <div className="bg-gray-100">
      <div className="flex flex-col py-10 px-5 sm:p-10 max-w-[1500px] mx-auto box-border">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Upcoming</h3>
          <p className="flex gap-x-2 cursor-pointer">
            Explore <img src={arrowIcon} alt="explore" />{" "}
          </p>
        </div>
        <div className="flex justify-center gap-8 flex-wrap items-center">
          {cards.map(() => (
            <TournamentCard />
          ))}
        </div>
      </div>
    </div>
  );
}

export default UpcomingSection;
