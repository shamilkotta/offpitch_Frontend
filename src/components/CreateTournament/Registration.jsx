import React, { useState } from "react";
import PropTypes from "prop-types";

import InputCheckBox from "../InputFields/InputCheckBox";
import InputFields, { InputTextArea } from "../InputFields/InputFields";

function Registration({
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
  setFieldValue,
}) {
  const [handleFeeAmount, setHandleFeeAmount] = useState(
    values.registration?.fee?.is
  );

  return (
    <div>
      <div className="w-[80vw] max-w-[700px] flex flex-col gap-y-2 !box-border">
        <InputTextArea
          name="instruction"
          value={values.instruction}
          onChange={handleChange}
          onBlur={handleBlur}
          errorMsg={
            errors.instruction && touched.instruction ? errors.instruction : ""
          }
          holder="Instruction for clubs"
          rows={8}
        />
        <div className="min-[440px]:flex gap-y-2 w-full">
          <InputFields
            name="no_teams"
            value={values.no_teams}
            onChange={handleChange}
            onBlur={handleBlur}
            errorMsg={
              errors.no_teams && touched.no_teams ? errors.no_teams : ""
            }
            holder="Max no of registration"
            type="number"
            className="h-12"
            transform="mr-2 mb-2 min-[440px]:mb-0 w-full"
            maxLength="160"
          />
          <InputFields
            name="registration.last_date"
            className="h-12"
            transform="w-full "
            holder="Last date for registration"
            value={values.registration?.last_date}
            onChange={handleChange}
            onBlur={handleBlur}
            errorMsg={
              errors.registration?.last_date && touched.registration?.last_date
                ? errors.registration?.last_date
                : ""
            }
            type="date"
          />
        </div>
        <div className="min-[440px]:flex gap-y-2 mb-1 w-full">
          <InputFields
            name="min_no_players"
            value={values.min_no_players}
            onChange={handleChange}
            onBlur={handleBlur}
            errorMsg={
              errors.min_no_players && touched.min_no_players
                ? errors.min_no_players
                : ""
            }
            holder="Min no of players"
            type="number"
            className="h-12"
            transform="w-full mr-2 mb-2 min-[440px]:mb-0 "
            maxLength="160"
          />
          <InputFields
            name="max_no_players"
            value={values.max_no_players}
            onChange={handleChange}
            onBlur={handleBlur}
            errorMsg={
              errors.max_no_players && touched.max_no_players
                ? errors.max_no_players
                : ""
            }
            holder="Max no of players"
            type="number"
            className="h-12"
            transform="w-full"
            maxLength="160"
          />
        </div>
        <div className="sm:h-12 my-3 min-[500px]:my-1 border-slate-300 flex flex-col min-[500px]:flex-row justify-between min-[500px]:items-center">
          <InputCheckBox
            id="registration_fee"
            name="registration.fee.is"
            onBlur={handleBlur}
            errorMsg={
              errors.registration?.fee?.is && touched.registration?.fee?.is
                ? errors.registration?.fee?.is
                : ""
            }
            checked={values.registration?.fee?.is}
            onChange={(e) => {
              setHandleFeeAmount(e.target.checked);
              setFieldValue("registration.fee.is", e.target.checked);
              if (!e.target.checked)
                setFieldValue("registration.fee.amount", 0);
            }}
            label="Registration fee"
            className="text-slate-500"
          />
          {handleFeeAmount && (
            <div className="flex gap-x-3 items-center">
              <p
                className={`${
                  errors.registration?.fee?.amount &&
                  touched.registration?.fee?.amount
                    ? "text-red-600"
                    : "text-slate-500"
                }`}
              >
                Amount:{" "}
              </p>
              <div>
                <InputFields
                  name="registration.fee.amount"
                  value={values.registration?.fee?.amount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    errors.registration?.fee?.amount &&
                    touched.registration?.fee?.amount
                  }
                  type="number"
                  className="w-32"
                  holder=""
                  disabled={!handleFeeAmount}
                />
              </div>
              <p>₹</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Registration.propTypes = {
  values: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

export default Registration;
