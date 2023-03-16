import axios from "../../config/api";

export const getTournaments = async (query, auth) => {
  const result = await axios.get(`/tournaments?${query}`, {
    headers: {
      Authorization: `Bearer ${auth?.accessToken}`,
    },
  });
  return result;
};

export const getTournament = async (id, auth) => {
  const result = await axios.get(`/tournament/${id}`, {
    headers: {
      Authorization: `Bearer ${auth?.accessToken}`,
    },
  });
  return result;
};
