import {
  faEnvelope,
  faLocation,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#1F2937] py-20 w-full flex items-center justify-center">
      <div className="container">
        <div className="grid grid-cols-4 gap-10 text-white border-b border-b-gray-700 pb-10">
          <div>
            <h2 className="font-bold text-xl">Replate</h2>
            <p className="text-gray-200 mt-2">
              Connecting food donors with local communities in need to reduce
              food waste and fight hunger.
            </p>
          </div>
          <div>
            <h2 className="font-bold text-xl">Quick Links</h2>
            <ul className="text-gray-200 mt-4 flex flex-col gap-2">
              <li>Home</li>
              <li>About Us</li>
              <li>Donate</li>
              <li>Food</li>
              <li>Volunteer</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-xl">Resources</h2>
            <ul className="text-gray-200 mt-4 flex flex-col gap-2">
              <li>Blog</li>
              <li>FAQ</li>
              <li>Success</li>
              <li>Stories</li>
              <li>Partner With Us</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-xl">Contact Us</h2>
            <ul className="text-gray-200 mt-4 flex flex-col gap-3">
              <li className="flex items-center gap-3">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="text-green-500"
                />
                <p>123 Main Street, City, State 12345</p>
              </li>
              <li className="flex items-center gap-3">
                <FontAwesomeIcon icon={faPhone} className="text-green-500" />
                <p>(123) 456-7890</p>
              </li>
              <li className="flex items-center gap-3">
                <FontAwesomeIcon icon={faEnvelope} className="text-green-500" />
                <p>replateapp@gmail.com</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="py-5 text-center text-gray-200 font-semibold">
          <p>&copy; 2025 Replate. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
