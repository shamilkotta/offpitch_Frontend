import React from "react";
import { Link } from "react-router-dom";

import linerIcon from "../../assets/icons/liner.svg";
import ctaImg from "../../assets/img/cta.svg";

function CtaOrganize() {
  const cta = [
    "Experience hassle-free tournament management with fully automated platform.",
    "Manage your football tournaments from start to finish with user-friendly platform",
    "Make your mark on the football community",
  ];
  return (
    <div className="bg-[#0D084D]">
      <div className="h-fit max-h-[700px] mb-10 sm:max-h-[2000] text-white flex flex-col sm:flex-row justify-between mx-auto max-w-[1500px] py-20 px-5 sm:px-10 ">
        <div className="w-full h-full sm:w-1/2 flex flex-col justify-center self-start sm:self-center order-2 sm:order-1 sm:pr-10">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-black">
            A place to organize your next match
          </h1>
          <p className="text-sm md:text-base font-normal my-1">
            Say goodbye to time-consuming tournament planning and management
          </p>
          <ul className="ml-3 my-4">
            {cta.map((ele) => (
              <li className="my-2">
                <p className="flex gap-x-4">
                  <img src={linerIcon} alt="liner" />
                  {ele}
                </p>
              </li>
            ))}
          </ul>
          <Link
            to="/user/tournament/new"
            className="bg-primary w-fit px-4 py-2 text-sm md:text-base lg:text-lg font-semibold rounded text-white hover:bg-orange-700"
          >
            Host a match
          </Link>
        </div>
        <div
          className="w-full mb-5 sm:w-1/2 h-96 bg-center bg-no-repeat bg-contain self-end sm:self-center order-1 sm:order-2"
          style={{ backgroundImage: `url('${ctaImg}')` }}
        />
      </div>
    </div>
  );
}

export default CtaOrganize;
