import React from "react";
import PropTypes from "prop-types";

function TournamentType({ values, handleChange, handleBlur }) {
  return (
    <div>
      <div className="w-[80vw] max-w-[700px] flex flex-col gap-y-2 !box-border">
        <p className="text-slate-500 text-lg">Tournament type: </p>
        <select
          name="tournament_type"
          id="tournament_type"
          className="bg-slate-100 py-2 px-2 outline-none"
          value={values.tournament_type}
          onChange={handleChange}
          onBlur={handleBlur}
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

TournamentType.propTypes = {
  values: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
};

export default TournamentType;
