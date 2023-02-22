import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import PropTypes from "prop-types";

import InputFields, {
  InputSubmit,
  InputTextArea,
} from "../InputFields/InputFields";
import Modal from "../Modal/Modal";
import cameraIcon from "../../assets/icons/camera.svg";
import organizationSchema from "../../schema/user/organization";
import useImageUploader from "../../hooks/useImageUploader";
import useAxiosPrivate from "../../hooks/userAxiosPrivate";
import { useErrorToast, useSuccessToast } from "../../hooks/useToast";

function ClubForm({ onClose, data, profile, reRender, isEdit }) {
  const [showImgErr, setShowImgErr] = useState(false);
  const [showDocErr, setShowDocErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef();
  const docRef = useRef();
  const [file, setFile] = useState(null);
  const [doc, setDoc] = useState(null);
  const [photoURL, setPhotoURL] = useState(profile);
  const [uploadProgress, setUploadProgress] = useState(0);
  const axios = useAxiosPrivate();
  const uploadImageToCloudinary = useImageUploader();

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
      setPhotoURL(URL.createObjectURL(gDoc));
    }
  };

  const handleSubmit = (values) => {
    if (file) {
      return uploadImageToCloudinary({
        file,
        onProgress: (value) => {
          setUploadProgress(value);
        },
      }).then((res) =>
        axios.put("/user/club", { ...values, imageData: res.photoData })
      );
    }
    return axios.put("/user/club", { ...values, photoData: photoURL });
  };

  const formik = useFormik({
    initialValues: data,

    validationSchema: organizationSchema,

    onSubmit: (values, { resetForm }) => {
      if (!file && !photoURL) setShowImgErr(true);
      else if (!doc && !isEdit) setShowDocErr(true);
      else {
        setLoading(true);
        setShowImgErr(false);
        setShowDocErr(false);
        handleSubmit(values)
          .then((res) => {
            resetForm({ values: "" });
            useSuccessToast({ message: res.data.message });
            onClose(false);
            reRender();
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
      <h1 className="text-lg font-medium mb-5">Create new Club</h1>
      <form className="grid gap-3 auto-rows-auto grid-cols-auto w-max sm:w-max md:w-max box-border">
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
        <div className="grid self-end gap-3 h-fit grid-cols-auto grid-rows-auto col-start-1 sm:col-start-2 col-end-3 row-start-2 sm:row-start-1 row-end-3 sm:row-end-2">
          <div className="col-start-1 col-end-3 row-start-1 row-end-2 w-full">
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
          <div className="col-start-1 col-end-3 md:col-end-2 row-start-2 row-end-3 w-full">
            <InputFields
              className="h-12"
              transform="w-[80vw] sm:w-80"
              type="text"
              holder="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errorMsg={
                formik.errors.email && formik.touched.email
                  ? formik.errors.email
                  : ""
              }
            />
          </div>
          <div className="col-start-1 md:col-start-2 col-end-3 row-start-3 md:row-start-2 row-end-4 md:row-end-3 w-full">
            <InputFields
              className="h-12"
              type="number"
              holder="Phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errorMsg={
                formik.errors.phone && formik.touched.phone
                  ? formik.errors.phone
                  : ""
              }
            />
          </div>
        </div>
        <div className="col-start-1 col-end-3 row-start-3 sm:row-start-2 row-end-4">
          <InputTextArea
            holder="Description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMsg={
              formik.errors.description && formik.touched.description
                ? formik.errors.description
                : ""
            }
          />
        </div>
        {!isEdit && (
          <div className="flex flex-col col-start-1 col-end-3 row-start-4 row-end-5">
            <p
              className={`text-sm ${
                showDocErr ? "text-red-500" : "text-gray-500 "
              } flex flex-wrap w-[80vw] sm:w-96`}
            >
              Choose a scanned pdf of government registration document
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
                  showDocErr ? "border-red-500" : "border-slate-200"
                } bg-slate-200 px-3 py-2 rounded`}
              >
                Govt. certificate
              </button>
              <div>{doc?.name}</div>
            </div>
          </div>
        )}
      </form>
      {uploadProgress > 1 && (
        <div className="w-full h-2 rounded mt-3 relative bg-slate-200">
          <div
            className="bg-primary h-2 rounded"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}
      <div className="w-full mt-4 flex justify-end">
        <InputSubmit
          className="w-1/2"
          loadingValue={loading ? "Save" : ""}
          value="Save"
          onClick={formik.handleSubmit}
        />
      </div>
    </Modal>
  );
}

ClubForm.defaultProps = {
  data: {
    name: "",
    description: "",
    email: "",
    phone: "",
  },
  profile: "",
  isEdit: false,
  reRender: () => {},
};

ClubForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
  data: PropTypes.object,
  profile: PropTypes.string,
  reRender: PropTypes.func,
};

export default ClubForm;
