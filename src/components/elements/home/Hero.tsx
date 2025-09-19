import React from "react";

const Hero = () => {
  return (
    <div className="flex items-center justify-center w-full bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(204,255,224,1)_93%,rgba(222,255,235,1)_100%)] py-10">
      <div className="container">
        <div className="flex items-center justify-center">
          <div className="w-1/2">
            <h1 className="text-[#121212] font-bold text-6xl">
              Reduce Food Waste, <br />
              <span className="text-[#22C55E]">Feed Communities</span>
            </h1>
            <h4 className="text-xl mt-5 text-gray-500 w-1/2">
              Connecting restaurants with surplus food to local food banks and
              shelters in need.
            </h4>
            <div className="mt-5">
              <button className="px-10 py-5 rounded-2xl text-white bg-[#22C55E] font-semibold cursor-pointer hover:bg-white hover:text-[#22C55E]">Join Now</button>
            </div>
          </div>
          <div className="w-1/2">
            <img src="/imgs/hero.avif" className="rounded-lg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
