import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState } from "./redux/store";

const AuthLayout = () => {
  // const nav = useNavigate();
  // const state = useSelector((state: RootState) => state);

  return (
    <div
      data-theme="light"
      className="poppins-regular flex items-center justify-center w-full h-screen">
      <Outlet />
    </div>
  );
};
export default AuthLayout;
