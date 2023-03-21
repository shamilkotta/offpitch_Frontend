import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import PropTypes from "prop-types";

import InputFields, {
  CssTextField,
  InputSubmit,
} from "../InputFields/InputFields";
import cameraIcon from "../../assets/icons/camera.svg";
import playerSchema from "../../schema/user/playerSchema";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useErrorToast, useSuccessToast } from "../../hooks/useToast";
import RightDrawer from "../Drawer/RightDrawer";

function PlayerFrom({ onClose, openState, data, profile, reRender }) {
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
            setPhotoURL("");
            setDoc(null);
            setFile(null);
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
    <RightDrawer
      variant="persistent"
      openState={openState}
      close={() => {
        onClose(false);
      }}
    >
      <div className="w-[80vw] min-[450px]:w-[400px]">
        <h1 className="text-lg font-medium mb-5">Add a player</h1>
        <form className="box-border">
          <div className="flex gap-x-4">
            <div>
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
            </div>
            <div>
              <div className="flex flex-col">
                <div className="flex items-center gap-x-3 flex-wrap">
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
                        ? "border-red-500 text-red-500"
                        : "border-slate-200 text-slate-500"
                    } bg-slate-200 px-3 py-2 relative w-full min-[450px]:w-60 h-40 border-2 rounded`}
                  >
                    Pdf of Age proof
                    <div className="h-5">
                      <div className="text-black">{doc?.name}</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <CssTextField
            error={formik.errors.name && formik.touched.name}
            sx={{ marginTop: "12px" }}
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={
              formik.errors.name && formik.touched.name
                ? formik.errors.name
                : ""
            }
            label="Name"
            className="w-full"
          />
          <div className="w-full">
            <InputFields
              className="h-12 mt-3 w-80"
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
        </form>
        <div className="w-full mt-3 flex justify-end">
          <InputSubmit
            className="w-1/2"
            loadingValue={loading ? "Add" : ""}
            value="Add"
            onClick={formik.handleSubmit}
          />
        </div>
      </div>
    </RightDrawer>
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
  openState: PropTypes.bool.isRequired,
};

export default PlayerFrom;
