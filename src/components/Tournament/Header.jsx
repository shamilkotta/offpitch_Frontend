import React from "react";

import soccorImg from "../../assets/img/soccor2.jpg";
import "./Tournament.scss";

function Header() {
  return (
    <div className="flex-col">
      <p className="text-3xl font-bold mb-5">
        Lorem ipsum dolor lorem ipsum dolor sit. lorem ipsum dolor sit. sit
        amet.
      </p>
      <div
        style={{ backgroundImage: `url('${soccorImg}')` }}
        className="rounded w-full aspect-[8/5] bg-cover bg-center bg-no-repeat col-start-1 col-end-2 "
      />
    </div>
  );
}

export default Header;
