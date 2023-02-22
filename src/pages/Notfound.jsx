import React from "react";
import { Link } from "react-router-dom";

function Notfound() {
  return (
    <div className="h-[80vh] flex justify-center gap-y-2 flex-col items-center ">
      <div className="flex justify-center items-center gap-x-4 text-xl font-medium">
        404 <span className="border-r border-2 h-8 border-black" /> Notfound
      </div>
      <p>
        Go to{" "}
        <Link to="/" className="text-primary">
          home
        </Link>
      </p>
    </div>
  );
}

export default Notfound;
