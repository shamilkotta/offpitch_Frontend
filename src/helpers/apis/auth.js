import axios from "../../config/api";

export const signup = ({ name, email, password }) =>
  axios.post("/auth/signup", { name, email, password });

export const login = ({ email, password }) =>
  axios.post("/auth/login", { email, password });

export const verifyEmail = ({ otp, token }) =>
  axios.post("/auth/verify-email", { otp, token });

export const resendOtp = ({ token }) => axios.get(`/auth/resend-otp/${token}`);

export const refresh = () =>
  axios.get("/auth/refresh", { withCredentials: true });

export const logout = () =>
  axios.get("/auth/logout", { withCredentials: true });
