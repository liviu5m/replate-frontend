import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { countries } from "countries-list";
import type { ProfileDataType } from "../../../lib/Types";

const AddressInformationCard = ({
  profileData,
  setProfileData,
}: {
  profileData: ProfileDataType;
  setProfileData: (e: ProfileDataType) => void;
}) => {
  const countryOptions = Object.entries(countries).map(([code, country]) => ({
    value: code,
    label: country.name,
  }));

  return (
    <div className="rounded-2xl bg-white p-10 shadow shadow-gray-300 flex justify-center flex-col mt-10">
      <div className="flex items-center gap-3">
        <FontAwesomeIcon
          icon={faLocationDot}
          className="text-blue-400 text-xl"
        />
        <h1 className="text-lg font-semibold">Address</h1>
      </div>
      <div className="mt-5 flex items-center justify-center gap-10">
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="street"
            className="text-sm font-semibold text-gray-700"
          >
            Street Address
          </label>
          <input
            type="text"
            id="street"
            className="px-5 py-3 rounded-lg border border-gray-300 outline-blue-400 "
            value={profileData.address}
            onChange={(e) =>
              setProfileData({ ...profileData, address: e.target.value })
            }
          />
        </div>
      </div>
      <div className="mt-5 flex items-center justify-center gap-10">
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="city" className="text-sm font-semibold text-gray-700">
            City
          </label>
          <input
            type="text"
            id="city"
            className="px-5 py-3 rounded-lg border border-gray-300 outline-blue-400 "
            value={profileData.city}
            onChange={(e) =>
              setProfileData({ ...profileData, city: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="zip" className="text-sm font-semibold text-gray-700">
            Zip Code
          </label>
          <input
            type="text"
            id="zip"
            className="px-5 py-3 rounded-lg border border-gray-300 outline-blue-400 "
            value={profileData.zip}
            onChange={(e) =>
              setProfileData({ ...profileData, zip: e.target.value })
            }
          />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-10">
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="country"
            className="text-sm font-semibold text-gray-700"
          >
            Country
          </label>
          <select
            id="country"
            className="px-5 py-3 rounded-lg border border-gray-300 outline-blue-400 "
            value={profileData.country}
            onChange={(e) =>
              setProfileData({ ...profileData, country: e.target.value })
            }
          >
            <option value="">Select a country</option>
            {countryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default AddressInformationCard;
