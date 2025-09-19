import {
  ChartAreaIcon,
  CheckCircleIcon,
  ShoppingCartIcon,
  TruckIcon,
} from "lucide-react";
import type {
  Donation,
  DonationDto,
  Request,
  RequestDonation,
} from "../../lib/Types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAppContext } from "../../lib/AppContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import RequestDetailsModal from "./driver/RequestDetailsModal";
import { updateRequestStatus } from "../../api/request";
import Swal from "sweetalert2";
import { deleteRequestDonations } from "../../api/request-donation";
import { updateDonation } from "../../api/donation";

const getStatusIcon = (status: string) => {
  switch (status) {
    case "WAITING":
      return <ShoppingCartIcon className="h-5 w-5 text-yellow-500" />;
    case "PENDING":
      return <TruckIcon className="h-5 w-5 text-blue-500" />;
    case "ASKING":
      return <TruckIcon className="h-5 w-5 text-purple-500" />;
    case "DELIVERED":
      return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
    case "CANCELED":
      return <CheckCircleIcon className="h-5 w-5 text-red-500" />;
    default:
      return <ShoppingCartIcon className="h-5 w-5 text-gray-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "WAITING":
      return "yellow-500";
    case "PENDING":
      return "blue-500";
    case "ASKING":
      return "purple-500";
    case "DELIVERED":
      return "green-500";
    case "CANCELED":
      return "red-500";
    default:
      return "gray-500";
  }
};

const RequestCard = ({
  request,
  action = false,
  role,
}: {
  request: Request;
  action?: boolean;
  role?: string;
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [pickupDate, setPickupDate] = useState(new Date());
  const { token } = useAppContext();
  const queryClient = useQueryClient();

  const { mutate: updateRequest } = useMutation({
    mutationKey: ["request"],
    mutationFn: (status: string) =>
      updateRequestStatus(
        token || "",
        {
          ngoId: request.ngo.id,
          status,
          pickupDate,
          deliveryDate,
          ...(request.driver?.id && { driverId: request.driver.id }),
        },
        request.id
      ),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["request"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { mutate: updateDonationStatus } = useMutation({
    mutationKey: ["donation"],
    mutationFn: ({
      donationDto,
      donationId,
    }: {
      donationDto: DonationDto;
      donationId: number;
    }) => updateDonation(donationDto, donationId, token || ""),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["request"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const confirmRequestFunction = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm it!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateRequest("DELIVERED");
        request.requestDonations.forEach((requestDonation: RequestDonation) => {
          updateDonationStatus({
            donationDto: {
              ...requestDonation.donation,
              quantity: String(requestDonation.donation),
              status: "DELIVERED"
            },
            donationId: requestDonation.donation.id,
          });
        });
        Swal.fire("Confirmed !", "Your request has been confirmed.", "success");
      }
    });
  };

  const cancelRequest = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateRequest("CANCELED");
        request.requestDonations.forEach((requestDonation: RequestDonation) => {
          updateDonationStatus({
            donationDto: {
              ...requestDonation.donation,
              quantity: String(requestDonation.donation),
              status: "AVAILABLE"
            },
            donationId: requestDonation.donation.id,
          });
        });
        Swal.fire("Deleted !", "Your request has been deleted.", "success");
      }
    });
  };

  const assignRequest = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, assign it!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateRequest("PENDING");
        request.requestDonations.forEach((requestDonation: RequestDonation) => {
          updateDonationStatus({
            donationDto: {
              ...requestDonation.donation,
              quantity: String(requestDonation.donation),
              status: "PENDING"
            },
            donationId: requestDonation.donation.id,
          });
        });
        Swal.fire("Assigned !", "Your request has been assigned.", "success");
      }
    });
  };

  return (
    <section className="w-full border-b border-b-gray-200 relative">
      <div className="px-4 py-5 sm:px-6 w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            {getStatusIcon(request.status)}
            <p className="text-sm font-medium ml-2 text-gray-900">
              Request #{request.id}
            </p>
          </div>
          <div className="ml-2 flex-shrink-0">
            {request.status != "CANCELED" &&
              request.status != "DELIVERED" &&
              role == "ngo" && (
                <button
                  className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-lg text-white bg-red-500 mr-5 hover:text-red-500 hover:bg-[#eee] cursor-pointer`}
                  onClick={() => cancelRequest()}
                >
                  Cancel Request
                </button>
              )}
            <span
              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-white bg-${getStatusColor(
                request.status
              )}`}
            >
              {request.status}
            </span>
          </div>
        </div>
        <div className="mt-2">
          <div className="text-sm text-gray-500">
            <span className="font-medium">Requested:</span>{" "}
            {request.createdAt.slice(0, 10)}
            {request.status != "WAITING" && (
              <>
                <div className="flex items-center gap-2">
                  <h2 className="font-medium">Pick up Date:</h2>
                  <span>{request.pickupDate.slice(0, 10)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <h2 className="font-medium">Delivery Date:</h2>{" "}
                  <span>{request.deliveryDate.slice(0, 10)}</span>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            <span className="font-medium">Items:</span>{" "}
            {request.requestDonations.length} items
          </p>
          <div className="text-sm text-gray-500 mt-1">
            {request.requestDonations.map(
              (requestDonation: RequestDonation, i) => {
                return (
                  <div key={i}>
                    <h2>
                      {requestDonation.donation.name} ({" "}
                      {requestDonation.donation.quantity}{" "}
                      {requestDonation.donation.unit} )
                    </h2>
                  </div>
                );
              }
            )}
          </div>
        </div>
        {request.driver && role == "ngo" && (
          <div className="mt-2 border-t border-gray-200 pt-2">
            <p className="text-sm font-medium text-gray-900">
              Driver Information
            </p>
            <p className="text-sm text-gray-500">
              {request.driver.fullName}{" "}
              {request.driver.phone && `• ${request.driver.username}`}
            </p>
          </div>
        )}
      </div>
      {role == "driver" && request.status == "WAITING" && (
        <div className="absolute bottom-3 right-3 text-xs">
          <div className="flex items-center justify-center">
            <button
              className="text-white px-4 py-2 rounded-lg bg-blue-500 font-semibold hover:bg-blue-600 cursor-pointer flex items-center justify-center gap-4"
              onClick={() => setOpenModal(true)}
            >
              <TruckIcon className="h-6 w-6 text-white" />
              <span>Mark this request</span>
            </button>
            <Link
              className="text-[#121212] px-4 py-2 rounded-lg bg-white font-semibold hover:bg-[#F9FAFB] cursor-pointer ml-5 flex items-center gap-4 border"
              to={`/chat?user=${request.ngo.username}`}
            >
              <FontAwesomeIcon icon={faMessage} className="text-lg" />
              <span>Chat With NGO</span>
            </Link>
          </div>
        </div>
      )}
      {request.status == "ASKING" && role == "ngo" && (
        <div className="absolute bottom-3 right-3 text-xs">
          <div className="flex items-center justify-center">
            <button
              className="text-white px-4 py-2 rounded-lg bg-purple-500 font-semibold hover:bg-purple-600 cursor-pointer flex items-center justify-center gap-4"
              onClick={() => assignRequest()}
            >
              <TruckIcon className="h-6 w-6 text-white" />
              <span>Accept this request</span>
            </button>
            <Link
              className="text-[#121212] px-4 py-2 rounded-lg bg-white font-semibold hover:bg-[#F9FAFB] cursor-pointer ml-5 flex items-center gap-4 border"
              to={`/chat?user=${request.driver.email}`}
            >
              <FontAwesomeIcon icon={faMessage} className="text-lg" />
              <span>Chat With NGO</span>
            </Link>
          </div>
        </div>
      )}
      {request.status == "PENDING" && role == "ngo" && (
        <div className="absolute bottom-3 right-3 text-xs">
          <button
            className="text-white px-4 py-2 rounded-lg bg-green-500 font-semibold hover:bg-green-600 cursor-pointer flex items-center justify-center gap-4"
            onClick={() => confirmRequestFunction()}
          >
            <TruckIcon className="h-6 w-6 text-white" />
            <span>Confirm this request</span>
          </button>
        </div>
      )}
      {openModal && (
        <RequestDetailsModal
          setOpenModal={setOpenModal}
          deliveryDate={deliveryDate}
          setDeliveryDate={setDeliveryDate}
          pickupDate={pickupDate}
          setPickupDate={setPickupDate}
          request={request}
        />
      )}
    </section>
  );
};

export default RequestCard;
