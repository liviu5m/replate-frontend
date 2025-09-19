import { CheckCircleIcon } from "lucide-react";

const ProfileCompletion = () => {
  return (
    <div className="rounded-2xl bg-white p-10 my-5 shadow shadow-gray-300 flex justify-center flex-col mt-10">
      <h2 className="text-lg font-semibold">Profile Completion</h2>
      <div className="relative w-full mt-5">
        <div className="w-full h-3 rounded-lg bg-gray-300"></div>
        <div className="w-3/4 h-3 rounded-lg bg-blue-400 absolute left-0 top-0"></div>
      </div>
      <h4 className="text-gray-500 mt-3">85% complete</h4>
      <h4 className="font-semibold my-3">Complete profile: </h4>
      <h6 className="text-sm flex items-center gap-2">
        <CheckCircleIcon className="text-green-500 w-5" />
        <span>Add personal information</span>
      </h6>
      <h6 className="text-sm flex items-center gap-2 mt-1">
        <CheckCircleIcon className="text-green-500 w-5" />
        <span>Set your password</span>
      </h6>
      <h6 className="text-sm flex items-center gap-2 mt-1">
        <div className="rounded-full w-5 h-5 border-2 border-gray-300"></div>
        <span>Verify your account</span>
      </h6>
    </div>
  );
};

export default ProfileCompletion;
