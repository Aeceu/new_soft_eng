import { Outlet } from "react-router-dom";

const UserAuthLayout = () => {
  return (
    <div className="w-full h-screen flex ">
      <div
        className="w-[40%] h-full bg-cover "
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/3009792/pexels-photo-3009792.jpeg?auto=compress&cs=tinysrgb&w=1980&h=1080&dpr=1)",
        }}>
        <div className="hero-overlay bg-opacity-50" />
        <h1 className="absolute top-3 left-3 font-bold text-2xl text-white">KAINAKAP</h1>
      </div>

      <div className="w-[60%] h-full flex flex-col items-center justify-center bg-orange-50 gap-2">
        <Outlet />
        <span className="text-xs p-4 label w-1/2 text-center">
          By signing in, I have read, and I understand and agree to, the KAINAKAP Terms of Use and
          Privacy Policy (PH).
        </span>
      </div>
    </div>
  );
};
export default UserAuthLayout;
