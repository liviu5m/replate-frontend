import React from "react";

const Ready = () => {
  return (
    <div className="py-40 bg-[url(https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80)] bg-cover bg-center w-full relative">
      <div className="py-20 absolute top-0 left-0 bg-black/50 w-full h-full">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-center mb-3 text-white">
            Ready to Make a Difference?
          </h1>
          <h3 className="text-xl text-center text-gray-200">
            Join our network of food donors, NGO partners, and volunteer drivers
            today.
          </h3>
          <div className="mt-10">
            <button className="px-8 py-5 rounded-lg text-white bg-[#22C55E] border border-[#22C55E] font-semibold hover:text-[#22C55E] hover:bg-white hover:border hover:border-white cursor-pointer mr-5">
              Donate Food
            </button>
            <button className="px-8 py-5 rounded-lg text-white border border-white font-semibold hover:text-black hover:bg-white cursor-pointer">
              Became a Volunteer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ready;
