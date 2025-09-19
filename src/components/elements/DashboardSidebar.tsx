import {
  ClipboardListIcon,
  HomeIcon,
  PackageIcon,
  PieChartIcon,
  TruckIcon,
  UsersIcon,
} from "lucide-react";
import React from "react";
import { useAppContext } from "../../lib/AppContext";
import { Link, useLocation } from "react-router-dom";

const roleSpecificLinks = {
  admin: [
    {
      to: "/admin/users",
      icon: <UsersIcon className="mr-3 h-5 w-5" />,
      label: "User Management",
    },
    {
      to: "/admin/food-items",
      icon: <PackageIcon className="mr-3 h-5 w-5" />,
      label: "Food Items",
    },
    {
      to: "/admin/collections",
      icon: <ClipboardListIcon className="mr-3 h-5 w-5" />,
      label: "Collections",
    },
    {
      to: "/admin/reports",
      icon: <PieChartIcon className="mr-3 h-5 w-5" />,
      label: "Reports",
    },
  ],
  donor: [
    {
      to: "/donor/donations",
      icon: <PackageIcon className="mr-3 h-5 w-5" />,
      label: "My Donations",
    },
    {
      to: "/donor/add-donation",
      icon: <ClipboardListIcon className="mr-3 h-5 w-5" />,
      label: "Add Donation",
    },
  ],
  ngo: [
    {
      to: "/ngo/available-food",
      icon: <PackageIcon className="mr-3 h-5 w-5" />,
      label: "Available Food",
    },
    {
      to: "/ngo/my-requests",
      icon: <ClipboardListIcon className="mr-3 h-5 w-5" />,
      label: "My Requests",
    },
  ],
  driver: [
    {
      to: "/driver/available-requests",
      icon: <TruckIcon className="mr-3 h-5 w-5" />,
      label: "Available Requests",
    },
    {
      to: "/driver/my-requests",
      icon: <ClipboardListIcon className="mr-3 h-5 w-5" />,
      label: "My Requests",
    },
  ],
};

const DashboardSidebar = () => {
  const { user } = useAppContext();
  const { pathname } = useLocation();

  return (
    <div className="w-1/5 bg-white min-w-60 h-screen">
      <div className="p-5 border-b border-b-gray-400 h-20">
        <Link to={"/"} className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#22C55E]">
            <h2 className="text-xl font-bold text-white">R</h2>
          </div>
          <h2 className="font-bold text-lg">replate</h2>
        </Link>
      </div>
      <div className="p-5">
        <ul>
          <Link
            to={`/${user?.role.toLowerCase()}/dashboard`}
            className={`flex items-center gap-2 font-semibold text-gray-600 mb-2 px-4 py-3 rounded-lg ${
              pathname == `/${user?.role.toLowerCase()}/dashboard` &&
              "bg-gray-100"
            }`}
          >
            {<HomeIcon className="mr-3 h-5 w-5" />}
            <span>Dashboard</span>
          </Link>
          {roleSpecificLinks[
            user?.role.toLowerCase() as keyof typeof roleSpecificLinks
          ].map((link, i) => {
            return (
              <Link
                key={i}
                to={link.to}
                className={`flex items-center gap-2 font-semibold text-gray-600 mb-2 px-4 py-3 rounded-lg ${
                  pathname == link.to && "bg-gray-100"
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DashboardSidebar;
