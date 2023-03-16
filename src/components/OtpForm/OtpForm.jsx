import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import InputFields, { InputSubmit } from "../InputFields/InputFields";
import otpSchema from "../../schema/otp";
import { resendOtpApi, verifyEmailApi } from "../../helpers/apis/auth";
import { setAuth } from "../../app/slices/authSlice";
import { useErrorToast, useSuccessToast } from "../../hooks/useToast";

function OtpForm() {
  const fields = ["otp1", "otp2", "otp3", "otp4", "otp5", "otp6"];
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const confirmToken = location.state?.confirmToken;
  const from = location.state?.from;
  const Ref = useRef(null);
  const [timer, setTimer] = useState("01:30");
  const [showResendBt, setShowResendBt] = useState(false);
  const [token, setToken] = useState(confirmToken);

  const getDeadTime = () => {
    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 90);
    return deadline;
  };

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
      total,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    const { total, minutes, seconds } = getTimeRemaining(e);
    if (total === 0) setShowResendBt(true);
    else if (total >= 0 && showResendBt) setShowResendBt(false);
    if (total >= 0) {
      setTimer(
        `${minutes > 9 ? minutes : `0${minutes}`}:${
          seconds > 9 ? seconds : `0${seconds}`
        }`
      );
    }
  };

  const clearTimer = (e) => {
    setTimer("01:30");
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const handleResendOtp = () => {
    clearTimer(getDeadTime());
    resendOtpApi({ token })
      .then((res) => {
        if (res.data.success) {
          useSuccessToast({ message: res.data?.message });
          navigate(".", {
            replace: true,
            state: { confirmToken: res.data.data.confirmToken, from },
          });
          setToken(res.data.data.confirmToken);
        } else
          useErrorToast({
            message: res.data.message || "Something went wrong",
          });
      })
      .catch((err) => {
        useErrorToast({
          message: err?.response?.data?.message || "Something went wrong",
        });
      });
  };

  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  const formik = useFormik({
    initialValues: {
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
      otp5: "",
      otp6: "",
    },

    validationSchema: otpSchema,

    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      const otp = Object.values(values).join("");
      verifyEmailApi({ otp, token })
        .then((res) => {
          resetForm({ values: "" });
          if (res.data.success) {
            dispatch(setAuth(res.data.data)); // set to state
            navigate(location.state?.from || "/", {
              replace: true,
              state: {
                confirmToken: "",
              },
            }); // navigate to home
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
    <form className="w-72 mx-auto">
      <div className="flex gap-x-1 w-full mb-5">
        {fields.map((ele) => (
          <InputFields
            key={ele}
            name={ele}
            type="number"
            holder=""
            maxLength="1"
            value={formik.values[ele]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors[ele] && formik.touched[ele]}
          />
        ))}
      </div>
      <InputSubmit
        className="w-full"
        value="Verify"
        loadingValue={loading ? "Submit" : ""}
        onClick={formik.handleSubmit}
      />
      {!showResendBt ? (
        <p className="my-5 text-center">{timer}</p>
      ) : (
        <p
          className="my-5 cursor-pointer hover:text-primary text-center"
          onClick={handleResendOtp}
        >
          Resend otp
        </p>
      )}
    </form>
  );
}

export default OtpForm;
