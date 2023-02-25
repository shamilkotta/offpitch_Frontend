import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function About({ data }) {
  return (
    <div className="mb-10 mt-6">
      <p className="text-lg font-semibold">About</p>
      <div className="text-gray-600">{data?.description}</div>
      <div className="flex flex-wrap items-center gap-y-3 gap-x-8 my-8">
        <div className="flex items-center">
          <Link to={`/club/${data?.host?._id}`}>
            <img
              className="w-12 h-12 rounded-full mr-2"
              src={data?.host.profile}
              alt=""
            />
          </Link>
          <div className="self-end">
            <p className="font-medium m-0 text-gray-500">Organized by</p>
            <Link
              to={`/club/${data?.host?._id}`}
              className="text-lg font-semibold -mt-2"
            >
              {data?.host.name}
            </Link>
          </div>
        </div>
        <div className="border-l-2 h-10" />
        <div className="flex flex-col justify-end">
          <p className="-mt-1">{data?.host.email}</p>
          <p className="-mt-1">{data?.host.phone}</p>
        </div>
      </div>
    </div>
  );
}

About.propTypes = {
  data: PropTypes.object.isRequired,
};

export default About;
