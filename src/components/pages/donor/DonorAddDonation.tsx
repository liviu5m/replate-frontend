import { Link } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "../../../lib/AppContext";
import { useMutation } from "@tanstack/react-query";
import { createDonation } from "../../../api/donation";
import { useState } from "react";
import type { DonationDto } from "../../../lib/Types";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";

const DonorAddDonation = () => {
  const { user, token } = useAppContext();

  const [donation, setDonation] = useState<DonationDto>({
    name: "",
    quantity: "",
    expiryDate: "",
    notes: "",
    unit: "KG",
    status: "AVAILABLE",
  });

  const { mutate } = useMutation({
    mutationKey: ["donation"],
    mutationFn: () => createDonation(donation, user?.id || -1, token || ""),
    onSuccess: (data) => {
      console.log(data);
      setDonation({
        name: "",
        quantity: "",
        expiryDate: "",
        notes: "",
        unit: "KG",
        status: "AVAILABLE",
      });
      toast.success("Donation created successfully");
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

  const submitDonation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="flex items-center justify-center bg-white">
      <div className="container">
        <DashboardLayout>
          <div className="flex items-center justify-between p-5 bg-white border-b border-b-gray-400 h-20">
            <h1 className="font-semibold text-lg">Add Donation</h1>
            <Link
              to={"/"}
              className="flex items-center justify-center gap-3 font-semibold"
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
              <span>Back</span>
            </Link>
          </div>
          <div className="m-10 p-8 rounded-lg bg-white shadow">
            <h1 className="text-lg font-semibold mb-5">Donation Guidelines</h1>
            <ul className="list-disc ml-5 flex flex-col gap-3 text-gray-600">
              <li>
                Please ensure all food items are properly packaged and sealed.
              </li>
              <li>
                Include accurate expiration dates for all perishable items.
              </li>
              <li>
                Non-perishable items like canned goods, rice, and pasta are
                always in high demand.
              </li>
              <li>
                If donating fresh produce, please ensure it's in good condition.
              </li>
              <li>
                Items close to expiry may still be accepted but will be
                prioritized for immediate distribution.
              </li>
            </ul>
          </div>
          <div className="m-10 p-8 rounded-lg bg-white shadow">
            <form onSubmit={(e) => submitDonation(e)}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Food Item Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={donation.name}
                  onChange={(e) =>
                    setDonation({ ...donation, name: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Quantity *
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="0.1"
                    step="0.1"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={donation.quantity}
                    onChange={(e) =>
                      setDonation({ ...donation, quantity: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="unit"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Unit *
                  </label>
                  <select
                    id="unit"
                    name="unit"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={donation.unit}
                    onChange={(e) =>
                      setDonation({ ...donation, unit: e.target.value })
                    }
                  >
                    <option value="KG">Kilograms (kg)</option>
                    <option value="G">Grams (g)</option>
                    <option value="L">Liters (l)</option>
                    <option value="ML">Milliliters (ml)</option>
                    <option value="PCS">Pieces (pcs)</option>
                    <option value="BOXES">Boxes</option>
                    <option value="PACKAGES">Packages</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="expiryDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Expiry Date *
                </label>
                <input
                  type="date"
                  id="expiryDate"
                  name="expiryDate"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={donation.expiryDate}
                  onChange={(e) =>
                    setDonation({ ...donation, expiryDate: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={donation.notes}
                  onChange={(e) =>
                    setDonation({ ...donation, notes: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  Add Food Item
                </button>
              </div>
            </form>
          </div>
        </DashboardLayout>
      </div>
    </div>
  );
};

export default DonorAddDonation;
