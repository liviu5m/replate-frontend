import { faPhone, faSuitcase, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppContext } from "../../../lib/AppContext";
import type { ProfileDataType } from "../../../lib/Types";

const PersonalInformationCard = ({
  profileData,
  setProfileData,
}: {
  profileData: ProfileDataType;
  setProfileData: (e: ProfileDataType) => void;
}) => {
  const { user } = useAppContext();

  return (
    <div className="rounded-2xl bg-white p-10 shadow shadow-gray-300 flex justify-center flex-col">
      <div className="flex items-center gap-3">
        <FontAwesomeIcon icon={faUser} className="text-blue-400 text-xl" />
        <h1 className="text-lg font-semibold">Personal Information</h1>
      </div>
      <div className="mt-5 flex items-center justify-center gap-10">
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="fullName"
            className="text-sm font-semibold text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            className="px-5 py-3 rounded-lg border border-gray-300 outline-blue-400 "
            value={profileData.fullName}
            onChange={(e) =>
              setProfileData({ ...profileData, fullName: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="username"
            className="text-sm font-semibold text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className="px-5 py-3 rounded-lg border border-gray-300 outline-blue-400"
            value={profileData.username}
            onChange={(e) =>
              setProfileData({ ...profileData, username: e.target.value })
            }
          />
        </div>
      </div>
      <div className="mt-5 flex items-center justify-center gap-10">
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="phone"
            className="text-sm font-semibold text-gray-700"
          >
            Phone Number
          </label>
          <div className="flex">
            <div className="flex items-center aspect-square justify-center rounded-l-lg border border-gray-300 bg-gray-100 text-gray-400 h-12 w-12 border-r-0">
              <FontAwesomeIcon icon={faPhone} />
            </div>
            <input
              type="text"
              id="phone"
              className="px-5 py-3 h-12 rounded-r-lg border border-gray-300 outline-blue-400 w-full"
              value={profileData.phone}
              onChange={(e) =>
                setProfileData({ ...profileData, phone: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="role" className="text-sm font-semibold text-gray-700">
            Role
          </label>
          <div className="flex">
            <div className="flex items-center aspect-square justify-center rounded-l-lg border border-gray-300 bg-gray-100 text-gray-400 h-12 w-12 border-r-0">
              <FontAwesomeIcon icon={faSuitcase} />
            </div>
            <select
              className="px-5 py-3 h-12 rounded-r-lg border border-gray-300 outline-blue-400 w-full"
              id="role"
              value={profileData.role}
              onChange={(e) =>
                setProfileData({ ...profileData, role: e.target.value })
              }
            >
              <option value="" selected={true}>
                Select a role
              </option>
              <option value="NGO">NGO</option>
              <option value="DONOR">DONOR</option>
              <option value="DRIVER">DRIVER</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformationCard;
