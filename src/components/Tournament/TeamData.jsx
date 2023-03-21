import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import RightDrawer from "../Drawer/RightDrawer";
import spinnerIcon from "../../assets/icons/spinner.svg";
import axios from "../../config/api";
import { useErrorToast } from "../../hooks/useToast";
import Modal from "../Modal/Modal";

function TeamData({ close, data, openState }) {
  const [fetching, setFetching] = useState(false);
  const [clubData, setClubData] = useState({});
  const [showDoc, setShowDoc] = useState({ show: false, doc: "" });

  const fetchTeamData = () => {
    axios
      .get(`/tournament/${data.tournament}/club/${data.teamId}`)
      .then((res) => {
        if (res?.data?.success) {
          setClubData(res?.data?.data);
        } else {
          useErrorToast({ message: "Can't fetch club data" });
          close();
        }
      })
      .catch(() => {
        useErrorToast({ message: "Can't fetch club data" });
        close();
      })
      .finally(() => {
        setFetching(false);
      });
  };

  useEffect(() => {
    if (openState) {
      setFetching(true);
      fetchTeamData();
    }
  }, [openState]);

  return (
    <RightDrawer
      openState={openState}
      close={() => {
        close();
      }}
    >
      <div className="w-[80vw] min-[450px]:w-[400px]">
        {fetching ? (
          <div className="h-[50vh] flex items-center justify-center">
            <img
              src={spinnerIcon}
              className="w-7 animate-spin"
              alt="Loading..."
            />
          </div>
        ) : (
          <div>
            <div>
              <div className="flex justify-between items-end">
                <div className="rounded-full z-20 w-fit bg-white border-gray-400 border p-1">
                  <img
                    src={clubData.profile}
                    alt="profile"
                    className="w-20 h-20  rounded-full"
                  />
                </div>
                <Link to={`/club/${data.tournament}`}>
                  <h1 className="text-blue-900 mb-3 cursor-pointer">View</h1>
                </Link>
              </div>
              <hr className="-mt-2 0" />
            </div>
            <h1 className="font-medium mt-3 text-xl">{clubData.name}</h1>
            <p className="my-2 text-slate-500">Players</p>

            <div className="grid grid-cols-2 min-[400px]:grid-cols-4 auto-rows-auto gap-1 sm:gap-2">
              {clubData?.players?.map((ele) => (
                <div
                  // eslint-disable-next-line no-underscore-dangle
                  key={ele._id}
                  onClick={() => {
                    if (data.isHost) setShowDoc({ show: true, doc: ele.doc });
                  }}
                  className="w-full h-40 px-2 rounded border-black shadow border relative bg-center bg-cover bg-no-repeat flex items-end after:content-[''] after:bg-gradient-to-t after:from-black after:via-transparent after:to-transparent after:absolute after:top-0 after:bottom-0 after:right-0 after:left-0"
                  style={{
                    backgroundImage: `url('${ele.profile}')`,
                  }}
                >
                  <div className="z-10 text-white mb-2">
                    <h2 className="text-base font-bold leading-4">
                      {ele.name}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

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
    </RightDrawer>
  );
}

TeamData.propTypes = {
  close: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  openState: PropTypes.bool.isRequired,
};

export default TeamData;
