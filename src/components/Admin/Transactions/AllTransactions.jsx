import React, { useEffect, useState } from "react";
import { BiSortAlt2 } from "react-icons/bi";

import InputFields from "../../InputFields/InputFields";
import spinnerIcon from "../../../assets/icons/spinner.svg";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import arrowIcon from "../../../assets/icons/arrow-down.svg";

function AllTransactions() {
  const [currentFilter, setCurrentFilter] = useState("all");
  const [currentSort, setCurrentSort] = useState(["createdAt", true]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [search, setSearch] = useState("");

  const [firstLoading, setFirstLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const axios = useAxiosPrivate();

  // sorting table fields
  const handleSort = (value) => {
    if (currentSort[0] === value) setCurrentSort((prvs) => [prvs[0], !prvs[1]]);
    else setCurrentSort([value, true]);
  };

  // fetch users data from server
  const fetchData = (url) => {
    axios
      .get(url)
      .then((res) => {
        if (res?.data?.success) {
          setTransactions(res?.data?.data?.allTransactions);
          const totalRec = res?.data?.data?.total || 1;
          const limit = res?.data?.data?.limit || 10;
          const totalpage = Math.ceil(totalRec / limit);
          setTotalPages(totalpage);
        }
      })
      .catch(() => {})
      .finally(() => {
        setFirstLoading(false);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (firstLoading) {
      setLoading(true);
      fetchData("/admin/transactions");
    } else {
      const sortBy = `${currentSort[0]},${currentSort[1] ? "-1" : "1"}`;
      const url = `/admin/transactions?page=${currentPage}&limit=${currentLimit}&filter=${currentFilter}&sort=${sortBy}&search=${search}`;
      fetchData(url);
    }
  }, [currentFilter, currentSort, currentPage, currentLimit]);

  useEffect(() => {
    if (search.length >= 2) {
      const sortBy = `${currentSort[0]},${currentSort[1] ? "-1" : "1"}`;
      const url = `/admin/transactions?page=${currentPage}&limit=${currentLimit}&filter=${currentFilter}&sort=${sortBy}&search=${search}`;
      fetchData(url);
    } else if (search.length > 0) {
      const sortBy = `${currentSort[0]},${currentSort[1] ? "-1" : "1"}`;
      const url = `/admin/transactions?page=${currentPage}&limit=${currentLimit}&filter=${currentFilter}&sort=${sortBy}`;
      fetchData(url);
    }
  }, [search]);

  return (
    <div>
      <h1 className="my-2 text-lg ml-2">All transactions</h1>
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
              onClick={() => setCurrentFilter("true")}
              type="button"
              className={`${
                currentFilter === "true" ? "text-primary" : "text-black"
              } bg-slate-200 hover:bg-slate-300 px-2 rounded-md text-sm py-1`}
            >
              Complete
            </button>

            <button
              onClick={() => setCurrentFilter("false")}
              type="button"
              className={`${
                currentFilter === "false" ? "text-primary" : "text-black"
              } bg-slate-200 hover:bg-slate-300 px-2 rounded-md text-sm py-1`}
            >
              Incomplete
            </button>
          </div>
          <InputFields
            holder="Search"
            name="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="bg-slate-100"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto border-spacing-8 w-full text-left">
            <thead className="text-slate-500">
              <tr className="border-b border-slate-300">
                <th className="cursor-pointer font-medium py-2 px-2 ">
                  <div
                    className="flex justify-between items-center"
                    onClick={() => {
                      handleSort("from");
                    }}
                  >
                    <p>From</p>
                    <BiSortAlt2 />
                  </div>
                </th>
                <th className="cursor-pointer font-medium py-2 px-2 ">
                  <div
                    className="flex justify-between items-center"
                    onClick={() => {
                      handleSort("to");
                    }}
                  >
                    <p>To</p>
                    <BiSortAlt2 />
                  </div>
                </th>
                <th className="cursor-pointer font-medium py-2 px-2 ">
                  <div className="flex justify-between items-center">
                    <p>OrderId</p>
                  </div>
                </th>
                <th className="cursor-pointer font-medium py-2 px-2">
                  <div
                    className="flex justify-between items-center"
                    onClick={() => {
                      handleSort("amount");
                    }}
                  >
                    <p>Amount</p>
                    <BiSortAlt2 />
                  </div>
                </th>
                <th className="font-medium py-2 px-2 min-w-[96px]">
                  <div
                    className="cursor-pointer flex justify-between items-center"
                    onClick={() => {
                      handleSort("status");
                    }}
                  >
                    <p>Status</p>
                    <BiSortAlt2 />
                  </div>
                </th>
              </tr>
            </thead>
            {loading ? (
              <tbody>
                <tr className="flex justify-center items-center w-full h-14">
                  <img
                    src={spinnerIcon}
                    className="w-8 animate-spin"
                    alt="Loading..."
                  />
                </tr>
              </tbody>
            ) : (
              <tbody>
                {transactions.map((ele) => (
                  <tr className="border-b border-slate-300" key={ele._id}>
                    <td className="px-2 py-2 whitespace-nowrap text-sm overflow-hidden text-ellipsis">
                      <p className="whitespace-nowrap overflow-hidden text-ellipsis min-w-[150px] max-w-[300px] ">
                        {ele?.from}
                      </p>
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap text-sm overflow-hidden text-ellipsis">
                      <p className="whitespace-nowrap overflow-hidden text-ellipsis min-w-[150px] max-w-[300px] ">
                        {ele?.to}
                      </p>
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap text-sm overflow-hidden text-ellipsis min-w-[150px]">
                      <p className="itespace-nowrap overflow-hidden text-ellipsis min-w-[100px] max-w-[220px] ">
                        {ele?.order_id}
                      </p>
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap text-sm overflow-hidden text-ellipsis min-w-[150px]">
                      <p className="itespace-nowrap overflow-hidden text-ellipsis min-w-[100px] max-w-[220px] ">
                        {ele?.amount}
                      </p>
                    </td>

                    <td className="px-2 py-2">
                      <div className=" flex text-center flex-nowrap items-center gap-x-1">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            ele?.status ? "bg-green-600" : "bg-red-600"
                          } `}
                        />
                        <span>{ele?.status ? "Complete" : "Incomplete"}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
        <div className="flex px-2 my-4  justify-between items-center">
          <select
            name="limit"
            className="w-20 h-8 rounded shadow-md outline-none"
            value={currentLimit}
            onChange={(e) => {
              setCurrentLimit(e.target.value);
            }}
            id="limit"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>

          <div className="flex items-center gap-x-1">
            <button
              type="button"
              className="rounded shadow-md border px-2 py-2"
              onClick={() => {
                setCurrentPage((prvs) => (prvs > 1 ? prvs - 1 : prvs));
              }}
            >
              <img src={arrowIcon} className="w-5 rotate-90" alt="left" />
            </button>
            <button type="button" className="rounded border px-2 w-10 py-2">
              {currentPage}
            </button>
            <button
              type="button"
              className="rounded shadow-md border px-2 py-2"
              onClick={() => {
                setCurrentPage((prvs) => (prvs < totalPages ? prvs + 1 : prvs));
              }}
            >
              <img src={arrowIcon} className="w-5 -rotate-90" alt="left" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllTransactions;
