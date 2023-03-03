import React, { useState } from "react";
import PropTypes from "prop-types";

import closeIcon from "../../assets/icons/close.svg";

function Modal({ closeOnOutSide, closeModal, showWarning, children }) {
  const [closeAlert, setCloseAlert] = useState(false);

  const close = () => {
    if (showWarning) setCloseAlert(true);
    else closeModal();
  };

  return (
    <div className="fixed z-50 inset-0 flex items-center">
      <div
        onClick={() => {
          if (closeOnOutSide) close();
        }}
        className="fixed inset-0 bg-white/50 backdrop-blur-sm"
      />
      <div className="relative bg-white border flex flex-col rounded-sm w-fit min-w-[300px] mx-auto my-auto z-20 max-w-[calc(100%-2rem)] h-fit min-h-[120px] max-h-[90vh] py-4 px-4 shadow-lg box-border">
        {closeAlert && (
          <div className="absolute z-20 bg-white/90 top-0 bottom-0 left-0 right-0 box-border flex justify-center">
            <div className="my-auto mx-auto">
              <h1 className="text-lg mx-auto w-full mb-3">Are you sure?</h1>
              <div>
                <button
                  type="button"
                  className="border-2 rounded-sm mr-3 border-red-600 px-2 py-1"
                  onClick={() => {
                    setCloseAlert(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="border-2 text-white rounded-sm bg-primary border-primary px-2 py-1"
                  onClick={() => {
                    closeModal();
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="w-full flex justify-end">
          <button
            type="button"
            onClick={close}
            className="ml-auto mr-0 rounded-full border"
          >
            <img className="w-8 p-2" src={closeIcon} alt="close" />
          </button>
        </div>
        <div className="overflow-auto w-full">{children}</div>
      </div>
    </div>
  );
}

Modal.defaultProps = {
  closeOnOutSide: false,
  showWarning: true,
};

Modal.propTypes = {
  closeOnOutSide: PropTypes.bool,
  showWarning: PropTypes.bool,
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
