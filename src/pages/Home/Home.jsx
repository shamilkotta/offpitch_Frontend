import React from "react";

import Hero from "../../components/Hero/Hero";
import UpcomingSection from "./UpcomingSection";
import QuickButtons from "./QuickButtons";
import CtaOrganize from "./CtaOrganize";
import aboutImg from "../../assets/img/about.svg";

function Home() {
  return (
    <>
      <Hero />
      <UpcomingSection />
      <QuickButtons />
      <CtaOrganize />
      <div className="" id="about">
        <div className="h-fit max-h-[700px] mb-10 sm:max-h-[2000] flex flex-col sm:flex-row justify-between mx-auto max-w-[1500px] py-20 px-5 sm:px-10 ">
          <div
            className="w-full mb-5 sm:w-1/2 h-96 bg-center bg-no-repeat bg-contain self-end sm:self-center order-1"
            style={{ backgroundImage: `url('${aboutImg}')` }}
          />
          <div className="w-full h-full sm:w-1/2 flex flex-col justify-center self-start sm:self-center order-2 sm:pr-10">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black">
              Why us
            </h1>
            <p className="text-sm md:text-base font-normal my-1 indent-5">
              We believe that organizing and participating in football
              tournaments should be an easy and enjoyable experience, which is
              why we&apos;ve created a platform that is intuitive, easy-to-use,
              and packed with powerful features. From creating your own
              tournaments to registering your club for existing ones, we makes
              it simple to manage every aspect of the tournament organization
              process.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
