import React, { useState } from "react";
import PropTypes from "prop-types";

import useRefreshToken from "../../hooks/useRefreshToken";
import ClubForm from "./ClubForm";

function NoClub({ status }) {
  const [showForm, setShowForm] = useState(false);
  const [clubStatus, setClubStatus] = useState(status);
  const refresh = useRefreshToken();

  if (clubStatus === "blocked")
    return (
      <div className="h-[80vh] flex justify-center ">
        <div className="mt-10 shadow-sm border h-fit py-6 px-5 w-11/12 sm:w-4/5 md:w-1/2 max-w-[900px] flex flex-wrap justify-center items-center gap-x-2 rounded text-center box-border">
          <h2 className="text-lg">Your club is blocked!</h2>
          <button type="button" className="text-primary text-lg">
            Contact support center
          </button>
        </div>
      </div>
    );

  if (clubStatus === "awaiting")
    return (
      <div className="h-[80vh] flex justify-center ">
        <div className="mt-10 shadow-sm border h-fit py-6 px-5 w-11/12 sm:w-4/5 md:w-1/2 max-w-[900px] flex flex-wrap justify-center items-center gap-x-2 rounded text-center box-border">
          <h2 className="text-lg">Your club is waiting for approval,</h2>
          <h2 className="text-lg">Check back later!</h2>
        </div>
      </div>
    );

  if (clubStatus === "rejected")
    return (
      <div className="h-[80vh] flex justify-center ">
        <div className="mt-10 shadow-sm border h-fit py-6 px-5 w-11/12 sm:w-4/5 md:w-1/2 max-w-[900px] flex flex-wrap justify-center items-center gap-x-2 rounded text-center box-border">
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
    <div className="h-[80vh] flex justify-center ">
      <div className="mt-10 shadow-sm border h-fit py-6 px-5 w-11/12 sm:w-4/5 md:w-1/2 max-w-[900px] flex flex-wrap justify-center items-center gap-x-2 rounded text-center box-border">
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
