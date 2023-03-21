import React, { useRef } from "react";
import PropTypes from "prop-types";

import InputFields, { CssTextField } from "../InputFields/InputFields";
import cameraIcon from "../../assets/icons/camera.svg";

function Details({
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
  setFieldValue,
}) {
  const ref = useRef();
  // const [uploadProgress, setUploadProgress] = useState(0);

  const handleUploadImage = (e) => {
    const image = e.target.files[0];
    if (image) {
      setFieldValue("cover.file", image);
      setFieldValue("cover.url", URL.createObjectURL(image));
    }
  };

  return (
    <div>
      <div className="w-[80vw] max-w-[700px] flex flex-col gap-y-2 !box-border">
        <div className="flex flex-col sm:flex-row">
          <input
            type="file"
            name="cover.url"
            ref={ref}
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleUploadImage}
            onBlur={handleBlur}
          />
          <button
            type="button"
            onClick={() => {
              ref.current.click();
            }}
            className={`col-start-1 ${
              errors.cover?.url &&
              touched.cover?.url &&
              "border-red-700 border-2"
            } relative sm:col-end-2 col-end-3 row-start-1 row-end-2 w-full mr-3 h-32 border-2 rounded`}
          >
            <div
              className="relative w-full h-full rounded flex justify-center items-center after:content-[''] after:bg-black/10 hover:after:bg-black/30 after:absolute after:top-0 after:bottom-0 after:right-0 after:left-0"
              style={{
                backgroundImage: `url('${values.cover?.url}')`,
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
            <div className="w-full mr-2 mb-2">
              <p className="text-slate-500 sm:-mt-3 text-sm">Starting date</p>
              <InputFields
                name="start_date"
                className="h-12"
                holder="Starting date"
                value={values.start_date}
                onChange={handleChange}
                onBlur={handleBlur}
                errorMsg={
                  errors.start_date && touched.start_date
                    ? errors.start_date
                    : ""
                }
                type="date"
              />
            </div>

            <CssTextField
              error={errors.location && touched.location}
              sx={{ marginTop: "8px" }}
              fullWidth
              name="location"
              label="Location"
              value={values.location}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={
                errors.location && touched.location ? errors.location : ""
              }
            />
          </div>
        </div>
        <CssTextField
          error={errors.title && touched.title}
          sx={{ marginTop: "8px" }}
          label="Title of tournament"
          name="title"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={errors.title && touched.title ? errors.title : ""}
        />
        <CssTextField
          error={errors.short_description && touched.short_description}
          sx={{ marginTop: "8px" }}
          name="short_description"
          label="Brief description"
          value={values.short_description}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={
            errors.short_description && touched.short_description
              ? errors.short_description
              : ""
          }
          multiline
          row={3}
        />
        <CssTextField
          error={errors.description && touched.description}
          sx={{ marginTop: "8px" }}
          name="description"
          label="About the tournament"
          rows={8}
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={
            errors.description && touched.description ? errors.description : ""
          }
          multiline
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
  setFieldValue: PropTypes.func.isRequired,
};

export default Details;
