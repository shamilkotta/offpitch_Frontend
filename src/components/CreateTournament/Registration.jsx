import React, { useState } from "react";
import PropTypes from "prop-types";

import InputCheckBox from "../InputFields/InputCheckBox";
import InputFields, { CssTextField } from "../InputFields/InputFields";

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
        <CssTextField
          error={errors.instruction && touched.instruction}
          sx={{ marginTop: "8px" }}
          label="Instructions for clubs"
          name="instruction"
          value={values.instruction}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={
            errors.instruction && touched.instruction ? errors.instruction : ""
          }
          multiline
          rows={8}
        />
        <div className="flex flex-col min-[440px]:flex-row gap-2 w-full">
          <CssTextField
            error={errors.no_teams && touched.no_teams}
            sx={{ marginTop: "8px" }}
            name="no_teams"
            value={values.no_teams}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={
              errors.no_teams && touched.no_teams ? errors.no_teams : ""
            }
            label="Max no of registration"
            className="w-full"
          />
          <div className="w-full">
            <p className="text-slate-500 text-sm">Last date for registration</p>
            <InputFields
              name="registration.last_date"
              className="h-12"
              transform="w-full "
              holder="Last date for registration"
              value={values.registration?.last_date}
              onChange={handleChange}
              onBlur={handleBlur}
              errorMsg={
                errors.registration?.last_date &&
                touched.registration?.last_date
                  ? errors.registration?.last_date
                  : ""
              }
              type="date"
            />
          </div>
        </div>
        <div className="flex flex-col min-[440px]:flex-row gap-2 mb-1 w-full">
          <CssTextField
            error={errors.min_no_players && touched.min_no_players}
            sx={{ marginTop: "8px" }}
            name="min_no_players"
            value={values.min_no_players}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={
              errors.min_no_players && touched.min_no_players
                ? errors.min_no_players
                : ""
            }
            label="Min no of players"
            className="w-full"
          />
          <CssTextField
            error={errors.max_no_players && touched.max_no_players}
            sx={{ marginTop: "8px" }}
            name="max_no_players"
            value={values.max_no_players}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={
              errors.max_no_players && touched.max_no_players
                ? errors.max_no_players
                : ""
            }
            label="Max no of players"
            className="w-full"
          />
        </div>
        <div className="sm:h-12 my-5 border-slate-300 flex gap-3 flex-col min-[500px]:flex-row justify-between min-[500px]:items-center">
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
              <div>
                <CssTextField
                  error={
                    errors.registration?.fee?.amount &&
                    touched.registration?.fee?.amount
                  }
                  sx={{ marginTop: "8px" }}
                  name="registration.fee.amount"
                  value={values.registration?.fee?.amount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.registration?.fee?.amount &&
                    touched.registration?.fee?.amount
                      ? errors?.registration?.fee?.amount
                      : ""
                  }
                  label="Amount"
                  className="w-full"
                  fullwidth
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
