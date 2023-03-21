import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import RightDrawer from "../Drawer/RightDrawer";
import { InputSubmit } from "../InputFields/InputFields";
import { useErrorToast, useSuccessToast } from "../../hooks/useToast";

function UpdateRegistration({
  close,
  data,
  setIsRegistered,
  isCancel,
  openState,
}) {
  const axios = useAxiosPrivate();
  const [submitting, setSubmitting] = useState(false);
  const [order, setOrder] = useState({ amount: "", id: "" });
  const [cancel, setCancel] = useState(false);

  // adding razorpay script to body
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const saveData = ({ amount, orderId }) => {
    const options = {
      key: "rzp_test_yrNP9XZJenorHu",
      amount: amount * 100,
      currency: "INR",
      name: "offpitch",
      description: "Fee payment",
      image: "/logo-sm.svg",
      order_id: orderId,
      handler(response) {
        // on successfull saving data
        axios
          .post(`/user/tournament/${data._id}/fee`, { ...response })
          .then(() => {
            setIsRegistered({ id: data._id, status: true });
            useSuccessToast({
              message: "Registered successfully",
            });
            setOrder({ amount: "", id: "" });
            close();
          })
          .catch(() => {
            useErrorToast({
              message: "Something went wrong, contact support center",
            });
            setOrder({ amount: "", id: "" });
            close();
          })
          .finally(() => {
            setSubmitting(false);
          });
      },
      theme: {
        color: "#F2811D",
      },
    };
    // eslint-disable-next-line no-undef
    const rzp = new Razorpay(options);
    rzp.open();
    rzp.on("payment.failed", () => {
      setSubmitting(false);
    });
  };

  const handleCancel = () => {
    setCancel(true);

    axios
      .delete(`/user/tournament/${data._id}/cancel`)
      .then((res) => {
        if (res?.data?.success) {
          useSuccessToast({ message: "Registration canceled" });
          isCancel({ id: data._id, status: true });
          setOrder({ amount: "", id: "" });
          close();
        } else {
          useErrorToast({
            message: res?.data?.message || "Something went wrong",
          });
        }
      })
      .catch((err) => {
        useErrorToast({
          message: err?.response?.data?.message || "Something went wrong",
        });
      })
      .finally(() => {
        setCancel(false);
      });
  };

  const handleSubmit = async () => {
    setSubmitting(true);

    try {
      if (order?.id) saveData({ amount: order.amount, orderId: order.id });
      else {
        // generate invoice
        const res = await axios.post(
          `/user/tournament/${data._id}/register-update`
        );

        if (res.data?.success && res.data?.data?.amount > 0) {
          setOrder({
            amount: res.data?.data.amount,
            id: res.data?.data.order_id,
          });
          saveData({
            amount: res.data?.data?.amount,
            orderId: res.data?.data.order_id,
          });
        } else {
          setIsRegistered({ id: data._id, status: true });
          useSuccessToast({
            message: "Registered successfully",
          });
          setOrder({ amount: "", id: "" });
          setSubmitting(false);
          close();
        }
      }
    } catch (err) {
      if (err?.response?.data?.message === "Partial completion") {
        setIsRegistered({ id: data._id, status: true });
        useErrorToast({
          message: "Something went wrong, try again",
        });
        setOrder({ amount: "", id: "" });
        close();
      } else
        useErrorToast({
          message:
            err?.response?.data?.message || "Something went wrong, try again",
        });
      setSubmitting(false);
    }
  };

  return (
    <RightDrawer
      openState={openState}
      close={() => {
        setOrder({ amount: "", id: "" });
        setSubmitting(false);
        close();
      }}
    >
      <div className="w-[80vw] min-[450px]:w-[400px]">
        <div>
          <h1 className="font-medium text-xl">Complete Registration</h1>
          <p className="text-gray-500">{data?.title}</p>
          <div className="flex items-center justify-between my-3">
            <div className="">
              <p className="text-gray-500">
                Last date :{" "}
                <span className="text-base text-black">
                  {data?.registration?.last_date}
                </span>
              </p>
            </div>
          </div>
          <hr />
          <div className="flex gap-x-2 justify-end mt-5">
            <button
              type="button"
              onClick={handleCancel}
              className="h-9 border border-red-600 rounded px-2 text-red-600 hover:bg-red-600 hover:text-white"
              disabled={submitting || cancel}
            >
              Cancel Registration
            </button>
            <InputSubmit
              value={`₹${data?.registration?.fee?.amount} Continue`}
              loadingValue={
                submitting ? `₹${data?.registration?.fee?.amount} Continue` : ""
              }
              onClick={handleSubmit}
              className="h-9 "
            />
          </div>
        </div>
      </div>
    </RightDrawer>
  );
}

UpdateRegistration.propTypes = {
  close: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  setIsRegistered: PropTypes.func.isRequired,
  openState: PropTypes.bool.isRequired,
  isCancel: PropTypes.func.isRequired,
};

export default UpdateRegistration;
