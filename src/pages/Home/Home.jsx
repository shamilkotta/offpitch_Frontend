import React from "react";
import TournamentCard from "../../components/Cards/TournamentCard";
import Hero from "../../components/Hero/Hero";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import arrowIcon from "../../assets/icons/arrow.svg";
import leageImg from "../../assets/img/soccor1.jpg";
import tournamentImg from "../../assets/img/soccor3.jpg";
import matchImg from "../../assets/img/soccor.jpg";
import liveImg from "../../assets/img/soccor4.jpeg";
import linerIcon from "../../assets/icons/liner.svg";

import ctaImg from "../../assets/img/cta.svg";

function Home() {
  return (
    <div className="">
      <Navbar />
      <Hero />
      <UpcomingSection />
      <QuickButtons />
      <CtaOrganize />
      <Footer />
    </div>
  );
}

function UpcomingSection() {
  const cards = [1, 2, 3, 4];
  return (
    <div className="bg-gray-100">
      <div className="flex flex-col py-10 px-5 sm:p-10 max-w-[1500px] mx-auto box-border">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Upcoming</h3>
          <p className="flex gap-x-2 cursor-pointer">
            Explore <img src={arrowIcon} alt="explore" />{" "}
          </p>
        </div>
        <div className="flex justify-center gap-8 flex-wrap items-center">
          {cards.map(() => (
            <TournamentCard />
          ))}
        </div>
      </div>
    </div>
  );
}

function QuickButtons() {
  return (
    <div>
      <div className="flex items-center justify-center gap-y-6 gap-x-6 md:gap-x-12 px-5 py-10 flex-wrap lg:gap-x-24 text-center sm:p-10 max-w-[1500px] mx-auto">
        <div>
          <img
            className="border-2 border-black mx-auto rounded-full w-20 h-20"
            src={leageImg}
            alt="leagues"
          />{" "}
          <p className="text-lg font-medium mt-3">Leagues</p>
        </div>
        <div>
          <img
            className="border-2 border-black mx-auto rounded-full w-20 h-20"
            src={tournamentImg}
            alt="torunaments"
          />{" "}
          <p className="text-lg font-medium mt-3">Tournaments</p>
        </div>
        <div>
          <img
            className="border-2 border-black mx-auto rounded-full w-20 h-20"
            src={matchImg}
            alt="matches"
          />{" "}
          <p className="text-lg font-medium mt-3">Matches</p>
        </div>
        <div>
          <img
            className="border-2 border-black mx-auto rounded-full w-20 h-20"
            src={liveImg}
            alt="lives"
          />{" "}
          <p className="text-lg font-medium mt-3">Live</p>
        </div>
      </div>
    </div>
  );
}

function CtaOrganize() {
  const cta = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing ",
    "Lorem ipsum dolor sit amet, consectetur adipiscing ",
    "Lorem ipsum dolor sit amet, consectetur adipiscing ",
  ];
  return (
    <div className="bg-[#0D084D]">
      <div className="h-fit max-h-[700px] mb-10 sm:max-h-[2000] text-white flex flex-col sm:flex-row justify-between mx-auto max-w-[1500px] py-20 px-5 sm:px-10 ">
        <div className="w-full h-full sm:w-1/2 flex flex-col justify-center self-start sm:self-center order-2 sm:order-1 sm:pr-10">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-black">
            A place to manage your next match
          </h1>
          <p className="text-sm md:text-base font-normal my-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
          </p>
          <ul className="my-4">
            {cta.map((ele) => (
              <li className="my-2">
                <p className="flex gap-x-4">
                  <img src={linerIcon} alt="liner" />
                  {ele}
                </p>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="bg-primary w-fit px-4 py-2 text-sm md:text-base lg:text-lg font-semibold rounded text-white hover:bg-orange-700"
          >
            Host a match
          </button>
        </div>
        <div
          className="w-full mb-5 sm:w-1/2 h-96 bg-center bg-no-repeat bg-contain self-end sm:self-center order-1 sm:order-2"
          style={{ backgroundImage: `url('${ctaImg}')` }}
        />
      </div>
    </div>
  );
}

export default Home;
