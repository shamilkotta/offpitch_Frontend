import React from "react";
import About from "../../components/Tournament/About";
import Header from "../../components/Tournament/Header";
import Sidbar from "../../components/Tournament/Sidbar";

function PublicTournament() {
  return (
    <div className="max-w-[1400px] px-5 py-10 sm:px-10 mx-auto">
      <div className="grid auto-cols-auto md:grid-cols-[55%_auto] min-[800px]:grid-cols-[60%_auto]">
        <div className="col-start-1 order-1 col-end-2 mr-2">
          <Header />
        </div>
        <div className="col-start-1 order-3 md:order-2 col-end-2 mr-2">
          <About />
        </div>
        <div className="col-start-1 order-2 md:order-3 mt-6 col-end-2 md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-3">
          <Sidbar />
        </div>
      </div>
    </div>
  );
}

export default PublicTournament;
