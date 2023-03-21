/* eslint-disable no-nested-ternary */
import React, { Children, useState } from "react";
import { Formik, Form } from "formik";
import PropTypes from "prop-types";

import { InputSubmit } from "../InputFields/InputFields";
import arrowIcon from "../../assets/icons/arrow-down.svg";
import tickIcon from "../../assets/icons/tick.svg";

const stepsLabel = ["Basic", "Registration", "Ticket", "Tournament"];

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
    <>
      <div className="py-5 mb-5 border-t border-b">
        <div className="mx-auto max-w-[800px] justify-between my-auto items-center flex">
          {Children.toArray(
            stepsLabel.map((currentElement, i) => (
              <>
                <div className="flex items-center">
                  <button
                    type="button"
                    className={`${
                      activeStep + 1 >= i + 1
                        ? "bg-primary text-white"
                        : "bg-slate-200 text-black"
                    } px-2 py-1 w-8 h-8 mr-1 rounded-full`}
                  >
                    {i + 1 < activeStep + 1 ? (
                      <img
                        src={tickIcon}
                        className="w-10"
                        // width="35"
                        alt={i + 1}
                      />
                    ) : (
                      i + 1
                    )}
                  </button>
                  <p
                    className={`hidden ml-2 sm:block font-medium ${
                      activeStep + 1 === i + 1
                        ? "text-black"
                        : activeStep + 1 > i + 1
                        ? "text-primary"
                        : "text-slate-500"
                    }`}
                  >
                    {currentElement}
                  </p>
                </div>
                {i + 1 !== totalStep && (
                  <img
                    src={arrowIcon}
                    className="w-4 -rotate-90 mx-5 my-auto"
                    alt={i + 1}
                  />
                )}
              </>
            ))
          )}
        </div>
      </div>
      <div className="max-w-[800px] mx-auto flex flex-col">
        <Formik
          initialValues={formInitialValues}
          validationSchema={currentValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, ...props }) => (
            <Form className="min-h-[70vh] flex flex-col justify-between">
              <div className="self-center h-full my-auto max-w-[800px] mx-auto  py-5 rounded box-border">
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
    </>
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
