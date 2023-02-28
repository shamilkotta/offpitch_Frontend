import React, { useState } from "react";
import { useFormik } from "formik";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import InputFields, {
  InputSubmit,
} from "../../components/InputFields/InputFields";
import { loginSchema } from "../../schema/auth";
import loginImg from "../../assets/img/admin_login.svg";
import { adminLoginApi } from "../../helpers/apis/auth";
import { useErrorToast } from "../../hooks/useToast";
import { setAuth } from "../../app/slices/authSlice";

function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: loginSchema,

    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      adminLoginApi(values)
        .then((res) => {
          resetForm({ values: "" });
          if (res.data.success) {
            dispatch(setAuth(res.data.data)); // set to state
            navigate(location.state?.from || "/", { replace: true }); // navigate to home
          } else if (res.data.message === "Email verification is pending") {
            navigate("/verify-email", {
              replace: true,
              state: {
                from: location.state?.from || "/",
                confirmToken: res.data?.data?.confirmToken,
              },
            });
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

  return auth?.accessToken ? (
    <Navigate to={location.state?.from || "/"} replace />
  ) : (
    <div className="w-full">
      <div className="py-10 px-5 sm:p-10 max-w-[1500px] mx-auto box-border">
        <div className="flex justify-center px-2 sm:px-4 md:px-2 my-12">
          <div className="w-full xl:w-2/3 lg:w-3/4 flex h-[450px] rounded-lg px-2 shadow-lg border">
            <div
              className="w-full h-auto bg-text hidden md:block md:w-1/3 bg-contain bg-center bg-no-repeat rounded-l-lg bg-white"
              style={{ backgroundImage: `url('${loginImg}')` }}
            />
            <div className="w-full sm:w-11/12 md:w-3/5 bg-white py-5 px-2 lg:px-5 my-auto rounded-lg lg:rounded-l-none mx-auto">
              <h3 className="pt-4 text-2xl font-bold text-center">
                Hi, Welcome back
              </h3>
              <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                <div className="mb-4">
                  <InputFields
                    holder="Email"
                    name="email"
                    type="email"
                    className="h-12"
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
                <div className="mb-4">
                  <InputFields
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    holder="Password"
                    type="password"
                    className="h-12"
                    onBlur={formik.handleBlur}
                    errorMsg={
                      formik.errors.password && formik.touched.password
                        ? formik.errors.password
                        : ""
                    }
                  />
                </div>

                <div className="my-6 text-center">
                  <InputSubmit
                    className="w-full"
                    loadingValue={loading ? "Submit" : ""}
                    onClick={formik.handleSubmit}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
