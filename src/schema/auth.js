import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required("Email can not be empty")
    .email("Enter a valid email"),
  password: yup
    .string()
    .trim()
    .required("Password can not be empty")
    .min(8, "Too short password")
    .max(16, "Too long password"),
});

export const signupSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Name can not be empty")
    .test("isPerfectString", "Enter a valid name", (arg) =>
      /^[A-Za-z ]+$/.test(arg)
    ),
  email: yup
    .string()
    .trim()
    .required("Email can not be empty")
    .email("Enter a valid email"),
  password: yup
    .string()
    .trim()
    .required("Password can not be empty")
    .min(8, "Too short password")
    .max(16, "Too long password")
    .test("isPerfectPasswrod", "Enter a strong password", (arg) =>
      /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W])(?!.*\s).{8,16})/.test(arg)
    ),
});
