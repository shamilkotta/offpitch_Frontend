import React, { useState } from "react";
import { BiSortAlt2 } from "react-icons/bi";

import InputFields from "../../components/InputFields/InputFields";

function Clubs() {
  const [currentFilter, setCurrentFilter] = useState("all");

  return (
    <div>
      <h1 className="my-2 text-lg ml-2">All clubs</h1>
      <div className="bg-slate-100 rounded shadow-md px-3 py-2 w-full">
        <div className="flex justify-between items-center flex-wrap gap-2 my-2 mb-4">
          <div className="flex gap-x-2">
            <button
              onClick={() => setCurrentFilter("all")}
              type="button"
              className={`${
                currentFilter === "all" ? "text-primary" : "text-black"
              } bg-slate-200 hover:bg-slate-300 px-2 rounded-md text-sm py-1`}
            >
              All
            </button>
            <button
              onClick={() => setCurrentFilter("active")}
              type="button"
              className={`${
                currentFilter === "active" ? "text-primary" : "text-black"
              } bg-slate-200 hover:bg-slate-300 px-2 rounded-md text-sm py-1`}
            >
              Active
            </button>
            <button
              onClick={() => setCurrentFilter("awaiting")}
              type="button"
              className={`${
                currentFilter === "awaiting" ? "text-primary" : "text-black"
              } bg-slate-200 hover:bg-slate-300 px-2 rounded-md text-sm py-1`}
            >
              Awaiting
            </button>
            <button
              onClick={() => setCurrentFilter("blocked")}
              type="button"
              className={`${
                currentFilter === "blocked" ? "text-primary" : "text-black"
              } bg-slate-200 hover:bg-slate-300 px-2 rounded-md text-sm py-1`}
            >
              Blocked
            </button>
            <button
              onClick={() => setCurrentFilter("rejected")}
              type="button"
              className={`${
                currentFilter === "rejected" ? "text-primary" : "text-black"
              } bg-slate-200 hover:bg-slate-300 px-2 rounded-md text-sm py-1`}
            >
              Rejected
            </button>
          </div>
          <InputFields holder="Search" className="bg-slate-100" />
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto border-spacing-8 w-full text-left">
            <thead className="text-slate-500">
              <tr className="border-b border-slate-300">
                <th className="cursor-pointer font-medium py-2 px-2 ">
                  <div className="flex justify-between items-center">
                    <p>Name</p>
                    <BiSortAlt2 />
                  </div>
                </th>
                <th className="cursor-pointer font-medium py-2 px-2">
                  <div className="flex justify-between items-center">
                    <p>Contact</p>
                    <BiSortAlt2 />
                  </div>
                </th>
                <th className="font-medium py-2 px-2 min-w-[80px]">Doc</th>
                <th className="font-medium py-2 px-2 min-w-[80px]">Data</th>
                <th className="font-medium py-2 px-2 min-w-[96px]">
                  <div className="cursor-pointer flex justify-between items-center">
                    <p>Status</p>
                    <BiSortAlt2 />
                  </div>
                </th>
                <th className="font-medium py-2 px-2 min-w-[96px]">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-300">
                <td className="px-2 py-2 flex flex-nowrap gap-x-2 items-center">
                  <img src="" alt="" className="w-9 h-9 border rounded-md" />
                  <p className="whitespace-nowrap overflow-hidden text-ellipsis min-w-[200px] max-w-[300px] ">
                    Mohammed shamil calicut Lorem ipsum dolor sit, amet
                    consectetur adipisicing elit. Fugit consequuntur quae rerum,
                    ut est, maiores alias nobis delectus, voluptatibus sunt quam
                    quibusdam molestias quaerat voluptates? Natus necessitatibus
                    autem iste sunt!
                  </p>
                </td>
                <td className="px-2 py-2 hitespace-nowrap text-sm overflow-hidden text-ellipsis min-w-[150px]">
                  <p className="itespace-nowrap overflow-hidden text-ellipsis min-w-[150px] max-w-[220px] ">
                    shamilmohammed@gmail.com
                  </p>
                  <p>+918976540328</p>
                </td>
                <td className="px-2 py-2">
                  <button type="button" className="w-10 h-10 border rounded-md">
                    Doc
                  </button>
                </td>
                <td className="px-2 py-2">
                  <button type="button" className=" text-cyan-600 ">
                    View
                  </button>
                </td>
                <td className="px-2 py-2">
                  <div className=" flex text-center flex-nowrap items-center gap-x-1">
                    <div className="w-2 h-2 rounded-full bg-green-600" />
                    <span>active</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Clubs;
