import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useAppContext } from "../../../lib/AppContext";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { PackageIcon } from "lucide-react";
import type { Request } from "../../../lib/Types";
import { getAllRequests } from "../../../api/request";
import RequestCard from "../../elements/RequestCard";

const DriverAvailableRequests = () => {
  const { user, token } = useAppContext();

  const { data, isPending } = useQuery({
    queryKey: ["request"],
    queryFn: () => getAllRequests(-1, token || "", "WAITING"),
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
            <h1 className="text-lg font-semibold">Available Requests</h1>
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
                    return (
                      <RequestCard
                        request={request}
                        key={i}
                        action={true}
                        role="driver"
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="m-10 p-8 rounded-lg bg-white shadow flex items-center justify-between flex-col gap-3">
                  <PackageIcon className="h-20 w-20 text-gray-400" />
                  <h2 className="font-semibold text-sm">No Available Requests</h2>
                  <p className="text-gray-400 text-sm">
                    Wait for available requests
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

export default DriverAvailableRequests;
