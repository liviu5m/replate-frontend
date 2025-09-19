import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useAppContext } from "../../../lib/AppContext";
import { getAllDonations } from "../../../api/donation";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import {
  CheckCircleIcon,
  PackageIcon,
  ShoppingCartIcon,
  TruckIcon,
} from "lucide-react";
import type { Donation, Request } from "../../../lib/Types";
import DonationCard from "../../elements/donor/DonationCard";
import { getAllRequests } from "../../../api/request";
import RequestCard from "../../elements/RequestCard";

const NgoDashboard = () => {
  const { user, token } = useAppContext();

  const { data, isPending } = useQuery({
    queryKey: ["donations"],
    queryFn: () =>
      getAllDonations(token || "", "AVAILABLE", ""),
    refetchOnWindowFocus: false,
    staleTime: 0,
    placeholderData: keepPreviousData,
  });

  const { data: requestsData, isPending: isPendingRequestsData } = useQuery({
    queryKey: ["request"],
    queryFn: () => getAllRequests(user?.id || -1, token || "", "all"),
    refetchOnWindowFocus: false,
    staleTime: 0,
    placeholderData: keepPreviousData,
  });

  console.log(requestsData);
  

  return (
    <div className="flex items-center justify-center bg-white">
      <div className="container">
        <DashboardLayout>
          <div className="flex items-center justify-between p-5 bg-white border-b border-b-gray-400 h-20">
            <h1 className="font-semibold text-lg">NGO Dashboard</h1>
            <Link
              to={"/"}
              className="flex items-center justify-center gap-3 font-semibold"
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
              <span>Back</span>
            </Link>
          </div>
          <div className="m-10 p-8 rounded-lg bg-white shadow">
            <h1 className="text-xl font-bold mb-3">
              Welcome, {user?.fullName} !
            </h1>
            <p className="text-gray-400">
              Find available food donations and track your collection requests.
            </p>
          </div>
          <div className="m-10 p-8 rounded-lg bg-[#EFF6FF] shadow">
            <h1 className="text-blue-500 text-xl font-semibold">
              Quick Actions
            </h1>
            <div className="mt-5 flex">
              <Link
                to={"/ngo/available-food"}
                className="text-white px-8 py-3 rounded-lg bg-blue-500 text-sm font-semibold hover:bg-blue-600 cursor-pointer flex items-center gap-4 border"
              >
                <ShoppingCartIcon className="w-5 h-5" />
                <span>Browse Available Food</span>
              </Link>
              <Link
                to={"/ngo/my-requests"}
                className="text-[#121212] px-8 py-3 rounded-lg bg-white text-sm font-semibold hover:bg-[#F9FAFB] cursor-pointer ml-5 flex items-center gap-4 border"
              >
                <TruckIcon className="h-5 w-5" />
                <span>View My Requests</span>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 m-10">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <PackageIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Available Food
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {data
                          ? data.filter(
                              (donation: Donation) =>
                                donation.status == "AVAILABLE"
                            ).length
                          : 0}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                    <ShoppingCartIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Waiting
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {requestsData
                          ? requestsData.filter(
                              (request: Request) => request.status == "WAITING"
                            ).length
                          : 0}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <TruckIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Pending
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {requestsData
                          ? requestsData.filter(
                              (request: Request) => request.status == "PENDING"
                            ).length
                          : 0}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                    <CheckCircleIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Delivered
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {requestsData
                          ? requestsData.filter(
                              (request: Request) =>
                                request.status == "DELIVERED"
                            ).length
                          : 0}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg m-10">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">
                Available food items
              </h3>
              <Link
                to="/ngo/available-food"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                View all
              </Link>
            </div>
            <div className="p-4 w-full">
              {data && data.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {data.slice(0, 3).map((donation: Donation, i: number) => {
                    return (
                      <DonationCard donation={donation} key={i} role="ngo" />
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <PackageIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No food available found
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Wait for other donations.
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="bg-white shadow rounded-lg m-10">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">My Requests</h3>
              <Link
                to="/donor/donations"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                View all
              </Link>
            </div>
            <div className="p-4 w-full">
              {isPendingRequestsData ? (
                <div className="flex items-center justify-center">
                  <div className="w-30 h-30 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
                </div>
              ) : (
                <div>
                  {requestsData && requestsData.length > 0 ? (
                    <div className="flex flex-col bg-white rounded-lg shadow">
                      {requestsData.slice(0,3).map((request: Request, i: number) => {
                        return (
                          <RequestCard request={request} key={i} role="ngo" />
                        );
                      })}
                    </div>
                  ) : (
                    <div className="m-10 p-8 rounded-lg bg-white shadow flex items-center justify-between flex-col gap-3">
                      <PackageIcon className="h-20 w-20 text-gray-400" />
                      <h2 className="font-semibold text-sm">
                        No donations found
                      </h2>
                      <p className="text-gray-400 text-sm">
                        You haven't made any donations yet.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </DashboardLayout>
      </div>
    </div>
  );
};

export default NgoDashboard;
