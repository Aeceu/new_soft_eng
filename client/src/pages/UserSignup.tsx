import { useState } from "react";
import Personal from "../components/signupsteps/Personal";
import Address from "../components/signupsteps/Address";
import Education from "../components/signupsteps/Education";
import Employment from "../components/signupsteps/Employment";
import Medical from "../components/signupsteps/Medical";
import Emergency from "../components/signupsteps/Emergency";
import DoneRegister from "../components/signupsteps/DoneRegister";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const UserSignup = () => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="w-full h-screen overflow-hidden  flex flex-col items-center bg-orange-50">
      <h1 className="font-bold text-4xl bg-black text-white w-full border-b p-8">
        User Registration Form
      </h1>
      <Link
        to={"/auth/user/login"}
        className="absolute left-0 top-[108px] flex items-center gap-1 shadow-md poppins-semibold text-white font-bold bg-[#4A00FF] p-2 rounded-tr-md rounded-br-md hover:scale-110 duration-300 transition-all">
        <ChevronLeft className="w-5 h-5 " />
        login
      </Link>
      <div className="relative w-3/4 h-full overflow-y-auto bg-white flex flex-col items-center p-8 shadow-md">
        <ul className="w-max shrink-0 steps steps-vertical lg:steps-horizontal gap-4">
          <li className={`step ${currentStep >= 0 && "step-primary"}`}>Personal </li>
          <li className={`step ${currentStep >= 1 && "step-primary"}`}>Address </li>
          <li className={`step ${currentStep >= 2 && "step-primary"}`}>Emergency </li>
          <li className={`step ${currentStep >= 3 && "step-primary"}`}>Education </li>
          <li className={`step ${currentStep >= 4 && "step-primary"}`}>Employment </li>
          <li className={`step ${currentStep >= 5 && "step-primary"}`}>Medical </li>
        </ul>
        {currentStep === 0 && <Personal setCurrentStep={setCurrentStep} />}
        {currentStep === 1 && <Address setCurrentStep={setCurrentStep} />}
        {currentStep === 2 && <Emergency setCurrentStep={setCurrentStep} />}
        {currentStep === 3 && <Education setCurrentStep={setCurrentStep} />}
        {currentStep === 4 && <Employment setCurrentStep={setCurrentStep} />}
        {currentStep === 5 && <Medical setCurrentStep={setCurrentStep} />}
        {currentStep === 6 && <DoneRegister setCurrentStep={setCurrentStep} />}
      </div>
    </div>
  );
};
export default UserSignup;
