import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import follwersIcon from "../../assets/icons/followers.svg";
import smsIcon from "../../assets/icons/sms.svg";
import callIcon from "../../assets/icons/call.svg";
import useAxiosPrivate from "../../hooks/userAxiosPrivate";
import { useErrorToast } from "../../hooks/useToast";
import spinnerIcon from "../../assets/icons/spinner.svg";
import OrgForm from "./OrgForm";

function PrivateOrg() {
  // const [showUpcoming, setShowUpcoming] = useState(true);
  const [currentTab, setCurrentTab] = useState("upcoming");
  const [editModal, setEditModal] = useState(false);
  const [data, setData] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(false);
  const axios = useAxiosPrivate();
  const location = useLocation();
  const navigate = useNavigate();

  const fetchData = () => {
    axios
      .get("/user/organization")
      .then((res) => {
        if (res.data.success) {
          setData(res?.data?.data);
          setTournaments(res?.data?.data?.tournaments);
          setData((prvs) => ({ ...prvs, tournaments: "" }));
        } else {
          useErrorToast({
            message: res?.data?.message || "Something went wrong",
          });
          navigate(location.state?.from || "/");
        }
      })
      .catch((err) => {
        useErrorToast({ message: err?.response?.data?.message });
        navigate(location.state?.from || "/");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  return loading ? (
    <div className="flex justify-center items-center h-[90vh]">
      <img src={spinnerIcon} className="w-9 animate-spin" alt="Loading..." />
    </div>
  ) : (
    <div className="">
      <div className="max-w-[1400px] mx-auto py-16 px-10 ">
        <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 grid-rows-[auto_auto_auto_1fr] mb-8">
          <div className="col-span-1 row-start-1 row-end-3 sm:row-end-4 order-1">
            <img
              src={data.profile}
              alt="profile"
              className="w-32 h-36 sm:w-36 h:w-40 border-2 rounded"
            />
          </div>
          <div className="row-sapn-1 col-start-2 col-end-3 order-2 h-fit">
            <p className="text-2xl font-medium py-0 my-0">{data.name}</p>
          </div>
          <div className="order-5 sm:order-4 md:order-3 row-span-1 col-start-1 col-end-3 sm:col-start-2 sm:col-end-3 md:col-start-3 md:col-end-4">
            <button
              type="button"
              className="border bg-gray-200 font-medium px-3 py-1 rounded-sm"
              onClick={() => {
                setEditModal(true);
              }}
            >
              Edit details
            </button>
          </div>
          <div className="order-4 sm:order-5 md:order-4 row-span-1 col-start-1 col-end-3 md:col-start-2 md:col-end-4">
            <p className="">{data.description}</p>
          </div>
          <div className="order-3 md:order-5 row-span-1 col-start-2 col-end-3 flex gap-x-3 gap-y-1 text-center text-base flex-wrap">
            <Link
              to={`/organization/${data.uid}`}
              state={{ from: location.pathname }}
              className="flex hover:text-primary flex-nowrap gap-1 items-center"
            >
              <img src={follwersIcon} alt="followers" className="w-5" />
              <p>{data.followers} followers</p>
            </Link>
            <a
              href={`mailto:${data.email}`}
              className="flex hover:text-primary flex-nowrap gap-1 items-center"
            >
              <img src={smsIcon} alt="followers" className="w-5" />
              <p>{data.email}</p>
            </a>
            <a
              href={`tel:${data.phone}`}
              className="flex hover:text-primary flex-nowrap gap-1 items-center"
            >
              <img src={callIcon} alt="followers" className="w-5" />
              <p>{data.phone}</p>
            </a>
          </div>
        </div>
        <hr />
        <div className="mt-4">
          <h1 className="text-lg font-medium mb-3">You&apos;r tournaments</h1>
          <div className="flex gap-3">
            <div className="flex gap-x-1">
              <button
                type="button"
                className={`${
                  currentTab === "upcoming"
                    ? "bg-primary text-white"
                    : "bg-slate-200 text-black"
                } px-3 py-1 rounded-l-sm`}
                onClick={() => {
                  setCurrentTab("upcoming");
                }}
              >
                Upcoming
              </button>
              <button
                type="button"
                className={`px-3 py-1 rounded-r-sm  ${
                  currentTab === "ended"
                    ? "bg-primary text-white"
                    : "bg-slate-200 text-black"
                }`}
                onClick={() => {
                  setCurrentTab("ended");
                }}
              >
                Ended
              </button>
            </div>
            <button type="button" className="bg-slate-200 px-3 py-1">
              Host new tournament
            </button>
          </div>
        </div>
      </div>
      {editModal && (
        <OrgForm
          onClose={() => {
            setEditModal(false);
          }}
          data={{
            name: data.name,
            email: data.email,
            phone: data.phone,
            description: data.description,
          }}
          profile={data.profile}
          reRender={fetchData}
        />
      )}
    </div>
  );
}

export default PrivateOrg;
