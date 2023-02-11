import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import PropTypes from "prop-types";

import InputFields, { InputSubmit } from "../InputFields/InputFields";
import Modal from "../Modal/Modal";
import cameraIcon from "../../assets/icons/camera.svg";
import playerSchema from "../../schema/user/playerSchema";
import useAxiosPrivate from "../../hooks/userAxiosPrivate";
import { useErrorToast, useSuccessToast } from "../../hooks/useToast";
import useImageUploader from "../../hooks/useImageUploader";

function PlayerFrom({ onClose, data, profile, reRender }) {
  const [showImgErr, setShowImgErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef();
  const [file, setFile] = useState(null);
  const [photoURL, setPhotoURL] = useState(profile);
  const [uploadProgress, setUploadProgress] = useState(0);
  const axios = useAxiosPrivate();
  const uploadImageToCloudinary = useImageUploader({
    file,
    onProgress: (value) => {
      setUploadProgress(value);
    },
  });

  const handleUploadImage = (e) => {
    const image = e.target.files[0];
    if (image) {
      setShowImgErr(false);
      setFile(image);
      setPhotoURL(URL.createObjectURL(image));
    }
  };

  const formik = useFormik({
    initialValues: data,

    validationSchema: playerSchema,

    onSubmit: (values, { resetForm }) => {
      if (!file) setShowImgErr(true);
      else {
        setLoading(true);
        setShowImgErr(false);
        uploadImageToCloudinary()
          .then((res) =>
            axios.post("/user/player", { ...values, imageData: res.photoData })
          )
          .then(() => {
            reRender();
            useSuccessToast({ message: "New player added successfully" });
            resetForm({ values: "" });
            onClose();
          })
          .catch((err) => {
            const largErr = err?.response?.data?.error?.message;
            if (largErr && largErr.split(".")[0] === "File size too large")
              useErrorToast({ message: "Image size is too large" });
            else
              useErrorToast({
                message: err?.response?.data?.message || "Something went wrong",
              });
          })
          .finally(() => {
            setLoading(false);
            setUploadProgress(0);
          });
      }
    },
  });

  return (
    <Modal
      closeOnOutSide
      closeModal={() => {
        onClose(false);
      }}
    >
      <h1 className="text-lg font-medium mb-5">Add a player</h1>
      <form className="grid gap-3 auto-rows-auto grid-cols-auto w-max box-border">
        <input
          type="file"
          name="profile"
          ref={ref}
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleUploadImage}
        />
        <button
          type="button"
          onClick={() => {
            ref.current.click();
          }}
          className={`col-start-1 ${
            showImgErr && "border-red-700 border-2"
          } relative sm:col-end-2 col-end-3 row-start-1 row-end-2 w-36 h-40 border-2 rounded`}
        >
          <div
            className="relative w-full h-full rounded flex justify-center items-center after:content-[''] after:bg-black/10 hover:after:bg-black/30 after:absolute after:top-0 after:bottom-0 after:right-0 after:left-0"
            style={{
              backgroundImage: `url('${photoURL}')`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <img
              src={cameraIcon}
              alt=""
              className="absolute top-0 bottom-0 mx-auto my-auto left-0 right-0"
            />
          </div>
        </button>
        <div className="grid gap-3 h-fit grid-cols-auto grid-rows-auto col-start-1 sm:col-start-2 col-end-3 row-start-2 sm:row-start-1 row-end-3 sm:row-end-2">
          <div className="col-start-1 col-end-2 row-start-1 row-end-2 w-full">
            <InputFields
              className="h-12"
              type="text"
              holder="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errorMsg={
                formik.errors.name && formik.touched.name
                  ? formik.errors.name
                  : ""
              }
            />
          </div>
          <div className="col-start-1 col-end-2 row-start-2 row-end-3 w-full">
            <InputFields
              className="h-12 w-80"
              type="text"
              holder="Date of birth"
              name="date_of_birth"
              max={new Date().toISOString().split("T")[0]}
              min="1953-01-01"
              value={formik.values.date_of_birth}
              onFocus={(e) => {
                e.target.type = "date";
              }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errorMsg={
                formik.errors.date_of_birth && formik.touched.date_of_birth
                  ? formik.errors.date_of_birth
                  : ""
              }
            />
          </div>
        </div>
      </form>
      {loading && (
        <div className="w-full h-2 rounded mt-3 relative bg-slate-200">
          <div
            className="bg-primary h-2 rounded"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}
      <div className="w-full mt-3 flex justify-end">
        <InputSubmit
          className="w-1/2"
          loadingValue={loading ? "Add" : ""}
          value="Add"
          onClick={formik.handleSubmit}
        />
      </div>
    </Modal>
  );
}

PlayerFrom.defaultProps = {
  data: {
    name: "",
    date_of_birth: "",
  },
  profile: "",
  reRender: () => {},
};

PlayerFrom.propTypes = {
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object,
  profile: PropTypes.string,
  reRender: PropTypes.func,
};

export default PlayerFrom;