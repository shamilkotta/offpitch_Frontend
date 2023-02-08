import { useDispatch } from "react-redux";
import { setAuth } from "../app/slices/authSlice";
import { refreshTokenApi } from "../helpers/apis/auth";

function useRefreshToken() {
  const dispatch = useDispatch();

  const refresh = async () => {
    const response = await refreshTokenApi();
    dispatch(setAuth(response.data?.data));
    return response.data?.data;
  };

  return refresh;
}

export default useRefreshToken;
