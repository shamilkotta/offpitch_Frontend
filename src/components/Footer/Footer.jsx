import React from "react";

function Footer() {
  return (
    <div className="border-t-2">
      <div className="max-w-[1500px] mx-auto box-border">
        <div className="py-10 px-5 sm:p-10 flex flex-wrap gap-4 justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-black/80">offpitch</h1>
            <p className="max-w-[300px] text-gray-500">
              Our motto to fulfill customer demand by making them satisfied with
              growing their business.
            </p>
          </div>
          <div>
            <h1 className="text-lg font-bold text-black/80">About</h1>
            <ul className="ml-1">
              <li className="my-2 text-base font-light text-gray-500 hover:text-gray-600 cursor-pointer">
                About Us
              </li>
              <li className="my-2 text-base font-light text-gray-500 hover:text-gray-600 cursor-pointer">
                Features
              </li>
              <li className="my-2 text-base font-light text-gray-500 hover:text-gray-600 cursor-pointer">
                News
              </li>
              <li className="my-2 text-base font-light text-gray-500 hover:text-gray-600 cursor-pointer">
                FAQ
              </li>
            </ul>
          </div>
          <div>
            <h1 className="text-lg font-bold text-black/80">Support</h1>
            <ul className="ml-1">
              <li className="my-2 text-base font-light text-gray-500 hover:text-gray-600 cursor-pointer">
                Account
              </li>
              <li className="my-2 text-base font-light text-gray-500 hover:text-gray-600 cursor-pointer">
                Support center
              </li>
              <li className="my-2 text-base font-light text-gray-500 hover:text-gray-600 cursor-pointer">
                Feedback
              </li>
              <li className="my-2 text-base font-light text-gray-500 hover:text-gray-600 cursor-pointer">
                Contact us
              </li>
            </ul>
          </div>
          <div>
            <h1 className="text-lg font-bold text-black/80">Get our app</h1>
            <ul className="ml-1">
              <li className="my-2 text-base font-light text-gray-500 hover:text-gray-600 cursor-pointer">
                Account
              </li>
              <li className="my-2 text-base font-light text-gray-500 hover:text-gray-600 cursor-pointer">
                Support center
              </li>
              <li className="my-2 text-base font-light text-gray-500 hover:text-gray-600 cursor-pointer">
                Feedback
              </li>
              <li className="my-2 text-base font-light text-gray-500 hover:text-gray-600 cursor-pointer">
                Contact us
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t-2 px-8 py-8">
          Copyright offpitch 2023 All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default Footer;
