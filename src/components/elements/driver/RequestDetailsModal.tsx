import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../../ui/calendar";
import { useAppContext } from "../../../lib/AppContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRequestStatus } from "../../../api/request";
import type { Request } from "../../../lib/Types";

const RequestDetailsModal = ({
  setOpenModal,
  deliveryDate,
  setDeliveryDate,
  pickupDate,
  setPickupDate,
  request,
}: {
  setOpenModal: (e: boolean) => void;
  deliveryDate: Date;
  setDeliveryDate: React.Dispatch<React.SetStateAction<Date>>;
  pickupDate: Date;
  setPickupDate: React.Dispatch<React.SetStateAction<Date>>;
  request: Request;
}) => {
  const queryClient = useQueryClient();
  const { token, user } = useAppContext();
  const expiryDate = new Date(
    Math.min(
      ...request.requestDonations.map((request) =>
        new Date(request.donation.expiryDate).getTime()
      )
    )
  );

  const { mutate: updateRequest } = useMutation({
    mutationKey: ["request"],
    mutationFn: () =>
      updateRequestStatus(
        token || "",
        {
          ngoId: request.ngo.id,
          status: "ASKING",
          pickupDate,
          deliveryDate,
          driverId: user?.id || -1,
        },
        request.id
      ),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 z-10">
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white w-1/2 p-10 rounded-lg shadow z-20 flex flex-col items-center justify-center">
          <div className="flex items-center justify-between text-lg w-full">
            <h1 className="font-semibold">Request Details</h1>
            <FontAwesomeIcon
              icon={faX}
              className="text-red-500 cursor-pointer hover:scale-110 hover:rotate-180"
              onClick={() => setOpenModal(false)}
            />
          </div>
          <h2>
            Food Expires:{" "}
            <span className="text-red-500">
              {expiryDate.toISOString().slice(0, 10)}
            </span>
          </h2>
          <div className="my-10 flex items-center justify-between gap-20">
            <div>
              <h1 className="font-semibold mb-2">Pick Up Date</h1>
              <input
                type="date"
                className="px-5 py-3 rounded-lg border border-gray-200"
                max={expiryDate.toISOString().split("T")[0]}
                min={new Date().toISOString().split("T")[0]}
                value={pickupDate.toISOString().split("T")[0]}
                onChange={(e) => setPickupDate(new Date(e.target.value))}
              />
            </div>
            <div>
              <h1 className="font-semibold mb-2">Delivery Date</h1>
              <input
                type="date"
                max={expiryDate.toISOString().split("T")[0]}
                className="px-5 py-3 rounded-lg border border-gray-200"
                min={new Date().toISOString().split("T")[0]}
                value={deliveryDate.toISOString().split("T")[0]}
                onChange={(e) => setDeliveryDate(new Date(e.target.value))}
              />
            </div>
            <div></div>
          </div>
          <button
            className="w-1/2 bg-blue-500 rounded-lg font-semibold py-3 px-5 text-white cursor-pointer hover:text-blue-500 hover:bg-[#EEE]"
            onClick={(e) => {
              updateRequest();
              setOpenModal(false);
              if(e.currentTarget.closest("section") )e.currentTarget.closest("section")?.remove();
              queryClient.invalidateQueries({ queryKey: ["request"] });
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailsModal;
