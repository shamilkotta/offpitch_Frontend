import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import PropTypes from "prop-types";

import InputFields, { InputSubmit } from "../InputFields/InputFields";
import Modal from "../Modal/Modal";
import cameraIcon from "../../assets/icons/camera.svg";
import playerSchema from "../../schema/user/playerSchema";
import useAxiosPrivate from "../../hooks/userAxiosPrivate";
import { useErrorToast, useSuccessToast } from "../../hooks/useToast";

function PlayerFrom({ onClose, data, profile, reRender }) {
  const [showImgErr, setShowImgErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef();
  const [file, setFile] = useState(null);
  const [photoURL, setPhotoURL] = useState(profile);
  const axios = useAxiosPrivate();
  const docRef = useRef();
  const [doc, setDoc] = useState(null);
  const [showDocErr, setShowDocErr] = useState(false);

  const handleUploadImage = (e) => {
    const image = e.target.files[0];
    if (image) {
      setShowImgErr(false);
      setFile(image);
      setPhotoURL(URL.createObjectURL(image));
    }
  };

  const handleUploadDoc = (e) => {
    const gDoc = e.target.files[0];
    if (gDoc) {
      setShowDocErr(false);
      setDoc(gDoc);
    }
  };

  const formik = useFormik({
    initialValues: data,

    validationSchema: playerSchema,

    onSubmit: (values, { resetForm }) => {
      if (!file) setShowImgErr(true);
      else if (!doc) setShowDocErr(true);
      else {
        setLoading(true);
        setShowImgErr(false);
        // create a formData
        const formData = new FormData();
        // add files to formData
        formData.append("profile", file);
        formData.append("doc", doc);
        // add every values to formData
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value);
        });
        // post data
        axios
          .post("/user/player", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
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
              transform="w-[80vw] sm:w-96"
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
              type="date"
              holder="Date of birth"
              name="date_of_birth"
              max={new Date().toISOString().split("T")[0]}
              min="1953-01-01"
              value={formik.values.date_of_birth}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errorMsg={
                formik.errors.date_of_birth && formik.touched.date_of_birth
                  ? formik.errors.date_of_birth
                  : ""
              }
            />
          </div>
          <div className="col-start-1 col-end-2 row-start-3 row-end-4 w-full">
            <p
              className={`text-sm ${
                showDocErr ? "text-red-500" : "text-gray-500 "
              } flex flex-wrap w-[80vw] sm:w-96`}
            >
              Choose a scanned age proof
            </p>
            <div className="flex items-center gap-x-3 flex-wrap w-[80vw] sm:w-full">
              <input
                type="file"
                name="profile"
                ref={docRef}
                accept="application/pdf"
                style={{ display: "none" }}
                onChange={handleUploadDoc}
              />
              <button
                type="button"
                onClick={() => {
                  docRef.current.click();
                }}
                className={` border ${
                  showDocErr
                    ? "border-red-500 text-red-600"
                    : "border-slate-200 text-black"
                } bg-slate-200 px-3 py-2 rounded`}
              >
                Certificate
              </button>
              <div>{doc?.name}</div>
            </div>
          </div>
        </div>
      </form>
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
