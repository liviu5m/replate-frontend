import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import { createUser } from "../../../api/user";
import { Link } from "react-router-dom";

const PersonalDataForm = ({
  setStep,
  setUserId,
}: {
  setStep: (e: number) => void;
  setUserId: (e: number) => void;
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    passwordConfirmation: "",
  });
  const { mutate, isPending } = useMutation({
    mutationFn: () => createUser(formData),
    onSuccess: (data) => {
      setUserId(data.id);
      setStep(2);
    },
    onError: (error: AxiosError) => {
      console.log(error);

      if (error.response?.data) {
        console.log(error.response?.data);

        if (typeof error.response?.data == "string") {
          toast.error(error.response?.data as string);
        } else {
          const errorMessages = Object.entries(error.response.data).map(
            ([field, message]) => <p key={field}>{message}</p>
          );

          toast.error(
            <div>
              <strong>Validation errors:</strong>
              {errorMessages}
            </div>
          );
        }
      } else {
        toast.error("An unexpected error occurred");
      }
    },
  });

  const signUpUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  const logInWithGoogle = () => {
    window.location.href =
      import.meta.env.VITE_API_URL + "/oauth2/authorization/google";
  };

  return (
    <>
      <h1 className="text-2xl font-semibold ">Sign Up</h1>
      <p className="text-[#919191]">
        Enter your personal data to create an account
      </p>
      <button
        className="flex items-center justify-center gap-7 text-lg border border-[#474747] px-5 py-3 rounded-2xl w-1/2 mt-5 cursor-pointer hover:text-[#121212] hover:bg-[#fff] hover:shadow-md hover:shadow-white font-semibold"
        onClick={() => logInWithGoogle()}
      >
        <img src="/imgs/google.png" className="w-7" />
        <span>Google</span>
      </button>

      <div className="relative w-1/2 mt-4">
        <div className="w-full bg-[#474747] h-px" />
        <span className="text-[#eee] absolute top-1/2 left-1/2 -translate-1/2 bg-[#121212] px-5">
          Or
        </span>
      </div>

      <form className="w-1/2 mt-5" onSubmit={(e) => signUpUser(e)}>
        <div className="flex flex-col gap-3 w-full">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            className="px-5 py-3 rounded-lg border border-[#474747] outline-none text-white w-full focus:bg-[#fff] focus:text-[#474747]"
            id="fullName"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-4 w-full mt-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="px-5 py-3 rounded-lg border border-[#474747] outline-none text-white w-full focus:bg-[#fff] focus:text-[#474747]"
            id="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-4 w-full mt-4">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="px-5 py-3 rounded-lg border border-[#474747] outline-none text-white w-full focus:bg-[#fff] focus:text-[#474747]"
            id="username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-4 w-full mt-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="px-5 py-3 rounded-lg border border-[#474747] outline-none text-white w-full focus:bg-[#fff] focus:text-[#474747]"
            id="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-4 w-full mt-4">
          <label htmlFor="passwordConfirmation">Password Confirmation</label>
          <input
            type="password"
            className="px-5 py-3 rounded-lg border border-[#474747] outline-none text-white w-full focus:bg-[#fff] focus:text-[#474747]"
            id="passwordConfirmation"
            value={formData.passwordConfirmation}
            onChange={(e) =>
              setFormData({
                ...formData,
                passwordConfirmation: e.target.value,
              })
            }
          />
        </div>
        <button className="px-5 py-3 rounded-lg outline-none text-white w-full mt-4 cursor-pointer bg-[#0077B6] hover:bg-[#0096C7] flex items-center justify-center gap-5">
          <span>Next</span>
          {isPending && (
            <div className="w-5 h-5 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
          )}
        </button>
        <p className="text-center text-[#919191] font-semibold mt-5">
          Already have got an account ?{" "}
          <Link to={"/auth/login"} className="text-white">
            Log in
          </Link>
        </p>
      </form>
    </>
  );
};

export default PersonalDataForm;
