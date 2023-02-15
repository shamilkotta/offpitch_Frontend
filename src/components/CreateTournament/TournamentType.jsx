import React from "react";

function TicketTwo() {
  return (
    <div>
      <div className="w-[80vw] max-w-[700px] flex flex-col gap-y-2 !box-border">
        <p className="text-slate-500 text-lg">Tournament type: </p>
        <select
          name="type"
          id="tournament_type"
          className="bg-slate-100 py-2 px-2 outline-none"
        >
          <option value="t1">League (Round robin tournament)</option>
          <option value="t2">
            Double league (Double round robin tournament)
          </option>
          <option value="t3">Knock-out (Elimination tournament)</option>
          <option value="t4">Group stage + knockout</option>
        </select>
      </div>
    </div>
  );
}

export default TicketTwo;
