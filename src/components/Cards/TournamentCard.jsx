import React from "react";

import locationIcon from "../../assets/icons/location.svg";
import watchIcon from "../../assets/icons/watch.svg";
import calendarIcon from "../../assets/icons/calendar-tick.svg";
import "./TournamentCard.scss";

import bannerImg from "../../assets/img/soccor2.jpg";

function TournamentCard() {
  return (
    <div className=" w-[300px] h-[370px] border-2 rounded-md">
      <div
        className="w-full h-[180px] rounded-t-md bg-center bg-no-repeat bg-cover relative"
        style={{ backgroundImage: `url('${bannerImg}')` }}
      >
        <div className="bg-black/30 w-full h-full rounded-t-md" />
        <div className="absolute flex justify-between top-2 right-2 left-2">
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
          <button
            type="button"
            className="bg-white/40 hover:bg-white/70 rounded-full p-1"
          >
            <img alt="watch" className="w-full block" src={watchIcon} />
          </button>
        </div>
      </div>
      <div className="py-2 px-2">
        <p className="cursor-pointer text-lg leading-6 font-medium overflow-hidden text-ellipsis tournament-card_head">
          City Premier league by city organization
        </p>
        <div className="flex gap-x-5 my-2 text-sm">
          <div className="flex">
            <img alt="location" src={locationIcon} />{" "}
            <span className="ml-2 text-primary">Ph city, GRA</span>
          </div>
          <div className="flex">
            <img alt="location" src={calendarIcon} />{" "}
            <span className="ml-2 text-primary">23 jan, 12:30PM</span>
          </div>
        </div>
        <p className="cursor-pointer mb-2 text-ellipsis overflow-hidden tournament-card_desc">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt utsfsdfsdfdfdf sfdsf sfdserqw
        </p>
      </div>
    </div>
  );
}

export default TournamentCard;
