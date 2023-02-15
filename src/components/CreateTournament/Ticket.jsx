import React from "react";
import PropTypes from "prop-types";

import InputCheckBox from "../InputFields/InputCheckBox";
import InputFields from "../InputFields/InputFields";

function Ticket({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
}) {
  return (
    <div>
      <div className="w-[80vw] max-w-[700px] flex gap-y-2 mb-8 !box-border ">
        <p
          className={`${
            errors.have_tickets && touched.have_tickets
              ? "text-red-600"
              : "text-slate-500"
          } mr-12 text-lg`}
        >
          Do you plan to sell tickets:{" "}
        </p>
        {/* <div className="flex gap-x-4 items-center">
          <InputRadio
            className="text-slate-500"
            value={1}
            checked={values.have_tickets === true}
            onChange={() => {
              setFieldValue("have_tickets", true);
            }}
            label="Yes"
            id="radio1"
            name="have_tickets"
          />
          <InputRadio
            className="text-slate-500"
            label="No"
            id="radio2"
            name="have_tickets"
            value={0}
            checked={values.have_tickets === false}
            onChange={() => {
              setFieldValue("have_tickets", false);
            }}
          />
        </div> */}
      </div>

      <div className="sm:h-12 border-y py-10 border-slate-200 flex flex-col min-[500px]:flex-row justify-between min-[500px]:items-center">
        <InputCheckBox
          id="matchday_ticket"
          name="have_matchday_ticket"
          onBlur={handleBlur}
          errorMsg={
            errors.have_matchday_ticket && touched.have_matchday_ticket
              ? errors.have_matchday_ticket
              : ""
          }
          checked={values.have_matchday_ticket}
          onChange={(e) => {
            setFieldValue("have_matchday_ticket", e.target.checked);
            if (!e.target.checked) setFieldValue("matchday_ticket", 0);
          }}
          label="Matchday ticket"
          className="text-slate-500"
        />
        {values.have_matchday_ticket && (
          <div className="flex gap-x-3 items-center">
            <p
              className={`${
                errors.matchday_ticket && touched.matchday_ticket
                  ? "text-red-600"
                  : "text-slate-500"
              }`}
            >
              Amount:{" "}
            </p>
            <div>
              <InputFields
                name="matchday_ticket"
                value={values.matchday_ticket}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.matchday_ticket && touched.matchday_ticket}
                type="number"
                className="w-32"
                holder=""
                // disabled={!handleFeeAmount}
              />
            </div>
            <p>₹</p>
          </div>
        )}
      </div>
      <div className="sm:h-12 border-b py-10 border-slate-200 flex flex-col min-[500px]:flex-row justify-between min-[500px]:items-center">
        <InputCheckBox
          id="season_ticket"
          name="have_season_ticket"
          onBlur={handleBlur}
          errorMsg={
            errors.have_season_ticket && touched.have_season_ticket
              ? errors.have_season_ticket
              : ""
          }
          checked={values.have_season_ticket}
          onChange={(e) => {
            setFieldValue("have_season_ticket", e.target.checked);
            if (!e.target.checked) setFieldValue("season_ticket", 0);
          }}
          label="Season ticket"
          className="text-slate-500"
        />
        {values.have_season_ticket && (
          <div className="flex gap-x-3 items-center">
            <p
              className={`${
                errors.season_ticket && touched.season_ticket
                  ? "text-red-600"
                  : "text-slate-500"
              }`}
            >
              Amount:{" "}
            </p>
            <div>
              <InputFields
                name="season_ticket"
                value={values.season_ticket}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.season_ticket && touched.season_ticket}
                type="number"
                className="w-32"
                holder=""
                // disabled={!handleFeeAmount}
              />
            </div>
            <p>₹</p>
          </div>
        )}
      </div>
    </div>
  );
}

Ticket.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Ticket;
