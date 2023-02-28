import axios from "../../config/api";

export const getTournaments = async (query) => {
  const result = await axios.get(`/tournaments?${query}`);
  return result;
};

export const hi = "";
