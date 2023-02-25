/* eslint-disable no-nested-ternary */
import React from "react";
import PropTypes from "prop-types";

import Modal from "../../Modal/Modal";

function ViewData({ close, data }) {
  return (
    <Modal closeModal={close} closeOnOutSide showWarning={false}>
      <div className="w-[90vw] sm:w-[70vw] md:w-[500px] mt-4">
        <div className="flex justify-between gap-x-1 items-end">
          <div>
            <button
              type="button"
              className={`${
                data?.status === "blocked"
                  ? "bg-red-600"
                  : data?.status === "rejected"
                  ? "bg-black"
                  : data?.status === "awaiting"
                  ? "bg-yellow-500"
                  : "bg-green-600"
              } rounded-2xl text-white px-2 text-sm`}
            >
              {data?.status}
            </button>
            <h1 className="mt-2">
              <span className="font-medium text-gray-500">Name : </span>
              <span>{data?.name}</span>
            </h1>
            <h2 className="mt-1">
              <span className="font-medium text-gray-500">Contact : </span>
              {data?.email}
              <span className="font-medium text-gray-500"> | </span>
              {data?.phone}
            </h2>
          </div>
          <img
            src={data?.profile}
            alt="profile"
            className="w-32 h-36 sm:w-36 h:w-40 border-2 border-black rounded"
          />
        </div>
        <div className="mt-2">
          <p>
            <span className="font-medium text-gray-500">Description : </span>
            {data?.description}
          </p>
          <p>
            <span className="font-medium mt-2 text-gray-500">Comment : </span>
            {data?.comment ? data.comment : "-"}
          </p>
        </div>
      </div>
    </Modal>
  );
}

ViewData.propTypes = {
  close: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default ViewData;
