import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import About from "../About";
import calendarIconLight from "../../../assets/icons/calendar-tick.svg";
import locationIconLight from "../../../assets/icons/location.svg";

function LiveTournament({ data }) {
  const [tab, setTab] = useState("matches");
  const ref = useRef();

  useEffect(() => {
    ref?.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  const shortName = (name) => {
    const words = name.split(" ");
    let shrt = "";
    for (let i = 0; i < words.length; i += 1) {
      shrt += words[i][0];
    }

    return shrt;
  };

  return (
    <div className="max-w-[1400px] px-5 py-10 sm:px-10 mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-x-10 mb-3 overflow-hidden">
        <div className="flex gap-x-3 flex-nowrap self-start justify-start items-center w-full overflow-hidden">
          <img
            className="aspect-[16/9] w-16 rounded-md"
            src={data.cover}
            alt="Tournament"
          />

          <div className="text-2xl w-full md:w-auto my-auto font-bold overflow-hidden whitespace-nowrap text-ellipsis">
            {data.title}
          </div>
        </div>
        <hr className="md:hidden w-full my-3" />
        <div className="self-start flex gap-x-2 flex-shrink-0">
          <button
            type="button"
            className={`px-2 py-1 rounded text-white text-sm ${
              tab === "matches" ? "bg-slate-500" : "bg-slate-400 "
            }`}
            onClick={() => {
              setTab("matches");
            }}
          >
            MATCHES
          </button>
          <button
            type="button"
            className={`px-2 py-1 rounded text-white text-sm ${
              tab === "about" ? "bg-slate-500" : "bg-slate-400 "
            }`}
            onClick={() => {
              setTab("about");
            }}
          >
            ABOUT
          </button>
        </div>
      </div>
      <hr className="hidden md:block" />

      <div className="grid auto-cols-auto md:grid-cols-[50%_auto] lg:grid-cols-[60%_auto] grid-rows-[auto_auto_auto]">
        <div className="col-start-1 order-1 col-end-2" />
        <div className="col-start-1 order-3 col-end-2 mt-4 mr-2 row-start-3 row-end-4 md:row-start-2 md:row-end-3">
          {tab === "matches" ? (
            <div className="overflow-auto">
              {data?.matches?.rounds
                .sort((a, b) => a.round_no - b.round_no)
                .map((round) => (
                  <div className="my-2 mb-4" key={round.round_no}>
                    <h1 className="font-semibold text-slate-400/50">
                      {round?.name}
                    </h1>
                    {round?.matches
                      ?.sort((a, b) => a.match_no - b.match_no)
                      .map((match) => (
                        <div
                          className="shadow px-3 py-1 rounded-md my-1"
                          key={match.match_no}
                          ref={
                            data?.matches?.c_match[0] ===
                              parseInt(round?.round_no, 10) + 1 &&
                            data?.matches?.c_match[1] ===
                              parseInt(match?.match_no, 10) + 1
                              ? ref
                              : null
                          }
                        >
                          <h1 className="font-semibold mb-2 text-slate-400/50">
                            Match {parseInt(match?.match_no, 10) + 1}
                          </h1>
                          <div className="flex justify-between mb-2 items-center">
                            <div className="flex gap-x-2 items-center">
                              <img
                                src={match?.teamA?.profile}
                                className="w-8 h-8 rounded-full"
                                alt=".."
                              />
                              <h1 className="text-left">
                                {match?.teamA?.name}
                              </h1>
                            </div>
                            <h1>-</h1>
                            <div className="flex gap-x-2 items-center">
                              <h1 className="text-right">
                                {match?.teamB?.name}
                              </h1>
                              <img
                                src={match?.teamB?.profile}
                                className="w-7 h-7 rounded-full"
                                alt=".."
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-lg font-semibold">Quick note</p>
                <p className="text-gray-600">{data.short_description}</p>
              </div>
              <div className="flex justify-start gap-x-10 gap-y-3 flex-wrap my-6 mb-10">
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
                    <p className="text-base">
                      {data?.start_date?.split(" ").slice(0, 2).join(" ")}
                    </p>
                    <p className="text-base -mt-2">
                      {data?.start_date?.split(" ").splice(2)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    type="button"
                    className="bg-slate-200/70 p-3 aspect-square h-full rounded"
                  >
                    <img
                      src={locationIconLight}
                      alt="date"
                      className="mx-auto h-full w-full"
                    />
                  </button>
                  <div className="whitespace-nowrap  text-sm">
                    <p className="text-base">{data?.location?.split(",")[0]}</p>
                    <p className="text-base -mt-1">
                      {data?.location?.split(",").splice(1).join(",")}
                    </p>
                  </div>
                </div>
              </div>
              <About data={data} />
            </>
          )}
        </div>
        <div className="col-start-1 col-end-2 md:col-start-2 md:col-end-3 order-2 mt-2 md:mx-auto row-start-2 row-end-3 md:row-start-1 md:row-end-4">
          <div className="mx-auto md:px-3 md:max-w-[450px] mb-6">
            {data?.groups?.length ? (
              data?.groups.map((group) => (
                <div className="my-5">
                  <h1 className="font-semibold text-slate-400">
                    {group?.name}
                  </h1>
                  <table className="table-auto">
                    <thead>
                      <tr>
                        <th className="w-20"> </th>
                        <th className="w-9">MP</th>
                        <th className="w-9">W</th>
                        <th className="w-9">D</th>
                        <th className="w-9">L</th>
                        <th className="w-9">GF</th>
                        <th className="w-9">GA</th>
                        <th className="w-9">GD</th>
                        <th className="w-9">PTS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group?.teams
                        ?.sort((a, b) => a.c_position - b.c_position)
                        .map((team) => (
                          <tr className="hover:bg-gradient-to-r rounded-md cursor-pointer hover:from-slate-200 hover:to-slate-50">
                            <td className="">
                              <div className="flex gap-x-2 px-2 items-center rounded-md box-border">
                                <img
                                  src={team.profile}
                                  className="rounded-full w-7 h-7"
                                  alt="s"
                                />
                                <div className="py-2">
                                  <p className="text-sm sm:text-base overflow-hidden text-ellipsis tournament-title">
                                    {shortName(team.name)}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="text-center">{team.mp}</td>
                            <td className="text-center">{team.w}</td>
                            <td className="text-center">{team.d}</td>
                            <td className="text-center">{team.l}</td>
                            <td className="text-center">{team.gf}</td>
                            <td className="text-center">{team.gd}</td>
                            <td className="text-center">{team.ga}</td>
                            <td className="text-center">{team.pts}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              ))
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

LiveTournament.propTypes = {
  data: PropTypes.object.isRequired,
};

export default LiveTournament;
