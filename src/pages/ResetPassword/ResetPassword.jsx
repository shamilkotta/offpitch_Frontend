import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";

import InputFields, {
  InputSubmit,
} from "../../components/InputFields/InputFields";
import { useErrorToast, useSuccessToast } from "../../hooks/useToast";
import { resetPassSchema } from "../../schema/auth";
import { resetPasswordApi } from "../../helpers/apis/auth";

function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },

    validationSchema: resetPassSchema,

    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      resetPasswordApi({ password: values.password, token })
        .then((res) => {
          resetForm({ values: "" });
          if (res.data.success) {
            useSuccessToast({ message: res.data.message });
            navigate("/login", { replace: true });
          } else useErrorToast({ message: res.data.message });
        })
        .catch((err) => {
          useErrorToast({
            message: err?.response?.data?.message || "Something went wrong",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  return (
    <div className="w-full">
      <div className="py-10 px-5 sm:p-10 max-w-[1500px] mx-auto box-border">
        <div className="flex justify-center px-2 sm:px-4 md:px-2 my-12">
          <div className="w-[90vw] sm:w-[50vw] max-w-[500px] flex justify-center h-full rounded-lg shadow-lg box-border">
            <div className="w-full bg-white py-5 px-8 lg:px-10 rounded-lg lg:rounded-l-none mx-auto box-border">
              <h3 className="pt-4 text-2xl font-bold text-center">
                Reset your password
              </h3>
              <p className="text-center mb-6">Enter your new password</p>
              <InputFields
                name="password"
                type="password"
                holder="Password"
                className="h-12"
                transform="mb-3 max-w-[700px]"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMsg={
                  formik.errors.password && formik.touched.password
                    ? formik.errors.password
                    : ""
                }
              />
              <InputFields
                name="confirm_password"
                type="password"
                holder="Confirm password"
                className="h-12"
                transform="mb-3"
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMsg={
                  formik.errors.confirm_password &&
                  formik.touched.confirm_password
                    ? formik.errors.confirm_password
                    : ""
                }
              />
              <InputSubmit
                type="button"
                className="mb-5"
                value="Update password"
                loadingValue={loading ? "Updating..." : ""}
                onClick={formik.handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
