import React, { useState } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";

import { InputSubmit } from "../InputFields/InputFields";
import OrgForm from "./OrgForm";
import spinnerIcon from "../../assets/icons/spinner.svg";

function NoOrg() {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const refresh = useRefreshToken();

  return loading ? (
    <div className="flex justify-center items-center h-[90vh]">
      <img src={spinnerIcon} className="w-9 animate-spin" alt="Loading..." />
    </div>
  ) : (
    <div className="h-[80vh] flex justify-center ">
      <div className="mt-10 shadow-sm border h-fit py-6 px-5 w-11/12 sm:w-4/5 md:w-1/2 max-w-[900px] rounded text-center box-border">
        <p />
        <h2 className="text-xl">You don&apos;t have a organization!</h2>
        <InputSubmit
          type="button"
          value="Create new"
          className="w-fit px-7 mt-4"
          onClick={() => {
            setShowForm(true);
          }}
        />
      </div>
      {showForm && (
        <OrgForm
          onClose={setShowForm}
          reRender={() => {
            setLoading(true);
            refresh();
          }}
        />
      )}
    </div>
  );
}

export default NoOrg;
