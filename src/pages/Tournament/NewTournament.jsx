/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";

import Details from "../../components/CreateTournament/Details";
import MultiStepForm from "../../components/MultiStepForm/MultiStepForm";
import tournamentValidation from "../../schema/user/tournament";
import Registration from "../../components/CreateTournament/Registration";
import Ticket from "../../components/CreateTournament/Ticket";
import TournamentType from "../../components/CreateTournament/TournamentType";

const initialValues = {
  title: "",
  short_description: "",
  start_date: "",
  location: "",
  description: "",
  instruction: "",
  no_teams: "",
  max_no_players: "",
  have_registration_fee: false,
  registration_fee: "",
  have_tickets: true,
  have_matchday_ticket: false,
  matchday_ticket: 0,
  have_season_ticket: false,
  season_ticket: 0,
};

function NewTournament() {
  const [isLastStep, setIsLastStep] = useState(false);

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
        return <TournamentType />;

      default:
        return null;
    }
  };

  const submitForm = () => {};

  return (
    <div className="px-5 sm:px-10 py-12 ">
      <h1 className="text-xl font-medium mb-2 text-center">
        Create new tournament
      </h1>
      <MultiStepForm
        formInitialValues={initialValues}
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

export default NewTournament;
