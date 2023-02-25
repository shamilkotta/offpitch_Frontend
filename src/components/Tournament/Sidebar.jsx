import React from "react";
import PropTypes from "prop-types";

import calendarIcon from "../../assets/icons/calendar-tick-dark.svg";
import locationIcon from "../../assets/icons/location-dark.svg";
import ticketIcon from "../../assets/icons/ticket.svg";
import calendarIconLight from "../../assets/icons/calendar-tick.svg";
import location from "../../assets/icons/location.svg";
import clockIcon from "../../assets/icons/clock.svg";
import { InputSubmit } from "../InputFields/InputFields";

function Sidebar({ data }) {
  return (
    <div className="mx-auto md:px-3 md:max-w-[450px] mb-6">
      <div className="mb-6">
        <p>{data.short_description}</p>
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
            <p>{data?.time}</p>
            <p>{data?.start_date}</p>
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
            <p>{data?.place}</p>
            <p>
              {data?.location}, {data?.country}
            </p>
          </div>
        </div>
      </div>
      {data?.tickets?.matchday_ticket?.is ||
      data?.tickets?.season_ticket?.is ? (
        <div className="my-10">
          <p className="text-xl font-semibold mb-3">Buy tickets</p>
          <div className="border rounded-lg py-2 px-3">
            <p className="text-base text-gray-600">{data?.host?.name}</p>
            <p className="text-lg -mt-1 mb-4 font-medium">{data?.title}</p>
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              <div className="flex flex-col gap-y-1">
                <div className="flex items-center gap-1">
                  <img src={calendarIcon} alt="calendar" />
                  <p className="text-sm">{data?.start_date}</p>
                </div>
                <div className="flex items-center gap-1">
                  <img src={locationIcon} alt="calendar" />
                  <p className="text-sm">
                    {data?.location}
                    {data?.state}, {data?.country}
                  </p>
                </div>
              </div>
              <div>
                {data?.tickets?.season_ticket.is && (
                  <div className="flex items-center gap-1">
                    <img src={ticketIcon} alt="calendar" className="w-4" />
                    <p className="text-sm">Season ticket</p>
                  </div>
                )}
                {data?.tickets?.matchday_ticket.is && (
                  <div className="flex items-center gap-1">
                    <img src={ticketIcon} alt="calendar" className="w-4" />
                    <p className="text-sm">Matchday ticket</p>
                  </div>
                )}
              </div>
            </div>
            <div className="border border-dashed my-4 w-full" />
            <div className="flex justify-between">
              <div>
                <p className="">
                  ₹
                  <span className="text-3xl font-semibold">
                    {data?.tickets?.matchday_ticket.is
                      ? data?.tickets?.matchday_ticket.amount
                      : data?.tickets?.season_ticket.amount}
                  </span>
                </p>
              </div>
              <InputSubmit
                type="button"
                value="Buy now"
                className="w-1/3 min-w-[100px]"
              />
            </div>
          </div>
        </div>
      ) : (
        <div />
      )}

      <div className="my-10">
        <p className="text-xl font-semibold mb-3">Register you team</p>
        <div className="rounded-lg py-2 px-3">
          <div className="flex justify-between items-start gap-x-4 gap-y-4">
            <div className="flex items-start gap-x-1">
              <img src={clockIcon} alt="last date" className="self-start" />
              <div className="">
                <p className="text-sm">Last date </p>
                <p className="text-sm">{data?.start_date}</p>
              </div>
            </div>

            <div className="flex items-start gap-x-1">
              <img src={ticketIcon} alt="calendar" className="w-4" />
              <div>
                <p className="text-sm">Fee </p>
                <p className="">
                  ₹
                  <span className="text-3xl font-semibold">
                    {data?.registration_fee?.amount}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex mt-4  justify-end">
            <InputSubmit
              type="button"
              value="Register now"
              className="w-1/3 min-w-[130px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Sidebar;
