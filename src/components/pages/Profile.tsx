import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AccountVerificationCard from "../elements/user/AccountVerficationCard";
import AddressInformationCard from "../elements/user/AddressInformationCard";
import PasswordUserCard from "../elements/user/PasswordUserCard";
import PersonalDataUser from "../elements/user/PersonalDataUser";
import PersonalInformationCard from "../elements/user/PersonalInformationCard";
import { faArrowLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import type { ProfileDataType } from "../../lib/Types";
import { useMutation } from "@tanstack/react-query";
import { updateProfileData } from "../../api/user";
import { useAppContext } from "../../lib/AppContext";
import type { AxiosError } from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, token, setUser } = useAppContext();
  const [profileData, setProfileData] = useState<ProfileDataType>({
    fullName: user?.fullName || "",
    username: user?.username || "",
    phone: user?.phone || "",
    address: user?.address || "",
    role: user?.role || "",
    image: user?.image || "",
    city: user?.city || "",
    zip: user?.zip || "",
    country: user?.country || "",
    createdAt: user?.createdAt || "",
    currentPassword: "",
    newPassword: "",
    passwordConfirmation: "",
  });

  const { mutate } = useMutation({
    mutationFn: () =>
      updateProfileData(profileData, user?.id || -1, token || ""),
    mutationKey: ["profile"],
    onSuccess: (data) => {
      setUser(data);
      toast.success("Successfully updated profile");
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
          console.log(errorMessages);

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

  const update = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="flex items-center justify-center">
      <div className="absolute top-10 left-10">
        <Link to={"/"} className="flex gap-4 items-center justify-center font-semibold">
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Go Back</span>
        </Link>
      </div>
      <div className="container py-20">
        <h1 className="text-2xl font-bold mb-10">Profile Settings</h1>
        <div className="flex justify-center gap-10">
          <div className="w-1/4">
            <PersonalDataUser />
          </div>
          <form
            className="w-3/4"
            encType="multipart/form-data"
            onSubmit={(e) => update(e)}
          >
            <PersonalInformationCard
              profileData={profileData}
              setProfileData={setProfileData}
            />
            <AddressInformationCard
              profileData={profileData}
              setProfileData={setProfileData}
            />
            <PasswordUserCard
              profileData={profileData}
              setProfileData={setProfileData}
            />
            <AccountVerificationCard />
            <button className="text-white bg-blue-400 px-5 py-3 rounded-lg hover:bg-blue-500 cursor-pointer w-fit text-sm mt-5 float-right flex items-center justify-center gap-3">
              <FontAwesomeIcon icon={faSave} />
              <span>Save Changes</span>
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
