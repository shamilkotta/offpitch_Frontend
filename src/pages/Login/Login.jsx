import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import InputFields, {
  InputSubmit,
} from "../../components/InputFields/InputFields";
import { loginSchema } from "../../schema/auth";

import loginImg from "../../assets/img/login.svg";
import googleIcon from "../../assets/icons/google.svg";

function Login() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: loginSchema,

    onSubmit: () => {
      // console.log(values);
    },
  });

  return (
    <>
      <Navbar />
      <div className="w-full">
        <div className="py-10 px-5 sm:p-10 max-w-[1500px] mx-auto box-border">
          <div className="flex justify-center px-2 sm:px-4 md:px-2 my-12">
            <div className="w-full xl:w-2/3 lg:w-3/4 flex h-full rounded-lg shadow-lg">
              <div className="w-full sm:w-11/12 md:w-3/5 bg-white py-5 px-2 lg:px-5 rounded-lg lg:rounded-l-none mx-auto">
                <h3 className="pt-4 text-2xl font-bold text-center">
                  Hi, Welcome back
                </h3>
                <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                  <div className="mb-4">
                    <InputFields
                      holder="Email"
                      name="email"
                      type="email"
                      className="h-11"
                      autoFocus
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
                      className="h-11"
                      onBlur={formik.handleBlur}
                      errorMsg={
                        formik.errors.password && formik.touched.password
                          ? formik.errors.password
                          : ""
                      }
                    />
                    <p className="text-base my-4 font-normal">
                      Forgot password?{" "}
                      <Link to="/password-reset">
                        <span className="text-primary cursor-pointer">
                          reset now
                        </span>
                      </Link>
                    </p>
                  </div>

                  <div className="mb-6 text-center">
                    <InputSubmit onClick={formik.handleSubmit} />
                    <p className="text-base mt-8 font-normal">
                      Don&apos;t have an account?{" "}
                      <Link to="/signup">
                        <span className="text-primary cursor-pointer">
                          Sign up
                        </span>
                      </Link>
                    </p>
                  </div>
                  <div className="relative">
                    <span className="absolute bg-white px-2 py-1 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      OR
                    </span>
                    <hr className="mb-6 border-t" />
                  </div>
                  <div className="text-center">
                    <button
                      type="button"
                      className="flex items-center justify-center text-sm font-medium border hover:bg-gray-100 py-2 px-3 rounded w-full"
                    >
                      <img
                        src={googleIcon}
                        width="30"
                        height="30"
                        alt="sign in with google"
                      />
                      <span>Sign in with Google</span>
                    </button>
                  </div>
                </form>
              </div>
              <div
                className="w-full h-auto bg-text hidden md:block md:w-2/5 bg-contain bg-center bg-no-repeat rounded-l-lg bg-white"
                style={{ backgroundImage: `url('${loginImg}')` }}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;