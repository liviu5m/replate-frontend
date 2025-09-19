import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppContext } from "../../../lib/AppContext";
import { useState, type ChangeEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateProfilePicture } from "../../../api/user";
import { addImage } from "../../../api/cloudinary";
import { toast } from "react-toastify";

const PersonalDataUser = () => {
  const { user, token } = useAppContext();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(user?.image || "");

  const { mutate: updateUserProfile } = useMutation({
    mutationKey: ["profileImage"],
    mutationFn: (imageUrl: string) =>
      updateProfilePicture(imageUrl, user?.id || -1, token || ""),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { mutate: cloudinaryImage } = useMutation({
    mutationKey: ["cloudinaryImage"],
    mutationFn: () => addImage(selectedFile, token || ""),
    onSuccess: (data) => {
      updateUserProfile(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    if (!file.type.startsWith("image/")) {
      toast("Please select an image file");
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    cloudinaryImage();
  };

  return (
    <div className="rounded-2xl bg-white p-10 shadow shadow-gray-300 flex items-center justify-center flex-col">
      <div className="w-30 h-30 rounded-full flex items-center justify-center bg-gray-300 mb-5">
        {user?.image ? (
          <img
            src={previewUrl}
            className="rounded-full w-full h-full object-cover"
          />
        ) : (
          <FontAwesomeIcon icon={faUser} className="text-gray-400 text-5xl" />
        )}
      </div>
      <h1 className="font-semibold text-lg mb-2">{user?.fullName}</h1>
      <h2 className="text-gray-400">{user?.email}</h2>
      <label htmlFor="profileImage" className="px-5">
        <form encType="multipart/form-data">
          <label htmlFor="profileImage">
            <h2 className="w-full rounded-lg text-center font-semibold bg-gray-300 hover:bg-gray-200 py-3 mt-5 cursor-pointer px-5">
              Change Profile Picture
            </h2>
            <input
              type="file"
              className="hidden"
              id="profileImage"
              accept="image/*"
              onChange={(e) => handleFileChange(e)}
            />
          </label>
        </form>
      </label>
    </div>
  );
};

export default PersonalDataUser;
