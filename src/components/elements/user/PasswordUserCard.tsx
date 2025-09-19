import { faLocationDot, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ProfileDataType } from "../../../lib/Types";
import { useAppContext } from "../../../lib/AppContext";

const PasswordUserCard = ({
  profileData,
  setProfileData,
}: {
  profileData: ProfileDataType;
  setProfileData: (e: ProfileDataType) => void;
}) => {
  const { user } = useAppContext();

  return (
    <div className="rounded-2xl bg-white p-10 shadow shadow-gray-300 flex justify-center flex-col mt-10">
      <div className="flex items-center gap-3">
        <FontAwesomeIcon icon={faLock} className="text-blue-400 text-xl" />
        <h1 className="text-lg font-semibold">Security</h1>
      </div>

      {user?.provider == "google" ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-4">
              <svg
                className="h-8 w-8"
                viewBox="0 0 533.5 544.3"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                  fill="#4285f4"
                />
                <path
                  d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                  fill="#34a853"
                />
                <path
                  d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                  fill="#fbbc04"
                />
                <path
                  d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                  fill="#ea4335"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-md font-medium text-gray-900">
                Google Account Authentication
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                You're signed in with your Google account. To change your
                password, please visit your Google account settings.
              </p>
              <div className="mt-3">
                <a
                  href="https://myaccount.google.com/security"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  Manage Google account
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-5 flex items-center justify-center gap-10">
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="currentPassword"
                className="text-sm font-semibold text-gray-700"
              >
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                className="px-5 py-3 rounded-lg border border-gray-300 outline-blue-400"
                value={profileData.currentPassword}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    currentPassword: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="mt-5 flex items-center justify-center gap-10">
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="newPassword"
                className="text-sm font-semibold text-gray-700"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                className="px-5 py-3 rounded-lg border border-gray-300 outline-blue-400 "
                value={profileData.newPassword}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    newPassword: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="passwordConfirmation"
                className="text-sm font-semibold text-gray-700"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="passwordConfirmation"
                className="px-5 py-3 rounded-lg border border-gray-300 outline-blue-400 "
                value={profileData.passwordConfirmation}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    passwordConfirmation: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-5">
            Password must be at least 8 characters.
          </p>
        </>
      )}
    </div>
  );
};

export default PasswordUserCard;
