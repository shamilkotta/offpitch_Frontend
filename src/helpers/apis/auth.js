import axios from "../../config/api";

export const signupApi = ({ name, email, password }) =>
  axios.post("/auth/signup", { name, email, password });

export const loginApi = ({ email, password }) =>
  axios.post("/auth/login", { email, password }, { withCredentials: true });

export const verifyEmailApi = ({ otp, token }) =>
  axios.post("/auth/verify-email", { otp, token }, { withCredentials: true });

export const resendOtpApi = ({ token }) =>
  axios.get(`/auth/resend-otp/${token}`);

export const refreshTokenApi = () =>
  axios.get("/auth/refresh", { withCredentials: true });

export const logoutApi = () =>
  axios.get("/auth/logout", { withCredentials: true });

export const forgotPasswordApi = ({ email }) =>
  axios.post("/auth/forgot-password", { email });

export const resetPasswordApi = ({ password, token }) =>
  axios.post("/auth/reset-password", { password, token });
