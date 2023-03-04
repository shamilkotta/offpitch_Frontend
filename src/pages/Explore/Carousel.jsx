import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getTournaments } from "../../helpers/apis/guest";
// import arrowIcon from "../../assets/icons/arrow.svg";

const colours = [
  "after:bg-slate-900",
  "after:bg-cyan-900",
  "after:bg-red-900",
  "after:bg-green-900",
  "after:bg-orange-900",
];

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);

  const fetchData = (query) => {
    getTournaments(query)
      .then((res) => {
        if (res?.data?.success) setSlides(res.data.data.allTournaments);
      })
      .catch(() => {});
  };

  useEffect(() => {
    const query = "limit=5&filter=all";
    fetchData(query);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((cSlide) =>
        cSlide >= slides.length - 1 ? 0 : cSlide + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [slides]);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <>
      <div className="relative h-full overflow-hidden">
        <div className="w-full h-full relative rounded transition-transform ease-out duration-500">
          {slides.map((slide, index) => (
            <Link
              to={`/tournament/${slide._id}`}
              key={slide._id}
              style={{
                backgroundImage: `url('${slide.cover}')`,
              }}
              className={`flex flex-col flex-shrink-0 w-full justify-center bg-center bg-cover bg-no-repeat items-start px-5 h-full rounded absolute top-0 left-0 right-0 bottom-0 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              } ${colours[index]} 
                after:content-[''] after:opacity-90 after:rounded after:absolute after:top-0 after:bottom-0 after:right-0 after:left-0
              `}
            >
              <div className="flex z-10 justify-between w-full">
                <div className="flex flex-col">
                  <p className="border mb-1 w-fit border-white rounded-3xl px-3 py-1 text-sm text-white">
                    Live Now
                  </p>
                  <p className="cursor-pointer text-4xl text-white font-semibold leading-10 overflow-hidden text-ellipsis tournament-card_head">
                    {slide?.title}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full flex justify-center space-x-2 mb-4">
        {slides.map((slide, index) => (
          <div
            key={slide._id}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              index === currentSlide ? "bg-white" : "bg-gray-300"
            }`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </>
  );
}

export default Carousel;
