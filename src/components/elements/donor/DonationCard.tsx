import React, { useEffect } from "react";
import type { Donation } from "../../../lib/Types";
import { AlertCircleIcon, CalendarIcon, PackageIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppContext } from "../../../lib/AppContext";
import { deleteDonation, updateDonation } from "../../../api/donation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const DonationCard = ({
  donation,
  role,
  selectable = false,
  handleCheckboxChange,
}: {
  donation: Donation;
  role: string;
  selectable?: boolean;
  handleCheckboxChange?: (e: Donation) => boolean | undefined;
}) => {
  const { token } = useAppContext();
  const queryClient = useQueryClient();

  const { mutate: expireDonation } = useMutation({
    mutationKey: ["donation"],
    mutationFn: () =>
      updateDonation(
        { ...donation, quantity: String(donation.quantity), status: "EXPIRED" },
        donation.id,
        token || ""
      ),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return "lime-500";
      case "WAITING":
        return "yellow-500";
      case "PENDING":
        return "blue-500";
      case "DELIVERED":
        return "green-500";
      case "EXPIRED":
        return "red-500";
      default:
        return "gray-500";
    }
  };

  const { mutate: deleteDonationMutate } = useMutation({
    mutationKey: ["donation"],
    mutationFn: () => deleteDonation(donation.id, token || ""),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["donations"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const today = new Date();
  const threeDaysBeforeExpiry = new Date(donation.expiryDate);
  threeDaysBeforeExpiry.setDate(threeDaysBeforeExpiry.getDate() - 3);

  useEffect(() => {
    if (
      today >= new Date(donation.expiryDate) &&
      donation.status != "EXPIRED"
    ) {
      expireDonation();
      donation.status = "EXPIRED";
    }
  }, []);

  const deleteDonationFunc = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        deleteDonationMutate();
      }
    });
  };

  return (
    <div className="relative shadow p-5 bg-white rounded-lg">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-medium text-gray-900">{donation.name}</h3>
        <div className="flex items-center">
          {donation.status == "EXPIRED" ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              <AlertCircleIcon className="w-3 h-3 mr-1" />
              Expired
            </span>
          ) : today >= threeDaysBeforeExpiry ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              <AlertCircleIcon className="w-3 h-3 mr-1" />
              Expiring Soon
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Fresh
            </span>
          )}
        </div>
      </div>
      <div className="mt-2 flex items-center text-sm text-gray-500">
        <PackageIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
        <span>
          {donation.quantity} {donation.unit}
        </span>
      </div>
      <div className="mt-2 flex items-center text-sm text-gray-500">
        <CalendarIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
        <span>Expires: {donation.expiryDate}</span>
      </div>
      <div className={`mt-2 flex items-center text-sm text-gray-500 `}>
        <span className="font-medium">Status: </span>
        <span
          className={`ml-1 p-2 font-semibold text-xs rounded-md capitalize bg-${getStatusColor(donation.status)} text-white`}
        >
          {donation.status}
        </span>
      </div>
      {donation.notes && (
        <div className="mt-2 text-sm text-gray-500">
          <span className="font-medium">Notes: </span>
          <span>{donation.notes}</span>
        </div>
      )}
      {role == "ngo" && !selectable && (
        <>
          <div className="mt-2"></div>
          <Link
            to={"/ngo/available-food"}
            className="p-2 rounded-sm bg-blue-500 text-white font-semibold text-xs mt-2 cursor-pointer hover:bg-blue-600"
          >
            Request Item
          </Link>
        </>
      )}
      {selectable && handleCheckboxChange && (
        <div className="absolute top-2 right-2">
          <input
            type="checkbox"
            className="w-4 h-4"
            onChange={() => handleCheckboxChange(donation)}
          />
        </div>
      )}
      {role == "donor" && (
        <div className="absolute bottom-5 right-5">
          <Link to={"/donor/edit-donation/" + donation.id}>
            <FontAwesomeIcon
              className="p-2 text-lg text-blue-500 cursor-pointer"
              icon={faEdit}
            />
          </Link>
          <FontAwesomeIcon
            className="p-2 text-lg text-red-500 cursor-pointer"
            icon={faTrash}
            onClick={() => deleteDonationFunc()}
          />
        </div>
      )}
    </div>
  );
};

export default DonationCard;
