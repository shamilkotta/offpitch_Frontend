import * as yup from "yup";

export default yup.object().shape({
  name: yup.string().trim().required("Name can not be empty"),
  email: yup
    .string()
    .trim()
    .required("Email can not be empty")
    .email("Enter a valid email"),
  phone: yup
    .number()
    .typeError("Invalid phone number")
    .required("Phone number can not be empty")
    .integer("Enter a valid phone number")
    .positive("Enter a valid phone number")
    .test("isValidPhone", "Enter a valid phone number", (arg) =>
      /^[0]?[6789]\d{9}$/.test(arg)
    ),
  description: yup
    .string()
    .trim()
    .required("Description can not be empty")
    .min(200, "Too short"),
});
