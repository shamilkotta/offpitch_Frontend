import * as yup from "yup";

export default [
  // step 1
  yup.object().shape({
    cover: yup
      .object()
      .shape({
        url: yup.string().trim().required("Image can not be emtpty"),
      })
      .typeError("Image can not be empty"),
    title: yup
      .string()
      .trim()
      .required("Title can not be empty")
      .min(10, "Atleast 10 characters"),
    short_description: yup
      .string()
      .trim()
      .required("Description can not be empty")
      .min(200, "Atleast 200 characters")
      .max(400, "Too long, maximum of 400 characters"),
    start_date: yup
      .date()
      .typeError("Enter valid date")
      .min(new Date(), "Enter a valid date")
      .required("Starting date can not be empty"),
    location: yup.string().trim().required("Location can not be empty"),
    description: yup
      .string()
      .trim()
      .required("About section can not be empty")
      .min(500, "Atleast 500 characters"),
  }),
  // step 2
  yup.object().shape({
    instruction: yup
      .string()
      .trim()
      .required("Instructions can not be empty")
      .min(500, "Atleast 500 characters"),
    no_teams: yup
      .number("Number of  registration")
      .typeError("Number of  registration")
      .required("No of registration can not be empty")
      .min(4, "Atleast 4 teams needed")
      .max(64, "Can only register upto 64 teams max"),
    registration_date: yup
      .date()
      .typeError("Enter last date of registration")
      .min(new Date(), "Enter last date of registration")
      .required("Last date can not be empty"),
    min_no_players: yup
      .number("Enter valid number")
      .typeError("Enter valid number")
      .required("No of players can not be empty")
      .min(3, "3-a-side the minimum match")
      .max(11, "Only upto 11-a-side match"),
    max_no_players: yup
      .number("Enter valid number")
      .typeError("Enter valid number")
      .required("No of players can not be empty")
      .min(3, "3-a-side the minimum match")
      .max(18, "Only max upto 18 players")
      // eslint-disable-next-line func-names
      .test("Valid no", "Can't be less than minimum", function (value) {
        return value >= this.parent.min_no_players;
      }),
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
        total: yup
          .number("Enter total tickets count")
          .typeError("Enter total tickets count")
          .when("is", {
            is: true,
            then: (schema) =>
              schema.required("Enter total count").min(1, "Enter total count"),
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
        total: yup
          .number("Enter total tickets count")
          .typeError("Enter total tickets count")
          .when("is", {
            is: true,
            then: (schema) =>
              schema.required("Enter total count").min(1, "Enter total count"),
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
