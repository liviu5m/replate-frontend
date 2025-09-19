import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import { createUser, setUpUserRole } from "../../../api/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

const RoleDataForm = ({
  setStep,
  userId,
}: {
  setStep: (e: number) => void;
  userId: number;
}) => {
  const [formData, setFormData] = useState({
    role: "",
    address: "",
    phone: "",
    userId,
    type: "creating-account",
  });

  console.log(formData);

  const { mutate, isPending } = useMutation({
    mutationFn: setUpUserRole,
    onSuccess: (data) => {
      console.log(data);
      setStep(3);
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
    mutate(formData);
  };

  return (
    <>
      <h1 className="text-2xl font-semibold ">Define your role</h1>
      <form className="w-1/2 mt-5" onSubmit={(e) => signUpUser(e)}>
        <div className="flex flex-col gap-3 w-full">
          <label htmlFor="fullName">Role</label>
          <Select
            value={formData.role}
            onValueChange={(e) => setFormData({ ...formData, role: e })}
          >
            <SelectTrigger className="w-full px-5 py-3 rounded-lg border border-[#474747] outline-none text-white focus:bg-[#fff] focus:text-[#474747]">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="DONOR">DONOR</SelectItem>
              <SelectItem value="NGO">NGO</SelectItem>
              <SelectItem value="DRIVER">DRIVER</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-4 w-full mt-4">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="px-5 py-3 rounded-lg border border-[#474747] outline-none text-white w-full focus:bg-[#fff] focus:text-[#474747]"
            id="address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-4 w-full mt-4">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            className="px-5 py-3 rounded-lg border border-[#474747] outline-none text-white w-full focus:bg-[#fff] focus:text-[#474747]"
            id="phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </div>
        <button className="px-5 py-3 rounded-lg outline-none text-white w-full mt-4 cursor-pointer bg-[#0077B6] hover:bg-[#0096C7] flex items-center justify-center gap-5">
          <span>Next</span>
          {isPending && (
            <div className="w-5 h-5 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
          )}
        </button>
      </form>
    </>
  );
};

export default RoleDataForm;
