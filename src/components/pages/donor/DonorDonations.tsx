import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  faFilter,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { PackageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllDonations, getAllDonationsByDonorId } from "../../../api/donation";
import { useAppContext } from "../../../lib/AppContext";
import DonationCard from "../../elements/donor/DonationCard";
import type { Donation } from "../../../lib/Types";
import { useState } from "react";

const DonorDonations = () => {
  const { token, user } = useAppContext();
  const [sorting, setSorting] = useState("all");

  const { data, isPending } = useQuery({
    queryKey: ["donations", sorting],
    queryFn: () => getAllDonationsByDonorId(user?.id || -1, token || "", sorting, ""),
    refetchOnWindowFocus: false,
    staleTime: 0,
    placeholderData: keepPreviousData,
  });

  return (
    <div className="flex items-center justify-center bg-white">
      <div className="container">
        <DashboardLayout>
          <div className="flex items-center justify-between p-5 bg-white border-b border-b-gray-400 h-20">
            <h1 className="font-semibold text-lg">My Donations</h1>
            <Link
              to={"/"}
              className="flex items-center justify-center gap-3 font-semibold"
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
              <span>Back</span>
            </Link>
          </div>
          <div className="m-10 p-8 rounded-lg bg-white shadow flex items-center justify-between">
            <h1 className="text-lg font-semibold">Your Donation History</h1>
            <div className="flex gap-2 items-center">
              <FontAwesomeIcon
                icon={faFilter}
                className="text-gray-400 mr-5 text-lg"
              />
              <Select value={sorting} onValueChange={(e) => setSorting(e)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Donations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Donations</SelectItem>
                  <SelectItem value="AVAILABLE">Available</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="WAITING">Waiting</SelectItem>
                  <SelectItem value="DELIVERED">Delivered</SelectItem>
                  <SelectItem value="EXPIRED">Expired</SelectItem>
                </SelectContent>
              </Select>
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
                      <DonationCard donation={donation} key={i} role="donor" />
                    );
                  })}
                </div>
              ) : (
                <div className="m-10 p-8 rounded-lg bg-white shadow flex items-center justify-between flex-col gap-3">
                  <PackageIcon className="h-20 w-20 text-gray-400" />
                  <h2 className="font-semibold text-sm">No donations found</h2>
                  <p className="text-gray-400 text-sm">
                    You haven't made any donations yet.
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

export default DonorDonations;
