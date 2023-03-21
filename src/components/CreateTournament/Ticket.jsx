import React from "react";
import PropTypes from "prop-types";

import InputCheckBox from "../InputFields/InputCheckBox";
import { CssTextField } from "../InputFields/InputFields";

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
      <div className="w-[80vw] max-w-[700px] mb-7 !box-border ">
        <InputCheckBox
          id="ticket"
          name="ticket.is"
          onBlur={handleBlur}
          errorMsg={
            errors?.ticket?.is && touched?.ticket?.is ? errors?.ticket?.is : ""
          }
          checked={values?.ticket?.is}
          onChange={(e) => {
            setFieldValue("ticket.is", e.target.checked);
            if (!e.target.checked) {
              setFieldValue("ticket.amount", 0);
              setFieldValue("ticket.total", 0);
            }
          }}
          label="Do you plan to sell tickets"
          className="text-slate-500 text-lg"
        />
        <p className="text-slate-500">
          You can sell tickets to your tournament through our platform
        </p>
      </div>
      <div className="h-20">
        {values?.ticket?.is && (
          <div className="flex gap-x-3 items-center mt-2">
            <div>
              <CssTextField
                error={errors?.ticket?.amount && touched?.ticket?.amount}
                sx={{ marginTop: "8px" }}
                name="ticket.amount"
                value={values?.ticket?.amount}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  errors?.ticket?.amount && touched?.ticket?.amount
                    ? errors?.ticket?.amount
                    : ""
                }
                label="Amount of ticket"
                className="w-full"
                fullwidth
              />
            </div>
            <div>
              <CssTextField
                error={errors?.ticket?.total && touched?.ticket?.total}
                sx={{ marginTop: "8px" }}
                name="ticket.total"
                value={values?.ticket?.total}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  errors?.ticket?.total && touched?.ticket?.total
                    ? errors?.ticket?.total
                    : ""
                }
                label="Tickets count"
                className="w-full"
                fullwidth
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
