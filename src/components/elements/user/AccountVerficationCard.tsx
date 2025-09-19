import { faCertificate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox } from "../../ui/checkbox";
import { Label } from "../../ui/label";
import { useState, type ChangeEvent } from "react";
import type { VerificationData } from "../../../lib/Types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAppContext } from "../../../lib/AppContext";
import { addImage } from "../../../api/cloudinary";
import { createRequest } from "../../../api/verification";

const AccountVerificationCard = () => {
  const { user, token } = useAppContext();
  const [verificationData, setVerificationData] = useState<VerificationData>({
    idNumber: "",
    idType: "PASSPORT",
    documentUrl: "",
    userId: user?.id || -1,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { mutate: createVerification } = useMutation({
    mutationKey: ["verificationImage"],
    mutationFn: () => createRequest(verificationData, token || ""),
    onSuccess: (data) => {
      console.log(data);
      toast("Verification Request sent successfully");
      setVerificationData({
        idNumber: "",
        idType: "PASSPORT",
        documentUrl: "",
        userId: user?.id || -1,
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { mutate: cloudinaryImage, isPending } = useMutation({
    mutationKey: ["verificationDocument"],
    mutationFn: () => addImage(selectedFile, token || ""),
    onSuccess: (data) => {
      setVerificationData({ ...verificationData, documentUrl: data });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    const allowedImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
    ];
    const allowedDocumentTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "text/plain",
      "application/rtf",
      "application/json",
      "text/csv",
    ];

    const isImage = allowedImageTypes.includes(file.type);
    const isDocument = allowedDocumentTypes.includes(file.type);

    if (!isImage && !isDocument) {
      toast("Please select an image or document file (PDF, Word, Excel, etc.)");
      return;
    }

    setSelectedFile(file);
    cloudinaryImage();
  };

  const createVerificationRequest = (e: React.MouseEvent) => {
    e.preventDefault();
    createVerification();
  };

  return (
    <div className="rounded-2xl bg-white p-10 shadow shadow-gray-300 flex justify-center flex-col mt-10">
      <div className="flex items-center gap-3">
        <FontAwesomeIcon
          icon={faCertificate}
          className="text-blue-400 text-xl"
        />
        <h1 className="text-lg font-semibold">Account verification</h1>
      </div>
      <p className="text-gray-600 mt-2">
        Apply for a verified account to gain additional features and confirm
        your identity.
      </p>
      <div className="mt-5 flex items-center justify-center gap-10">
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="idType"
            className="text-sm font-semibold text-gray-700"
          >
            ID Type
          </label>
          <select
            id="idType"
            className="px-5 py-3 rounded-lg border border-gray-300 outline-blue-400"
            value={verificationData.idType}
            onChange={(e) =>
              setVerificationData({
                ...verificationData,
                idType: e.target.value,
              })
            }
          >
            <option value="PASSPORT">Passport</option>
            <option value="DRIVERS_LICENSE">Driver's License</option>
            <option value="NATIONAL_ID_CARD">National ID Card</option>
          </select>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-center gap-10">
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="idNumber"
            className="text-sm font-semibold text-gray-700"
          >
            ID Number
          </label>
          <input
            type="text"
            id="idNumber"
            className="px-5 py-3 rounded-lg border border-gray-300 outline-blue-400 "
            value={verificationData.idNumber}
            onChange={(e) =>
              setVerificationData({
                ...verificationData,
                idNumber: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="mt-5 flex items-center justify-center gap-10">
        <div className="flex flex-col gap-2 w-full">
          <label className="text-sm font-semibold text-gray-700 border-dotted border-gray-400">
            Upload ID Document
          </label>
          <label htmlFor="image">
            <div className="border-dashed border-gray-400 border rounded-lg flex items-center justify-center flex-col py-5 cursor-pointer">
              <div className="flex items-center justify-center gap-5">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {isPending && (
                  <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
                )}
              </div>
              <h1 className="text-sm font-semibold text-blue-500">
                Upload a file
              </h1>
              <p className="text-xs mt-2">
                {selectedFile ? selectedFile.name : "Files up to 10 MB"}
              </p>
            </div>
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={(e) => handleFileChange(e)}
            />
          </label>
        </div>
      </div>
      <div className="flex items-center space-x-2 mt-5">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
      <button
        className="text-white bg-blue-400 px-5 py-3 rounded-lg hover:bg-blue-500 cursor-pointer w-fit text-sm mt-5"
        onClick={(e) => createVerificationRequest(e)}
      >
        Submit Verification Request
      </button>
    </div>
  );
};

export default AccountVerificationCard;
