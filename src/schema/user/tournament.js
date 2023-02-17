import * as yup from "yup";

export default [
  // step 1
  yup.object().shape({
    cover: yup
      .object()
      .shape({
        url: yup.string().trim().required("Cover image can not be emtpty"),
      })
      .typeError("Cover image can not be empty"),
    title: yup
      .string()
      .trim()
      .required("Title can not be empty")
      .min(10, "Too short"),
    short_description: yup
      .string()
      .trim()
      .required("Description can not be empty")
      .min(200, "Too short")
      .max(400, "Too long, maximum of 400 characters"),
    start_date: yup
      .date()
      .typeError("Please add valid starting date")
      .min(new Date(), "Enter a valid starting date")
      .required("Starting date can not be empty"),
    location: yup.string().trim().required("Location can not be empty"),
    description: yup
      .string()
      .trim()
      .required("About section can not be empty")
      .min(500, "Too short"),
  }),
  // step 2
  yup.object().shape({
    instruction: yup
      .string()
      .trim()
      .required("About section can not be empty")
      .min(500, "Too short"),
    no_teams: yup
      .number("Enter no of teams that can be registerd")
      .typeError("Enter no of teams that can be registerd")
      .required("No of teams can not be empty")
      .min(4, "Atleast 4 teams needed")
      .max(64, "Can only register upto 64 teams max"),
    max_no_players: yup
      .number("Enter valid no of players")
      .typeError("Enter valid no of palyers")
      .required("No of players can not be empty")
      .min(3, "3-a-side the minimum match")
      .max(18, "Allowed only max upto 18 players"),
    registration_fee: yup.object().shape({
      is: yup
        .boolean("Choose valid selection")
        .typeError("Choose valid selection")
        .required("Choose valid selection")
        .default(false),
      amount: yup
        .number("Enter a valid amount")
        .typeError("Enter a valid amount")
        .when("is", {
          is: true,
          then: (schema) =>
            schema
              .required("Enter a valid fee amount")
              .min(1, "Enter a valid amount"),
        }),
    }),
  }),
  // step 3
  yup.object().shape({
    tickets: yup.object().shape({
      matchday_ticket: yup.object().shape({
        is: yup
          .boolean("choose a valid ticket option")
          .typeError("Choose valid ticket option"),
        amount: yup
          .number("Enter a valid amount")
          .typeError("Enter a valid amount")
          .when("is", {
            is: true,
            then: (schema) =>
              schema
                .required("Enter a valid fee amount")
                .min(1, "Enter a valid amount"),
          }),
      }),

      season_ticket: yup.object().shape({
        is: yup
          .boolean("choose a valid ticket option")
          .typeError("Choose valid ticket option"),
        amount: yup
          .number("Enter a valid amount")
          .typeError("Enter a valid amount")
          .when("is", {
            is: true,
            then: (schema) =>
              schema
                .required("Enter a valid amount")
                .min(1, "Enter a valid amount"),
          }),
      }),
    }),
  }),
  // step 4
  yup.object().shape({
    tournament_type: yup
      .string()
      .oneOf(["t1", "t2", "t3", "t4"], "Choose valid tournament type")
      .required("Choose valid tournament type"),
  }),
];
