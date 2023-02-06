import axios from "../../config/api";

export const signup = ({ name, email, password }) =>
  axios.post("/auth/signup", { name, email, password });

export const login = ({ email, password }) =>
  axios.post("/auth/login", { email, password });

export const resend = ({ token }) => axios.get(`/auth/resend-otp/${token}`);

export const refresh = () =>
  axios.get("/auth/refresh", { withCredentials: true });

export const logout = () => axios.get("/logout", { withCredentials: true });
