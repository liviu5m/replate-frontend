import { faClock, faMedal, faSignal, faTruck, faUser, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const HowItWorks = () => {
  return (
    <section className="flex items-center justify-center bg-[#F9FAFB] w-full">
      <div className="container flex flex-col py-20">
        <h1 className="text-3xl font-bold text-center">How Replate Works</h1>
        <h4 className="text-gray-600 text-xl text-center mt-4">
          Our platform connects three key groups to create an efficient food
          rescue ecosystem
        </h4>
        <div className="w-full grid grid-cols-3 gap-10 mt-10">
          <div className="p-7 shadow hover:shadow-lg rounded-lg bg-white">
            <FontAwesomeIcon
              icon={faUtensils}
              className="text-[#22C55E] text-4xl mb-4"
            />
            <h2 className="font-semibold text-xl">Food Donors</h2>
            <p className="text-gray-700 mt-2">
              Restaurants, grocery stores, and cafeterias can donate surplus
              food instead of throwing it away.
            </p>
          </div>
          <div className="p-7 shadow hover:shadow-lg rounded-lg bg-white cursor-pointer">
            <FontAwesomeIcon
              icon={faUser}
              className="text-[#22C55E] text-4xl mb-4"
            />
            <h2 className="font-semibold text-xl">NGO Partners</h2>
            <p className="text-gray-700 mt-2">
              We partner with local shelters and food banks to distribute
              donations to those in need.
            </p>
          </div>
          <div className="p-7 shadow hover:shadow-lg rounded-lg bg-white cursor-pointer">
            <FontAwesomeIcon
              icon={faTruck}
              className="text-[#22C55E] text-4xl mb-4"
            />
            <h2 className="font-semibold text-xl">Volunteer Drivers</h2>
            <p className="text-gray-700 mt-2">
              Our network of volunteer drivers ensures timely pickup and delivery of food donations.
            </p>
          </div>
          <div className="p-7 shadow hover:shadow-lg rounded-lg bg-white cursor-pointer">
            <FontAwesomeIcon
              icon={faMedal
              }
              className="text-[#22C55E] text-4xl mb-4"
            />
            <h2 className="font-semibold text-xl">Quality Assurance</h2>
            <p className="text-gray-700 mt-2">
              We ensure all donated food meets safety standards before distribution.
            </p>
          </div>
          <div className="p-7 shadow hover:shadow-lg rounded-lg bg-white cursor-pointer">
            <FontAwesomeIcon
              icon={faSignal}
              className="text-[#22C55E] text-4xl mb-4"
            />
            <h2 className="font-semibold text-xl">Impact Tracking</h2>
            <p className="text-gray-700 mt-2">
              Donors receive reports on their contributions and the impact they've made.
            </p>
          </div>
          <div className="p-7 shadow hover:shadow-lg rounded-lg bg-white cursor-pointer">
            <FontAwesomeIcon
              icon={faClock}
              className="text-[#22C55E] text-4xl mb-4"
            />
            <h2 className="font-semibold text-xl">Quick Response</h2>
            <p className="text-gray-700 mt-2">
              Our system matches donations with recipients in real-time for maximum efficiency.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
