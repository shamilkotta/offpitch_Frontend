/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";
import { BiSortAlt2 } from "react-icons/bi";

import InputFields from "../../InputFields/InputFields";
import spinnerIcon from "../../../assets/icons/spinner.svg";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import arrowIcon from "../../../assets/icons/arrow-down.svg";
import StatusManage from "../StatusMange";
import ViewData from "./ViewData";
import Modal from "../../Modal/Modal";

const initialValue = {
  show: false,
  id: "",
  status: "",
  text: "",
  name: "",
  comment: "",
};

function AllClubs() {
  const [currentFilter, setCurrentFilter] = useState("all");
  const [currentSort, setCurrentSort] = useState(["createdAt", true]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [showDoc, setShowDoc] = useState({ show: false, doc: "" });

  const [firstLoading, setFirstLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [clubs, setClubs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const axios = useAxiosPrivate();

  // state to hold values to show in modal of club status change
  const [statusUpdate, setStatusUpdate] = useState(initialValue);

  // state for view data modal
  const [viewData, setViewData] = useState({ show: false, data: {} });

  // set state for updating club status
  const handleStatusUpdate = (text, name, comment, status, id) => {
    setStatusUpdate({ show: true, text, name, id, status, comment });
  };

  // after successfully changed club status
  const handleSuccessClose = ({ comment }) => {
    setClubs((prvs) =>
      prvs.map((ele) => {
        if (ele._id === statusUpdate.id) {
          // eslint-disable-next-line no-param-reassign
          ele.status = statusUpdate.status;
          // eslint-disable-next-line no-param-reassign
          ele.comment = comment;
        }
        return ele;
      })
    );
    setStatusUpdate(initialValue);
  };

  // sorting table fields
  const handleSort = (value) => {
    if (currentSort[0] === value) setCurrentSort((prvs) => [prvs[0], !prvs[1]]);
    else setCurrentSort([value, true]);
  };

  // fetch clubs data from server
  const fetchData = (url) => {
    axios
      .get(url)
      .then((res) => {
        if (res?.data?.success) {
          setClubs(res?.data?.data?.allClubs);
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
      fetchData("/admin/clubs");
    } else {
      const sortBy = `${currentSort[0]},${currentSort[1] ? "-1" : "1"}`;
      const url = `/admin/clubs?page=${currentPage}&limit=${currentLimit}&filter=${currentFilter}&sort=${sortBy}&search=${search}`;
      fetchData(url);
    }
  }, [currentFilter, currentSort, currentPage, currentLimit]);

  useEffect(() => {
    if (search.length >= 2) {
      const sortBy = `${currentSort[0]},${currentSort[1] ? "-1" : "1"}`;
      const url = `/admin/clubs?page=${currentPage}&limit=${currentLimit}&filter=${currentFilter}&sort=${sortBy}&search=${search}`;
      fetchData(url);
    } else if (search.length > 0) {
      const sortBy = `${currentSort[0]},${currentSort[1] ? "-1" : "1"}`;
      const url = `/admin/clubs?page=${currentPage}&limit=${currentLimit}&filter=${currentFilter}&sort=${sortBy}`;
      fetchData(url);
    }
  }, [search]);

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
                      handleSort("name");
                    }}
                  >
                    <p>Name</p>
                    <BiSortAlt2 />
                  </div>
                </th>
                <th className="cursor-pointer font-medium py-2 px-2">
                  <div
                    className="flex justify-between items-center"
                    onClick={() => {
                      handleSort("email");
                    }}
                  >
                    <p>Contact</p>
                    <BiSortAlt2 />
                  </div>
                </th>
                <th className="font-medium py-2 px-2 min-w-[80px]">Doc</th>
                <th className="font-medium py-2 px-2 min-w-[80px]">Data</th>
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
                <th className="font-medium py-2 px-2 min-w-[96px]">Action</th>
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
                {clubs.map((ele) => (
                  <tr className="border-b border-slate-300" key={ele._id}>
                    <td className="px-2 py-2 flex flex-nowrap gap-x-2 items-center">
                      <img
                        src={ele?.profile}
                        alt="cover"
                        className="w-9 h-9 border rounded-md"
                      />
                      <p className="whitespace-nowrap pr-3 overflow-hidden text-ellipsis min-w-[150px] max-w-[300px] ">
                        {ele?.name}
                      </p>
                    </td>
                    <td className="px-2 py-2 hitespace-nowrap text-sm overflow-hidden text-ellipsis min-w-[150px]">
                      <p className="itespace-nowrap overflow-hidden text-ellipsis min-w-[100px] max-w-[220px] ">
                        {ele?.email}
                      </p>
                      <p className="text-gray-500">{ele?.phone}</p>
                    </td>
                    <td className="px-2 py-2">
                      <button
                        type="button"
                        className="w-10 h-10 border rounded-md"
                        onClick={() => {
                          setShowDoc({ show: true, doc: ele?.doc });
                        }}
                      >
                        Doc
                      </button>
                    </td>
                    <td className="px-2 py-2">
                      <button
                        type="button"
                        className=" text-cyan-600 "
                        onClick={() => {
                          setViewData({ show: true, data: ele });
                        }}
                      >
                        View
                      </button>
                    </td>
                    <td className="px-2 py-2">
                      <div className=" flex text-center flex-nowrap items-center gap-x-1">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            ele?.status === "blocked"
                              ? "bg-red-600"
                              : ele?.status === "rejected"
                              ? "bg-black"
                              : ele?.status === "awaiting"
                              ? "bg-yellow-500"
                              : "bg-green-600"
                          } `}
                        />
                        <span>{ele?.status}</span>
                      </div>
                    </td>
                    <td>
                      {ele?.status === "blocked" ? (
                        <div
                          onClick={() =>
                            handleStatusUpdate(
                              "unblock",
                              ele?.name,
                              ele?.comment,
                              "active",
                              ele?._id
                            )
                          }
                          className="cursor-pointer text-green-500"
                        >
                          Unblock
                        </div>
                      ) : ele?.status === "rejected" ? (
                        <div className="flex gap-x-2">
                          <p
                            onClick={() =>
                              handleStatusUpdate(
                                "approve",
                                ele?.name,
                                ele?.comment,
                                "active",
                                ele?._id
                              )
                            }
                            className="cursor-pointer text-green-500"
                          >
                            Approve
                          </p>
                          <p className="text-slate-500">|</p>
                          <p
                            onClick={() =>
                              handleStatusUpdate(
                                "block",
                                ele?.name,
                                ele?.comment,
                                "blocked",
                                ele?._id
                              )
                            }
                            className="cursor-pointer text-red-600"
                          >
                            Block
                          </p>
                        </div>
                      ) : ele?.status === "awaiting" ? (
                        <div className="flex gap-x-2">
                          <p
                            onClick={() =>
                              handleStatusUpdate(
                                "reject",
                                ele?.name,
                                ele?.comment,
                                "rejected",
                                ele?._id
                              )
                            }
                            className="cursor-pointer text-black"
                          >
                            Reject
                          </p>
                          <p className="text-slate-500">|</p>
                          <p
                            onClick={() =>
                              handleStatusUpdate(
                                "approve",
                                ele?.name,
                                ele?.comment,
                                "active",
                                ele?._id
                              )
                            }
                            className="cursor-pointer text-green-500"
                          >
                            Approve
                          </p>
                        </div>
                      ) : (
                        <div
                          className="cursor-pointer text-red-600"
                          onClick={() =>
                            handleStatusUpdate(
                              "block",
                              ele?.name,
                              ele?.comment,
                              "blocked",
                              ele?._id
                            )
                          }
                        >
                          Block
                        </div>
                      )}
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
      {statusUpdate.show && (
        <StatusManage
          id={statusUpdate.id}
          status={statusUpdate.status}
          name={statusUpdate.name}
          text={statusUpdate.text}
          comment={statusUpdate.comment}
          type="club"
          close={() => {
            setStatusUpdate(initialValue);
          }}
          successClose={handleSuccessClose}
        />
      )}
      {viewData.show && (
        <ViewData
          data={viewData.data}
          close={() => {
            setViewData({ show: false, data: {} });
          }}
        />
      )}
      {showDoc.show && (
        <Modal
          closeOnOutSide
          closeModal={() => {
            setShowDoc({ show: false, doc: "" });
          }}
        >
          <div className="lg:w-[600px] w-[80vw]" />
          <div className="h-[70vh]">
            <iframe
              src={showDoc.doc}
              title="doc"
              scrolling="auto"
              height="87%"
              width="100%"
              frameBorder="0"
              className="absolute top-16 left-0 bottom-0"
            />
          </div>
        </Modal>
      )}
    </div>
  );
}

export default AllClubs;
