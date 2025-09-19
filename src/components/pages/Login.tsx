import { ToastContainer } from "react-toastify";
import { useState } from "react";
import LogInForm from "../elements/user/LogInForm";

const Signup = () => {
  const [step, setStep] = useState(1);
  

  return (
    <div className="flex items-center h-screen w-screen p-20 bg-[#121212]">
      <div className="bg-[linear-gradient(187deg,rgba(0,119,182,1)_0%,rgba(0,180,216,1)_51%,rgba(72,202,228,1)_100%)] w-1/2 h-full rounded-2xl flex items-end justify-center">
        <div className="flex items-center justify-center flex-col gap-5 w-1/2 text-white">
          <h2 className="font-bold text-xl">Replate</h2>
          <h4 className="text-4xl font-bold">Get Started With Us</h4>
          <p className="text-[#dadada]">
            Complete these easy steps to help the humanity.
          </p>
          <div className="flex flex-col gap-5 mb-5">
            <div
              className={`flex item-center gap-5 px-8 py-5 rounded-lg  font-semibold ${
                step == 1
                  ? "bg-white text-[#121212]"
                  : "bg-[#121212] text-[#919191]"
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${
                  step == 1 ? "bg-[#121212]" : "bg-[#474747]"
                }`}
              >
                1
              </span>
              <h6>Log In into our app</h6>
            </div>
            <div
              className={`flex item-center gap-5 px-8 py-5 rounded-lg  font-semibold ${
                step == 2
                  ? "bg-white text-[#121212]"
                  : "bg-[#121212] text-[#919191]"
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${
                  step == 2 ? "bg-[#121212]" : "bg-[#474747]"
                }`}
              >
                2
              </span>
              <h6>Explore the need</h6>
            </div>
            <div
              className={`flex item-center gap-5 px-8 py-5 rounded-lg  font-semibold ${
                step == 3
                  ? "bg-white text-[#121212]"
                  : "bg-[#121212] text-[#919191]"
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${
                  step == 3 ? "bg-[#121212]" : "bg-[#474747]"
                }`}
              >
                3
              </span>
              <h6>Help the community</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-full flex items-center flex-col gap-3 text-white">
        <LogInForm />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
