import React from "react";
import PropTypes from "prop-types";
import InputCheckBox from "../InputFields/InputCheckBox";

function TournamentType({
  values,
  errors,
  touched,
  handleBlur,
  setFieldValue,
}) {
  return (
    <div>
      <div className="w-[80vw] max-w-[700px] flex flex-col gap-y-2 !box-border">
        <p className="text-slate-500 text-lg">Tournament type: </p>
        <div className="ml-2">
          <div className="my-5 border-b py-4">
            <InputCheckBox
              id="tournament_t1"
              name="tournament_type"
              onBlur={handleBlur}
              errorMsg={
                errors?.tournament_type && touched?.tournament_type
                  ? errors?.tournament_type
                  : ""
              }
              checked={values?.tournament_type === "t1"}
              onChange={(e) => {
                if (e.target.checked) {
                  setFieldValue("tournament_type", "t1");
                }
              }}
              label="League (Round robin tournament)"
              className="text-slate-500 text-lg"
            />
          </div>
          <div className="my-5 border-b pb-4">
            <InputCheckBox
              id="tournament_t2"
              name="tournament_type"
              onBlur={handleBlur}
              errorMsg={
                errors?.tournament_type && touched?.tournament_type
                  ? errors?.tournament_type
                  : ""
              }
              checked={values?.tournament_type === "t2"}
              onChange={(e) => {
                if (e.target.checked) {
                  setFieldValue("tournament_type", "t2");
                }
              }}
              label="Knock-out (Elimination tournament)"
              className="text-slate-500 text-lg"
            />
          </div>
          <div className="my-5 pb-4">
            <InputCheckBox
              id="tournament_t3"
              name="tournament_type"
              onBlur={handleBlur}
              errorMsg={
                errors?.tournament_type && touched?.tournament_type
                  ? errors?.tournament_type
                  : ""
              }
              checked={values?.tournament_type === "t3"}
              onChange={(e) => {
                if (e.target.checked) {
                  setFieldValue("tournament_type", "t3");
                }
              }}
              label="Group stage + knockout"
              className="text-slate-500 text-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

TournamentType.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  handleBlur: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

export default TournamentType;
