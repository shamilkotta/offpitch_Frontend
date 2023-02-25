import { useDispatch } from "react-redux";
import { clearAuth } from "../app/slices/authSlice";
import { clearClubData } from "../app/slices/clubSlice";
import { logoutApi } from "../helpers/apis/auth";

function useLogout() {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(clearAuth());
    dispatch(clearClubData());
    logoutApi();
  };

  return logout;
}

export default useLogout;
