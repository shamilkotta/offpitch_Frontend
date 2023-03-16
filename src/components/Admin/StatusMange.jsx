import React, { useState } from "react";
import PropTypes from "prop-types";

import { InputSubmit, InputTextArea } from "../InputFields/InputFields";
import Modal from "../Modal/Modal";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useErrorToast, useSuccessToast } from "../../hooks/useToast";

function StatusManage({
  close,
  status,
  name,
  text,
  id,
  successClose,
  comment,
  type,
}) {
  const [comments, setComments] = useState(comment);
  const axios = useAxiosPrivate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    axios
      .patch(`/admin/${type}/update-status`, { status, id, comment: comments })
      .then((res) => {
        if (res?.data?.success) {
          useSuccessToast({ message: res?.data?.message });
          successClose({ comment: comments });
        } else {
          useErrorToast({
            message: res?.data?.message || "Something went wrong",
          });
        }
      })
      .catch((err) => {
        useErrorToast({
          message: err?.response?.data?.message || "Something went wrong",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal closeModal={close}>
      <h1 className="my-2 max-w-[370px]">
        Are you sure you want to {text} {name}
      </h1>
      <InputTextArea
        className="mb-3 w-96"
        holder="Comments (optional)"
        value={comments}
        onChange={(e) => setComments(e.target.value)}
      />
      <InputSubmit
        value="Update"
        loadingValue={loading ? "Update" : ""}
        onClick={handleSubmit}
      />
    </Modal>
  );
}

StatusManage.propTypes = {
  close: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  successClose: PropTypes.func.isRequired,
  comment: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default StatusManage;
