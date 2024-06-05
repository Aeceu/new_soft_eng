import axios from "../../redux/api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { setToken, setUser } from "../../redux/slices/userSlice";

const useRefreshToken = () => {
  const dispatch = useDispatch<AppDispatch>();
  const refresh = async () => {
    const res = await axios.get("/user/refresh", {
      withCredentials: true,
    });

    dispatch(setUser(res.data.user));
    dispatch(setToken(res.data.accessToken));
    return res.data;
  };
  return refresh;
};
export default useRefreshToken;
