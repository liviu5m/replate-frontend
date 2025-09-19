import {
  faClock,
  faMedal,
  faSignal,
  faTruck,
  faUser,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Process = () => {
  return (
    <section className="flex items-center justify-center bg-white w-full">
      <div className="container flex flex-col py-20">
        <h1 className="text-3xl font-bold text-center">The Replate Process</h1>
        <h4 className="text-gray-600 text-xl text-center mt-4">
          Our streamlined process makes food donation simple, efficient, and
          impactful
        </h4>
        <div className="w-full flex items-center justify-evenly mt-20 gap-10">
          <div className="flex flex-col items-center justify-center">
            <h2 className="bg-[#DCFCE7] w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-[#16A363]">
              1
            </h2>
            <h1 className="text-xl font-semibold my-3">Register</h1>
            <p className="text-center text-gray-600">
              Sign up as a food donor, NGO partner, or volunteer driver on our
              platform.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h2 className="bg-[#DBEAFE] w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-[#2563EB]">
              2
            </h2>
            <h1 className="text-xl font-semibold my-3">Schedule Pickup</h1>
            <p className="text-center text-gray-600">
              Donors list available food and schedule a convenient pickup time.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h2 className="bg-[#FEF3C7] w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-[#D97706]">
              3
            </h2>
            <h1 className="text-xl font-semibold my-3">Collect & Deliver</h1>
            <p className="text-center text-gray-600">
              Volunteer drivers collect food from donors and deliver it to NGO
              partners.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h2 className="bg-[#F3E8FF] w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-[#9333EA]">
              4
            </h2>
            <h1 className="text-xl font-semibold my-3">Distribute</h1>
            <p className="text-center text-gray-600">
              NGOs distribute the food to people in need within their
              communities.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h2
              className="bg-[#FEE2E2] w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-[#DC2626]"
            >
              5
            </h2>
            <h1 className="text-xl font-semibold my-3">Track Impact</h1>
            <p className="text-center text-gray-600">
              All participants can track their contributions and overall impact.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
