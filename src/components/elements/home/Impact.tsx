import React from "react";

const Impact = () => {
  return (
    <div className="text-white py-16 bg-[#22C55E] w-full flex items-center justify-center">
      <div className="container">
        <h1 className="text-center mb-5 text-3xl font-bold">Our Impact</h1>
        <p className="text-xl text-center mb-10 text-gray-100">
          Together, we're making a difference in communities across the country
        </p>
        <div className="grid grid-cols-4 gap-10">
          <div className="flex flex-col items-center justify-center gap-3">
            <h1 className="text-6xl font-bold">1.2M+</h1>
            <h2 className="text-gray-100 text-lg">Meals Delivered</h2>
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
            <h1 className="text-6xl font-bold">500+</h1>
            <h2 className="text-gray-100 text-lg">Food Donors</h2>
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
            <h1 className="text-6xl font-bold">150+</h1>
            <h2 className="text-gray-100 text-lg">NGO Partners</h2>
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
            <h1 className="text-6xl font-bold">300+</h1>
            <h2 className="text-gray-100 text-lg">Volunteer Drivers</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Impact;
