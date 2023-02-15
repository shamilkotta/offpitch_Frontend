import * as yup from "yup";

export default [
  // step 1
  yup.object().shape({
    title: yup
      .string()
      .trim()
      .required("Title can not be empty")
      .min(100, "Too short")
      .max(200, "Too long, maximum of 200 characters"),
    short_description: yup
      .string()
      .trim()
      .required("Description can not be empty")
      .min(300, "Too short")
      .max(400, "Too long, maximum of 400 characters"),
    start_date: yup
      .date()
      .typeError("Please add valid starting date")
      .min(new Date(), "Enter a valid starting date")
      .required("Starting date can not be empty"),
    location: yup.string().required("Location can not be empty").trim(),
    description: yup
      .string()
      .trim()
      .required("About section can not be empty")
      .min(500, "Too short")
      .max(1000, "Too long description"),
  }),
  // step 2
  yup.object().shape({
    instruction: yup
      .string()
      .trim()
      .required("About section can not be empty")
      .min(500, "Too short")
      .max(1000, "Too long description"),
    no_teams: yup
      .number("Enter no of teams that can be registerd")
      .typeError("Enter no of teams that can be registerd")
      .required("No of teams can not be empty")
      .min(4, "Atleast 4 teams needed")
      .max(50, "Can only register upto 50 teams max"),
    max_no_players: yup
      .number("Enter valid no of players")
      .typeError("Enter valid no of palyers")
      .required("No of players can not be empty")
      .min(3, "3-a-side the minimum match")
      .max(18, "Allowed only max upto 18 players"),
    have_registration_fee: yup
      .boolean("Choose valid selection")
      .typeError("Choose valid selection")
      .required("Choose valid selection")
      .default(false),
    registration_fee: yup
      .number("Enter a valid amount")
      .typeError("Enter a valid amount")
      .when("have_registration_fee", {
        is: true,
        then: (schema) =>
          schema
            .required("Enter a valid fee amount")
            .min(1, "Enter a valid amount"),
      }),
  }),
  // step 3
  yup.object().shape({
    have_matchday_ticket: yup
      .boolean("choose a valid ticket option")
      .typeError("Choose valid ticket option"),
    matchday_ticket: yup
      .number("Enter a valid amount")
      .typeError("Enter a valid amount")
      .when("have_matchday_ticket", {
        is: true,
        then: (schema) =>
          schema
            .required("Enter a valid fee amount")
            .min(1, "Enter a valid amount"),
      }),
    have_season_ticket: yup
      .boolean("choose a valid ticket option")
      .typeError("Choose valid ticket option"),
    season_ticket: yup
      .number("Enter a valid amount")
      .typeError("Enter a valid amount")
      .when("have_season_ticket", {
        is: true,
        then: (schema) =>
          schema
            .required("Enter a valid fee amount")
            .min(1, "Enter a valid amount"),
      }),
  }),
  // step 4
  yup.object().shape({
    type: yup
      .string()
      .oneOf(["t1", "t2", "t3", "t4"], "Choose valid tournament type")
      .required("Choose valid tournament type"),
  }),
];
