import * as yup from "yup";

export default yup.object().shape({
  name: yup.string().trim().required("Name can not be empty"),
  date_of_birth: yup
    .date()
    .typeError("Please add valid date of birth")
    .min("1953-01-01", "Enter a valid date of birth")
    .max(new Date(), "Enter a valid date of birth")
    .required("Date of birth can not be empty"),
});
