import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useAppContext } from "../../../lib/AppContext";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import {
  CheckCircleIcon,
  PackageIcon,
  ShoppingCartIcon,
  TruckIcon,
} from "lucide-react";
import type { Request, RequestDonation } from "../../../lib/Types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { useState } from "react";
import { getAllRequests } from "../../../api/request";
import RequestCard from "../../elements/RequestCard";

const NgoMyRequests = () => {
  const { user, token } = useAppContext();
  const [sorting, setSorting] = useState("all");

  const { data, isPending } = useQuery({
    queryKey: ["request", sorting],
    queryFn: () => getAllRequests(user?.id || -1, token || "", sorting),
    refetchOnWindowFocus: false,
    staleTime: 0,
    placeholderData: keepPreviousData,
  });

  return (
    <div className="flex items-center justify-center bg-white">
      <div className="container">
        <DashboardLayout>
          <div className="flex items-center justify-between p-5 bg-white border-b border-b-gray-400 h-20">
            <h1 className="font-semibold text-lg">My Requests</h1>
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
                  <SelectValue placeholder="All Requests" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Requests</SelectItem>
                  <SelectItem value="WAITING">Waiting</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="ASKING">Asking</SelectItem>
                  <SelectItem value="DELIVERED">Delivered</SelectItem>
                  <SelectItem value="CANCELED">Canceled</SelectItem>
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
                <div className="flex flex-col bg-white rounded-lg m-10 shadow">
                  {data.map((request: Request, i: number) => {
                    return <RequestCard request={request} key={i} role="ngo" />;
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

export default NgoMyRequests;
