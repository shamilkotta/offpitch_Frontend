/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import MultiStepForm from "../MultiStepForm/MultiStepForm";
import Details from "./Details";
import Registration from "./Registration";
import Ticket from "./Ticket";
import TournamentType from "./TournamentType";
import tournamentValidation from "../../schema/user/tournament";
import useAxiosPrivate from "../../hooks/userAxiosPrivate";
import { useErrorToast } from "../../hooks/useToast";

function CreateTournament({ data }) {
  const [initialData, setInitialData] = useState(data);
  const [isLastStep, setIsLastStep] = useState(false);
  const auth = useSelector((state) => state.auth);
  const axios = useAxiosPrivate();
  const navigate = useNavigate();

  const renderStep = (currentStep, props) => {
    setIsLastStep(false);
    switch (currentStep) {
      case 0:
        return <Details {...props} />;
      case 1:
        return <Registration {...props} />;
      case 2:
        return <Ticket {...props} />;
      case 3:
        setIsLastStep(true);
        return <TournamentType {...props} />;

      default:
        return null;
    }
  };

  const handleSubmit = (values) => {
    if (values.cover?.file) {
      // create a formData
      const formData = new FormData();
      formData.append("cover", values.cover.file);
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });
      return axios.put("/user/tournament", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }
    return axios.put("/user/tournament", {
      ...values,
      cover: values.cover?.url,
    });
  };

  const submitForm = async (values, currentStep, actions) => {
    const formData = values;
    formData.step = currentStep + 1;
    try {
      const res = await handleSubmit(formData);

      // last submit
      if (isLastStep) navigate("/user/club");

      // changing values in form data
      actions.setFieldValue("cover.file", null);
      actions.setFieldValue("cover.url", res.data?.data?.cover);
      actions.setFieldValue("id", res.data?.data?.id);

      // changing id and cover image url
      setInitialData((prvs) => ({
        ...prvs,
        id: res.data?.data?.id,
        cover: { ...prvs.cover, url: res.data?.data?.cover },
      }));
    } catch (err) {
      useErrorToast({
        message: err?.response?.data?.message || "Something went wrong",
      });
      throw new Error();
    }
  };

  return !auth?.club ? (
    <Navigate to="/user/club" replace />
  ) : (
    <div className="px-5 sm:px-10 py-12 ">
      <h1 className="text-xl font-medium mb-2 text-center">
        Create new tournament
      </h1>
      <MultiStepForm
        formInitialValues={initialData}
        validationSchema={tournamentValidation}
        submitForm={submitForm}
        isLastStep={isLastStep}
        totalStep={4}
      >
        {(currentStep, { ...props }) => renderStep(currentStep, props)}
      </MultiStepForm>
    </div>
  );
}

CreateTournament.defaultProps = {
  data: {
    title: "",
    cover: {
      file: null,
      url: "",
    },
    short_description: "",
    start_date: "",
    location: "",
    description: "",
    instruction: "",
    no_teams: "",
    registration_date: "",
    min_no_players: "",
    max_no_players: "",
    registration_fee: {
      is: false,
      amount: 0,
    },
    tickets: {
      matchday_ticket: {
        is: false,
        amount: 0,
        total: 0,
      },
      season_ticket: {
        is: false,
        amount: 0,
        total: 0,
      },
    },
    tournament_type: "",
  },
};

CreateTournament.propTypes = {
  data: PropTypes.object,
};

export default CreateTournament;
