import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import { authenticate } from "../../../api/user";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAppContext } from "../../../lib/AppContext";

const LogInForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { setToken } = useAppContext();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(false);
  useEffect(() => {
    const error = searchParams.get("error");

    if (error) {
      setError(true);
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete("error");
      setSearchParams(newSearchParams);
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  }, [searchParams, setSearchParams]);

  const { mutate, isPending } = useMutation({
    mutationFn: authenticate,
    onSuccess: (data) => {
      console.log(data);
      localStorage.setItem("token", data.token);
      setToken(data.token);
      navigate("/");
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

  const logInUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(formData);
  };

  const logInWithGoogle = () => {
    window.location.href =
      import.meta.env.VITE_API_URL + "/oauth2/authorization/google";
  };

  return (
    <>
      <h1 className="text-2xl font-semibold ">Log In</h1>
      <p className="text-[#919191]">
        Enter your personal data to authenticate in our app
      </p>
      <button
        className="flex items-center justify-center gap-7 text-lg border border-[#474747] px-5 py-3 rounded-2xl w-1/2 mt-5 cursor-pointer hover:text-[#121212] hover:bg-[#fff] hover:shadow-md hover:shadow-white font-semibold"
        onClick={() => logInWithGoogle()}
      >
        <img src="/imgs/google.png" className="w-7" />
        <span>Google</span>
      </button>
      {error && <p className="text-red-500 font-semibold text-center">Something went wrong.</p>}
      <div className="relative w-1/2 mt-4">
        <div className="w-full bg-[#474747] h-px" />
        <span className="text-[#eee] absolute top-1/2 left-1/2 -translate-1/2 bg-[#121212] px-5">
          Or
        </span>
      </div>

      <form className="w-1/2 mt-5" onSubmit={(e) => logInUser(e)}>
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
        <button className="px-5 py-3 rounded-lg outline-none text-white w-full mt-4 cursor-pointer bg-[#0077B6] hover:bg-[#0096C7] flex items-center justify-center gap-5">
          <span>Log In</span>
          {isPending && (
            <div className="w-5 h-5 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
          )}
        </button>
        <p className="text-center text-[#919191] font-semibold mt-5">
          Don't have an account ?{" "}
          <Link to={"/auth/signup"} className="text-white">
            Sign up
          </Link>
        </p>
      </form>
    </>
  );
};

export default LogInForm;
