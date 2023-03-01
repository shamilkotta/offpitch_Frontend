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
      </div>

      <div className="sm:h-12 border-y py-10 border-slate-200 flex flex-col min-[500px]:flex-row justify-between min-[500px]:items-center">
        <InputCheckBox
          id="matchday_ticket"
          name="tickets.matchday_ticket.is"
          onBlur={handleBlur}
          errorMsg={
            errors.tickets?.matchday_ticket?.is &&
            touched.tickets?.matchday_ticket?.is
              ? errors.tickets?.matchday_ticket?.is
              : ""
          }
          checked={values.tickets.matchday_ticket.is}
          onChange={(e) => {
            setFieldValue("tickets.matchday_ticket.is", e.target.checked);
            if (!e.target.checked)
              setFieldValue("tickets.matchday_ticket.amount", "");
            setFieldValue("tickets.matchday_ticket.total", "");
          }}
          label="Matchday ticket"
          className="text-slate-500"
        />
        {values.tickets.matchday_ticket.is && (
          <div className="flex gap-x-3 items-center mt-2">
            <div>
              <InputFields
                name="tickets.matchday_ticket.amount"
                value={values.tickets.matchday_ticket.amount}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  errors.tickets?.matchday_ticket?.amount &&
                  touched.tickets?.matchday_ticket?.amount
                }
                type="number"
                className="w-32"
                holder="Amount"
              />
            </div>
            <div>
              <InputFields
                name="tickets.matchday_ticket.total"
                value={values.tickets.matchday_ticket.total}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  errors.tickets?.matchday_ticket?.total &&
                  touched.tickets?.matchday_ticket?.total
                }
                type="number"
                className="w-32"
                holder="Count"
              />
            </div>
          </div>
        )}
      </div>
      <div className="sm:h-12 border-b py-10 border-slate-200 flex flex-col min-[500px]:flex-row justify-between min-[500px]:items-center">
        <InputCheckBox
          id="season_ticket"
          name="tickets.season_ticket.is"
          onBlur={handleBlur}
          errorMsg={
            errors.tickets?.season_ticket?.is &&
            touched.tickets?.season_ticket?.is
              ? errors.tickets?.season_ticket?.is
              : ""
          }
          checked={values.tickets.season_ticket.is}
          onChange={(e) => {
            setFieldValue("tickets.season_ticket.is", e.target.checked);
            if (!e.target.checked)
              setFieldValue("tickets.season_ticket.amount", "");
            setFieldValue("tickets.season_ticket.total", "");
          }}
          label="Season ticket"
          className="text-slate-500"
        />
        {values.tickets.season_ticket.is && (
          <div className="flex gap-x-3 items-center mt-2">
            <div>
              <InputFields
                name="tickets.season_ticket.amount"
                value={values.tickets.season_ticket.amount}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  errors.tickets?.season_ticket?.amount &&
                  touched.tickets?.season_ticket?.amount
                }
                type="number"
                className="w-32"
                holder="Amount"
              />
            </div>
            <div>
              <InputFields
                name="tickets.season_ticket.total"
                value={values.tickets.season_ticket.total}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  errors.tickets?.season_ticket?.total &&
                  touched.tickets?.season_ticket?.total
                }
                type="number"
                className="w-32"
                holder="Count"
              />
            </div>
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
