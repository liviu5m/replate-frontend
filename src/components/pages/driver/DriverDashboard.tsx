import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DashboardLayout from "../../layouts/DashboardLayout";
import { faPlus, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../lib/AppContext";
import {
  AlertCircleIcon,
  CheckCircleIcon,
  PackageIcon,
  PlusIcon,
  TruckIcon,
} from "lucide-react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllRequests, getAllRequestsByDriverId } from "../../../api/request";
import Loader from "../../elements/Loader";
import type { Request } from "../../../lib/Types";
import RequestCard from "../../elements/RequestCard";

const DriverDashboard = () => {
  const { user, token } = useAppContext();

  const { data: requests, isPending } = useQuery({
    queryKey: ["request"],
    queryFn: () => getAllRequestsByDriverId(token || "", user?.id || -1, "all"),
    refetchOnWindowFocus: false,
    staleTime: 0,
    placeholderData: keepPreviousData,
  });

  const { data: availableRequests, isPending: isPendingRequests } = useQuery({
    queryKey: ["request-available"],
    queryFn: () => getAllRequests(-1, token || "", "WAITING"),
    refetchOnWindowFocus: false,
    staleTime: 0,
  });

  return isPending || isPendingRequests ? (
    <Loader />
  ) : (
    <div className="flex items-center justify-center bg-white">
      <div className="container">
        <DashboardLayout>
          <div className="flex items-center justify-between p-5 bg-white border-b border-b-gray-400 h-20">
            <h1 className="font-semibold text-lg">Driver Dashboard</h1>
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
              Thank you for your contributions to reducing food waste and
              helping those in need.
            </p>
          </div>
          <div className="m-10 p-8 rounded-lg bg-[#EFF6FF] shadow">
            <h1 className="text-blue-500 text-xl font-semibold">
              Quick Actions
            </h1>
            <div className="mt-5 flex">
              <Link
                to={"/driver/available-requests"}
                className="text-white px-8 py-3 rounded-lg bg-blue-500 text-sm font-semibold hover:bg-blue-600 cursor-pointer flex items-center justify-center gap-4"
              >
                <TruckIcon className="h-6 w-6 text-white" />
                <span>Available Requests</span>
              </Link>
              <Link
                to={"/driver/my-requests"}
                className="text-[#121212] px-8 py-3 rounded-lg bg-white text-sm font-semibold hover:bg-[#F9FAFB] cursor-pointer ml-5 flex items-center gap-4 border"
              >
                <CheckCircleIcon className="h-6 w-6" />
                <span>My Requests</span>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 m-10">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <TruckIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Pending Deliveries
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {
                          requests.filter(
                            (request: Request) => request.status == "PENDING"
                          ).length
                        }
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <CheckCircleIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Completed Deliveries
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {
                          requests.filter(
                            (request: Request) => request.status == "DELIVERED"
                          ).length
                        }
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
                    <PackageIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Items Delivered
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {requests.reduce(
                          (sum: number, request: Request) =>
                            (sum += request.requestDonations.length),
                          0
                        )}
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
                Recent Donations
              </h3>
              <Link
                to="/driver/available-requests"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                View all
              </Link>
            </div>
            <div className="p-4 w-full">
              {availableRequests.length > 0 ? (
                availableRequests.slice(0, 3).map((request: Request) => {
                  return <RequestCard request={request} role="driver" />;
                })
              ) : (
                <div className="text-center py-8">
                  <PackageIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No donations yet
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Start by adding a new food donation.
                  </p>
                  <div className="mt-6">
                    <Link
                      to="/donor/add-donation"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <PlusIcon className="mr-2 h-4 w-4" />
                      Add New Donation
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DashboardLayout>
      </div>
    </div>
  );
};

export default DriverDashboard;
