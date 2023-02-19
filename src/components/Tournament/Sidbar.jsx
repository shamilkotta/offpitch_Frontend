import React from "react";

import calendarIcon from "../../assets/icons/calendar-tick-dark.svg";
import locationIcon from "../../assets/icons/location-dark.svg";
import ticketIcon from "../../assets/icons/ticket.svg";
import calendarIconLight from "../../assets/icons/calendar-tick.svg";
import location from "../../assets/icons/location.svg";
import { InputSubmit } from "../InputFields/InputFields";

function Sidbar() {
  return (
    <div className="mx-auto md:px-3 md:max-w-[450px] my-6">
      <div className="mt-2 mb-6">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam
          libero provident, minus facere nihil molestiae laudantium corrupti sit
          iure dolor dolores, doloribus incidunt, cupiditate dolore? Facilis a
          dolorum quas minus. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Pariatur quisquam quibusdam beatae, et accusantium tempore
          explicabo eveniet perspiciatis dolorem omnis recusandae, ipsa vel
          illo. Quae, incidunt. Sunt ipsa totam corporis.
        </p>
      </div>
      <div className="flex justify-start gap-x-5 gap-y-3 flex-wrap my-6">
        <div className="flex gap-1">
          <button
            type="button"
            className="bg-slate-200/70 p-3 aspect-square h-full rounded"
          >
            <img
              src={calendarIconLight}
              alt="date"
              className="mx-auto h-full w-full"
            />
          </button>
          <div className="whitespace-nowrap text-sm">
            <p>12PM</p>
            <p>23, January 2023</p>
          </div>
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            className="bg-slate-200/70 p-3 aspect-square h-full rounded"
          >
            <img src={location} alt="date" className="mx-auto h-full w-full" />
          </button>
          <div className="whitespace-nowrap  text-sm">
            <p>Calicut</p>
            <p>Kerala, Ind</p>
          </div>
        </div>
      </div>
      <div className="my-10">
        <p className="text-xl font-semibold mb-3">Buy tickets</p>
        <div className="border rounded-lg py-2 px-3">
          <p className="text-base text-gray-600">City club</p>
          <p className="text-lg -mt-1 mb-4 font-medium">
            City premier league by city org
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            <div className="flex flex-col gap-y-1">
              <div className="flex items-center gap-1">
                <img src={calendarIcon} alt="calendar" />
                <p className="text-sm">23, january 2023</p>
              </div>
              <div className="flex items-center gap-1">
                <img src={locationIcon} alt="calendar" />
                <p className="text-sm">Kerala, Ind</p>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <img src={ticketIcon} alt="calendar" className="w-4" />
                <p className="text-sm">Season ticket</p>
              </div>
            </div>
          </div>
          <div className="border border-dashed my-4 w-full" />
          <div className="flex justify-between">
            <div>
              <p className="">
                ₹<span className="text-3xl font-semibold">999</span>
              </p>
            </div>
            <InputSubmit type="button" value="Buy now" className="w-1/2" />
          </div>
        </div>
      </div>
      <div className="my-10">
        <p className="text-xl font-semibold mb-2">Register your team</p>
      </div>
    </div>
  );
}

export default Sidbar;
