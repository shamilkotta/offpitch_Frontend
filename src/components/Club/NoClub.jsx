import React, { useState } from "react";
import PropTypes from "prop-types";

import useRefreshToken from "../../hooks/useRefreshToken";
import ClubForm from "./ClubForm";
import noClubImg from "../../assets/img/no-club.svg";
import waitingImg from "../../assets/img/waiting.svg";
import rejectImg from "../../assets/img/reject.svg";
import blockImg from "../../assets/img/block.svg";

function NoClub({ status }) {
  const [showForm, setShowForm] = useState(false);
  const [clubStatus, setClubStatus] = useState(status);
  const refresh = useRefreshToken();

  if (clubStatus === "blocked")
    return (
      <div className="h-[80vh] flex justify-center flex-col items-center">
        <img src={blockImg} className="w-80" alt="no club" />
        <div className="py-6 px-5 flex flex-wrap justify-center items-center gap-x-2 text-center">
          <h2 className="text-lg">Your club is blocked!</h2>
          <button type="button" className="text-primary text-lg">
            Contact support center
          </button>
        </div>
      </div>
    );

  if (clubStatus === "awaiting")
    return (
      <div className="h-[80vh] flex justify-center flex-col items-center">
        <img src={waitingImg} className="w-80" alt="waiting for approval" />
        <div className="py-6 px-5 flex flex-wrap justify-center items-center gap-x-2 text-center">
          <h2 className="text-lg">Your club is waiting for approval,</h2>
          <h2 className="text-lg">Check back later!</h2>
        </div>
      </div>
    );

  if (clubStatus === "rejected")
    return (
      <div className="h-[80vh] flex justify-center flex-col items-center">
        <img src={rejectImg} className="h-72" alt="no club" />
        <div className="py-6 px-5 flex flex-wrap justify-center items-center gap-x-2 text-center">
          <h2 className="text-lg">New club request rejected,</h2>
          <button type="button" className="text-primary text-lg">
            Contact support center
          </button>
          <h2 className="text-lg">or</h2>
          <button
            type="button"
            onClick={() => {
              setShowForm(true);
            }}
            className="text-primary text-lg"
          >
            Create new one
          </button>
        </div>
        {showForm && (
          <ClubForm
            onClose={setShowForm}
            reRender={() => {
              setClubStatus("awaiting");
              refresh();
            }}
          />
        )}
      </div>
    );

  return (
    <div className="h-[80vh] flex justify-center items-center flex-col">
      <img src={noClubImg} className="w-80" alt="no club" />
      <div className="py-6 px-5  flex flex-wrap justify-center items-center gap-x-2 text-center">
        <h2 className="text-lg">You don&apos;t have a club!</h2>
        <button
          type="button"
          onClick={() => {
            setShowForm(true);
          }}
          className="text-primary text-lg"
        >
          Create new
        </button>
      </div>
      {showForm && (
        <ClubForm
          onClose={setShowForm}
          reRender={() => {
            setClubStatus("awaiting");
            refresh();
          }}
        />
      )}
    </div>
  );
}

NoClub.defaultProps = {
  status: "no-club",
};

NoClub.propTypes = {
  status: PropTypes.string,
};

export default NoClub;
