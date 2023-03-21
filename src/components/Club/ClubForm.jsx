import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import PropTypes from "prop-types";

import { CssTextField, InputSubmit } from "../InputFields/InputFields";
import cameraIcon from "../../assets/icons/camera.svg";
import clubSchema from "../../schema/user/club";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useErrorToast, useSuccessToast } from "../../hooks/useToast";
import RightDrawer from "../Drawer/RightDrawer";

function ClubForm({ onClose, data, profile, reRender, isEdit, openState }) {
  const [showImgErr, setShowImgErr] = useState(false);
  const [showDocErr, setShowDocErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef();
  const docRef = useRef();
  const [file, setFile] = useState(null);
  const [doc, setDoc] = useState(null);
  const [photoURL, setPhotoURL] = useState(profile);
  const axios = useAxiosPrivate();

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

  const handleSubmit = (values) => {
    if (file || doc) {
      const formData = new FormData();
      if (file) formData.append("profile", file);
      if (doc) formData.append("doc", doc);
      // create a formData
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });
      return axios.put("/user/club", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }
    return axios.put("/user/club", { ...values, profile: photoURL });
  };

  const formik = useFormik({
    initialValues: data,
    enableReinitialize: true,
    validationSchema: clubSchema,

    onSubmit: (values) => {
      if (!file && !photoURL) setShowImgErr(true);
      else if (!doc && !isEdit) setShowDocErr(true);
      else {
        setLoading(true);
        setShowImgErr(false);
        setShowDocErr(false);
        handleSubmit(values)
          .then((res) => {
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
        <h1 className="text-lg font-medium mb-5">Create new Club</h1>
        <form className="">
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
                } relative w-40 h-40 border-2 rounded`}
              >
                <div
                  className="relative w-full h-full rounded flex justify-center items-center after:content-[''] after:bg-black/10 hover:after:bg-black/30 after:absolute after:top-0 after:bottom-0 after:right-0 after:left-0"
                  style={{
                    backgroundImage: `url('${photoURL || profile}')`,
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
              {!isEdit && (
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
                      } bg-slate-200 px-3 py-2 relative w-full min-[450px]:w-56 h-40 border-2 rounded`}
                    >
                      Pdf of Govt. registration
                      <div className="h-5">
                        <div className="text-black">{doc?.name}</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
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
          <CssTextField
            error={formik.errors.email && formik.touched.email}
            sx={{ marginTop: "12px" }}
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={
              formik.errors.email && formik.touched.email
                ? formik.errors.email
                : ""
            }
            label="Email"
            className="w-full"
          />
          <CssTextField
            error={formik.errors.phone && formik.touched.phone}
            sx={{ marginTop: "12px" }}
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={
              formik.errors.phone && formik.touched.phone
                ? formik.errors.phone
                : ""
            }
            label="Phone"
            className="w-full"
          />
          <CssTextField
            error={formik.errors.description && formik.touched.description}
            sx={{ marginTop: "12px" }}
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={
              formik.errors.description && formik.touched.description
                ? formik.errors.description
                : ""
            }
            label="Description"
            className="w-full"
            multiline
            rows={5}
          />
        </form>
        <div className="w-full mt-4 flex justify-end">
          <InputSubmit
            className="w-1/2"
            loadingValue={loading ? "Save" : ""}
            value="Save"
            onClick={formik.handleSubmit}
          />
        </div>
      </div>
    </RightDrawer>
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
  openState: PropTypes.bool.isRequired,
};

export default ClubForm;
