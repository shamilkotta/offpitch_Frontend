import React from "react";
import { useLocation, Navigate } from "react-router-dom";

import OtpForm from "../../components/OtpForm/OtpForm";

function OtpConfirmation() {
  const location = useLocation();
  const confirmToken = location.state?.confirmToken;

  return !confirmToken ? (
    <Navigate to="/login" replace />
  ) : (
    // return (
    <div className="w-full">
      <div className="py-10 px-5 sm:p-10 max-w-[1500px] mx-auto box-border">
        <div className="flex justify-center px-2 sm:px-4 md:px-2 my-12">
          <div className="w-fit flex justify-center h-full rounded-lg shadow-lg box-border">
            <div className="w-full bg-white py-5 px-8 lg:px-10 rounded-lg lg:rounded-l-none mx-auto box-border">
              <h3 className="pt-4 text-2xl font-bold text-center">
                Verify your identity
              </h3>
              <p className="text-center mb-6">
                Enter the code recieved in your registered email
              </p>

              <OtpForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpConfirmation;
