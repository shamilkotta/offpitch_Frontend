import React from "react";
import { Link } from "react-router-dom";

import heroImg from "../../assets/img/hero-img.jpg";

function Hero() {
  return (
    <div className="h-[75vh] max-h-[500px] mb-10 sm:max-h-[2000] flex flex-col sm:flex-row justify-between mx-auto max-w-[1500px] px-10 ">
      <div className="w-full h-full sm:w-1/2 flex flex-col justify-center self-start sm:self-center order-2 sm:order-1 sm:px-10">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-black">
          Elevate Your Football Experience
        </h1>
        <p className="text-base md:text-lg lg:text-xl font-normal my-3">
          Join the community of sports enthusiasts and take part in tournaments
          with ease.
        </p>
        <Link
          to="/user/club"
          className="bg-primary w-fit px-4 py-2 text-sm md:text-base lg:text-lg font-semibold rounded text-white hover:bg-orange-700"
        >
          Get started
        </Link>
      </div>
      <div
        className="w-full sm:w-1/2 h-full bg-center bg-no-repeat bg-contain self-end sm:self-center order-1 sm:order-2"
        style={{ backgroundImage: `url('${heroImg}')` }}
      />
    </div>
  );
}

export default Hero;
