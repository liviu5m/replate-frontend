import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import { verifyUser } from "../../../api/user";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../ui/input-otp";

const VerifyUserForm = ({
  setStep,
  userId,
}: {
  setStep: (e: number) => void;
  userId: number;
}) => {
  const [formData, setFormData] = useState({
    code: "",
    userId,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: verifyUser,
    onSuccess: (data) => {
      console.log(data);
      setStep(4);
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

  return (
    <>
      <h1 className="text-2xl font-semibold ">Verify Account</h1>
      <div className="w-1/2 flex items-center justify-center flex-col gap-10 mt-10">
        <p className="text-[#919191]">
          You have received a 6 digit code, please enter it here to verify your
          account.
        </p>
        <InputOTP
          maxLength={6}
          value={formData.code}
          onChange={(e) => setFormData({ ...formData, code: e })}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <button
          className="px-5 py-3 rounded-lg outline-none text-white w-full mt-4 cursor-pointer bg-[#0077B6] hover:bg-[#0096C7] flex items-center justify-center gap-5"
          onClick={() => {
            mutate(formData);
          }}
        >
          <span>Verify</span>
          {isPending && (
            <div className="w-5 h-5 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
          )}
        </button>
      </div>
    </>
  );
};

export default VerifyUserForm;
