import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="">
      <div className="max-w-[1500px] mx-auto box-border">
        <div className="border-t-2 flex justify-between px-8 py-8">
          <div>
            <span className="font-semibold text-xl mr-2">offpitch</span> ©
            offpitch all rights reserved. 2023.
          </div>
          <div>
            <Link
              to={{ pathname: "/", hash: "about" }}
              className="text-slate-500"
            >
              About us
            </Link>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <Link to="/" className="text-slate-500">
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
