import { useNavigate } from "react-router-dom";
import axios from "../../redux/api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { handleLogout } from "../../redux/slices/userSlice";

export const useUserLogout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const logout = async () => {
    dispatch(handleLogout());
    try {
      const res = await axios.get("/user/logout", {
        withCredentials: true,
      });
      console.log(res.data);
      navigate("/auth/user/login");
    } catch (error) {
      console.log(error);
    }
  };
  return logout;
};
