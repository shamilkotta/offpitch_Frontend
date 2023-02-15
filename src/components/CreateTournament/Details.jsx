import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import InputFields, { InputTextArea } from "../InputFields/InputFields";
import cameraIcon from "../../assets/icons/camera.svg";

function Details({ values, handleChange, handleBlur, errors, touched }) {
  const ref = useRef();
  // const [file, setFile] = useState(null);
  const [photoURL, setPhotoURL] = useState("");
  // const [uploadProgress, setUploadProgress] = useState(0);
  const [showImgErr, setShowImgErr] = useState(false);

  const handleUploadImage = (e) => {
    const image = e.target.files[0];
    if (image) {
      setShowImgErr(false);
      // setFile(image);
      setPhotoURL(URL.createObjectURL(image));
    }
  };

  return (
    <div>
      <div className="w-[80vw] max-w-[700px] flex flex-col gap-y-2 !box-border">
        <div className="flex flex-col sm:flex-row">
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
            } relative sm:col-end-2 col-end-3 row-start-1 row-end-2 w-full mr-3 h-32 border-2 rounded`}
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
          <div className="mb-1 mt-2 w-full">
            <InputFields
              name="start_date"
              className="h-12"
              transform="mr-2 mb-2 w-full "
              holder="Starting date"
              value={values.start_date}
              onChange={handleChange}
              onBlur={handleBlur}
              errorMsg={
                errors.start_date && touched.start_date ? errors.start_date : ""
              }
              type="date"
            />

            <InputFields
              name="location"
              holder="Location"
              value={values.location}
              onChange={handleChange}
              onBlur={handleBlur}
              errorMsg={
                errors.location && touched.location ? errors.location : ""
              }
              className="h-12 w-full"
              transform="mb-3 min-[440px]:mb-0 w-full "
            />
          </div>
        </div>
        <InputFields
          holder="Title of tournament"
          name="title"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          errorMsg={errors.title && touched.title ? errors.title : ""}
          className="h-12"
          transform="w-full"
          maxLength="160"
        />
        <InputTextArea
          name="short_description"
          holder="Brief description"
          value={values.short_description}
          onChange={handleChange}
          onBlur={handleBlur}
          errorMsg={
            errors.short_description && touched.short_description
              ? errors.short_description
              : ""
          }
          rows="3"
        />

        <InputTextArea
          name="description"
          holder="About the tournament"
          rows={8}
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          errorMsg={
            errors.description && touched.description ? errors.description : ""
          }
        />
      </div>
    </div>
    // no of groups
    //
  );
}

Details.propTypes = {
  values: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
};

export default Details;
