import * as yup from "yup";

export default yup.object().shape({
  otp1: yup.number("Invalid otp").required("Can't be empty"),
  otp2: yup.number("Invalid otp").required("Can't be empty"),
  otp3: yup.number("Invalid otp").required("Can't be empty"),
  otp4: yup.number("Invalid otp").required("Can't be empty"),
  otp5: yup.number("Invalid otp").required("Can't be empty"),
  otp6: yup.number("Invalid otp").required("Can't be empty"),
});
