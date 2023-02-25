import React, { useEffect, useState } from "react";

import arrowIcon from "../../assets/icons/arrow.svg";
import TournamentCardTwo from "../../components/Cards/TournamentCardTwo";
import axios from "../../config/api";

function UpcomingSection() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios
      .get("/tournaments?limit=4")
      .then((res) => {
        if (res.data.success) setCards(res.data.data.allTournaments);
        else setCards([]);
      })
      .catch(() => setCards([]));
  }, []);

  return (
    <div className="bg-gray-100">
      <div className="flex flex-col py-10 px-5 sm:p-10 max-w-[1500px] mx-auto box-border">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Upcoming</h3>
          <p className="flex gap-x-2 cursor-pointer">
            Explore <img src={arrowIcon} alt="explore" />{" "}
          </p>
        </div>
        <div className="grid grid-cols-1 min-[600px]:grid-cols-2 min-[950px]:grid-cols-3 xl:grid-cols-4 auto-rows-auto gap-x-4 gap-y-2">
          {cards.length
            ? cards.map((ele) => <TournamentCardTwo data={ele} />)
            : ""}
        </div>
      </div>
    </div>
  );
}

export default UpcomingSection;
