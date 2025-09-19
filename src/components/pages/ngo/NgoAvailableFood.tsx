import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useAppContext } from "../../../lib/AppContext";
import { getAllDonations, updateDonation } from "../../../api/donation";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { PackageIcon, ShoppingCartIcon } from "lucide-react";
import type {
  Donation,
  DonationDto,
  RequestDonationDto,
} from "../../../lib/Types";
import DonationCard from "../../elements/donor/DonationCard";
import { useState } from "react";
import { createRequestApi } from "../../../api/request";
import { createRequestDonationApi } from "../../../api/request-donation";

const NgoAvailableFood = () => {
  const { user, token } = useAppContext();
  const [search, setSearch] = useState("");
  const [selectDonations, setSelectedDonations] = useState<Set<Donation>>(
    new Set()
  );
  const queryClient = useQueryClient();

  const handleCheckboxChange = (donation: Donation) => {
    if(isCreating || isCreatingDonation) return;
    setSelectedDonations((prev: Set<Donation>) => {
      const newSet = new Set(prev);
      if (newSet.has(donation)) {
        newSet.delete(donation);
      } else {
        newSet.add(donation);
      }
      return newSet;
    });
    return selectDonations.has(donation);
  };

  const { data, isPending } = useQuery({
    queryKey: ["donations", search],
    queryFn: () =>
      getAllDonations(token || "", "AVAILABLE", search),
    refetchOnWindowFocus: false,
    staleTime: 0,
    placeholderData: keepPreviousData,
  });

  const { mutate: createRequestDonation, isPending: isCreatingDonation } = useMutation({
    mutationKey: ["request-donation"],
    mutationFn: (data: RequestDonationDto) =>
      createRequestDonationApi(data, token || ""),
    onSuccess: (data) => {
      console.log(data);
      document
        .querySelectorAll('input[type="checkbox"]')
        .forEach((checkbox) => {
          (checkbox as HTMLInputElement).checked = false;
        });
      
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { mutate: updateDonationStatus } = useMutation({
    mutationKey: ["donation"],
    mutationFn: ({
      donation,
      donationId,
    }: {
      donation: DonationDto;
      donationId: number;
    }) => updateDonation(donation, donationId, token || ""),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["donations"], exact: false });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { mutate: createRequest, isPending: isCreating } = useMutation({
    mutationKey: ["request"],
    mutationFn: () =>
      createRequestApi(
        { ngoId: user?.id || -1, status: "WAITING" },
        token || ""
      ),
    onSuccess: (data) => {
      console.log(data);
      selectDonations.forEach((donation: Donation) => {
        updateDonationStatus({
          donation: {
            ...donation,
            quantity: String(donation.quantity),
            status: "WAITING",
          },
          donationId: donation.id,
        });
      });
      selectDonations.forEach((donation: Donation) => {
        createRequestDonation({ requestId: data.id, donationId: donation.id });
      });
      setSelectedDonations(new Set());
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const createRequestFunc = () => {
    createRequest();
  };

  return (
    <div className="flex items-center justify-center bg-white">
      <div className="container">
        <DashboardLayout>
          <div className="flex items-center justify-between p-5 bg-white border-b border-b-gray-400 h-20">
            <h1 className="font-semibold text-lg">Available Food</h1>
            <Link
              to={"/"}
              className="flex items-center justify-center gap-3 font-semibold"
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
              <span>Back</span>
            </Link>
          </div>
          <div className="m-10 p-8 rounded-lg bg-white shadow flex items-center justify-between">
            <div className="w-1/2 flex items-center ">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search food items..."
                className="px-5 py-3 outline-none border-none w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div>
              <button
                className={`px-5 py-3 rounded-lg text-sm flex font-semibold items-center justify-center gap-3 ${
                  selectDonations.size == 0
                    ? "bg-blue-200 text-white hover:bg-blue-300 "
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
                disabled={selectDonations.size == 0 || isCreating}
                onClick={() => createRequestFunc()}
              >
                <ShoppingCartIcon className="w-5 h-5" />
                <span className="flex items-center justify-center gap-2">
                  Request Selected ({selectDonations.size}){" "}
                  {isCreating && (
                    <div className="w-5 h-5 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
                  )}
                </span>
              </button>
            </div>
          </div>
          {isPending ? (
            <div className="flex items-center justify-center">
              <div className="w-30 h-30 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div>
              {data && data.length > 0 ? (
                <div className="grid grid-cols-1 gap-10 m-10 sm:grid-cols-2 lg:grid-cols-3">
                  {data.map((donation: Donation, i: number) => {
                    return (
                      <DonationCard
                        role="ngo"
                        donation={donation}
                        key={i}
                        selectable={true}
                        handleCheckboxChange={handleCheckboxChange}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="m-10 p-8 rounded-lg bg-white shadow flex items-center justify-between flex-col gap-3">
                  <PackageIcon className="h-20 w-20 text-gray-400" />
                  <h2 className="font-semibold text-sm">
                    No food available found
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Wait for other donations.
                  </p>
                </div>
              )}
            </div>
          )}
        </DashboardLayout>
      </div>
    </div>
  );
};

export default NgoAvailableFood;
