import React, { Children, useState } from "react";
import { Formik, Form } from "formik";
import PropTypes from "prop-types";

import { InputSubmit } from "../InputFields/InputFields";
import arrowIcon from "../../assets/icons/arrow-down.svg";
import tickIcon from "../../assets/icons/tick.svg";

function MultiStepForm({
  formInitialValues,
  validationSchema,
  submitForm,
  children,
  isLastStep,
  totalStep,
}) {
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];

  const handleSubmit = (values, actions) => {
    submitForm(values, activeStep, actions)
      .then(() => {
        setActiveStep((prvs) => prvs + 1);
      })
      .catch(() => {})
      .finally(() => {
        actions.setTouched({});
        actions.setSubmitting(false);
      });
  };

  const handleBack = (e) => {
    e.preventDefault();
    setActiveStep((prvs) => prvs - 1);
  };

  return (
    <div className="max-w-[800px] mx-auto flex flex-col">
      <div className="mx-auto mb-5 flex">
        {Children.toArray(
          Array.from({ length: totalStep }).map((currentElement, i) => (
            <>
              <button
                type="button"
                className={`${
                  activeStep + 1 >= i + 1
                    ? "bg-primary text-white"
                    : "bg-slate-200 text-black"
                } px-2 py-1 w-8 mr-1 rounded-full`}
              >
                {i + 1 < activeStep + 1 ? (
                  <img src={tickIcon} className="w-36" width="35" alt={i + 1} />
                ) : (
                  i + 1
                )}
              </button>
              {i + 1 !== totalStep && (
                <img
                  src={arrowIcon}
                  className="w-5 -rotate-90 mr-3"
                  alt={i + 1}
                />
              )}
            </>
          ))
        )}
      </div>
      <Formik
        initialValues={formInitialValues}
        validationSchema={currentValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, ...props }) => (
          <Form className="min-h-[70vh] flex flex-col justify-between">
            <div className="self-center h-full my-auto max-w-[800px] mx-auto  py-5 px-4 sm:px-5 rounded box-border">
              {children(activeStep, props)}
            </div>
            <div className="flex justify-end mt-6">
              {activeStep > 0 && (
                <InputSubmit
                  onClick={handleBack}
                  disabled={isSubmitting}
                  className="w-28 mr-2 !bg-white !text-primary"
                  value="Back"
                />
              )}
              <InputSubmit
                type="submit"
                className="w-44"
                value={isLastStep ? "Submit" : "Save & Continue"}
                loadingValue={isSubmitting ? "Saving..." : ""}
              />
            </div>
          </Form>
        )}
      </Formik>
      <div />
    </div>
  );
}

MultiStepForm.defaultProps = {
  totalStep: 0,
};

MultiStepForm.propTypes = {
  formInitialValues: PropTypes.object.isRequired,
  validationSchema: PropTypes.arrayOf(PropTypes.object).isRequired,
  submitForm: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
  isLastStep: PropTypes.bool.isRequired,
  totalStep: PropTypes.number,
};

export default MultiStepForm;
