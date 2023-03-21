/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { InputSubmit } from "../InputFields/InputFields";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useErrorToast } from "../../hooks/useToast";
import InputCheckBox from "../InputFields/InputCheckBox";
import spinnerIcon from "../../assets/icons/spinner.svg";
import RightDrawer from "../Drawer/RightDrawer";

function RegisterForm({
  close,
  data,
  setIsRegistered,
  showMessage,
  openState,
}) {
  const [players, setPlayers] = useState([]);
  const auth = useSelector((state) => state.auth);
  const axios = useAxiosPrivate();
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [error, setError] = useState("");
  const [acceptTC, setAcceptTC] = useState(false);
  const [fetchingPlayers, setFetchingPlayers] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [order, setOrder] = useState({ amount: "", id: "" });
  const [haveClub, setHaveClub] = useState(
    auth?.club && auth?.clubStatus === "active"
  );

  const handlePlayerSelect = (id) => {
    setError("");
    if (selectedPlayers.includes(id))
      setSelectedPlayers((prvs) => prvs.filter((pl) => pl !== id));
    else setSelectedPlayers((prvs) => [...prvs, id]);
  };

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
            setIsRegistered(true);
            showMessage({
              type: "success",
              message: "Registered successfully",
            });
            close();
          })
          .catch(() => {
            showMessage({
              type: "error",
              message: "Something went wrong, contact support center",
            });
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
  };

  const handleSubmit = async () => {
    if (selectedPlayers.length < data?.min_no_players)
      setError(`Minimum ${data?.min_no_players} players required`);
    else if (selectedPlayers > data?.max_no_players)
      setError(`Can only have maximum of ${data?.max_no_players} players`);
    else {
      setSubmitting(true);

      try {
        if (order?.id) saveData({ amount: order.amount, orderId: order.id });
        else {
          // generate invoice
          const res = await axios.post(
            `/user/tournament/${data._id}/register`,
            {
              players: selectedPlayers,
            }
          );

          if (res.data?.success && res.data?.data?.amount > 0) {
            setIsRegistered(true);
            setOrder({
              amount: res.data?.data.amount,
              id: res.data?.data.order_id,
            });
            saveData({
              amount: res.data?.data?.amount,
              orderId: res.data?.data.order_id,
            });
          } else {
            setIsRegistered(true);
            showMessage({
              type: "success",
              message: "Registered successfully",
            });
            close();
          }
        }
      } catch (err) {
        if (err?.response?.data?.message === "Partial completion") {
          setIsRegistered(true);
          showMessage({
            type: "error",
            message:
              "Something went wrong, complete the process form your profile",
          });
          close();
        } else
          useErrorToast({
            message:
              err?.response?.data?.message || "Something went wrong, try again",
          });
        setSubmitting(false);
      }
    }
  };

  const fetchPlayers = async () => {
    try {
      const result = await axios.get("/user/players");
      if (result.data?.success) {
        setPlayers(result.data.data);
      } else {
        setHaveClub(false);
      }
    } catch (err) {
      close();
    } finally {
      setFetchingPlayers(false);
    }
  };

  useEffect(() => {
    setFetchingPlayers(true);
    fetchPlayers();
  }, []);

  return (
    <RightDrawer
      openState={openState}
      close={() => {
        if (order?.id) {
          showMessage({
            type: "success",
            message: "You can complete payment in your profile",
          });
          close();
        } else close();
      }}
    >
      <div className="w-[80vw] min-[450px]:w-[400px]">
        {haveClub ? (
          <div>
            <h1 className="font-medium text-xl">Register for Tournament</h1>
            <p className="text-gray-500">{data?.title}</p>
            <div className="flex items-center justify-between my-3">
              <div className="">
                <p className="text-gray-500">
                  Last date :{" "}
                  <span className="text-base text-black">
                    {data?.registration?.last_date}
                  </span>
                </p>
                <p className="text-gray-500">
                  Fee : ₹
                  <span className="text-base text-black">
                    {data?.registration?.fee?.amount}
                  </span>
                </p>
              </div>
              <div className="">
                <p className="text-gray-500">
                  Minimum players:{" "}
                  <span className="text-base text-black">
                    {data?.min_no_players}
                  </span>
                </p>
                <p className="text-gray-500">
                  Maximum players:{" "}
                  <span className="text-base text-black">
                    {data?.max_no_players}
                  </span>
                </p>
              </div>
            </div>
            <div className="my-5">
              <h1 className="text-lg">Insturctions</h1>
              <p className="text-gray-600">{data?.instruction}</p>
            </div>
            <hr />
            <div className="mt-6">
              <div className="my-3 flex justify-between">
                <h1>Select players</h1>
                <h1 className="text-gray-500">
                  Selected: <span>{selectedPlayers.length}</span>
                </h1>
              </div>
              {fetchingPlayers ? (
                <div className="flex justify-center items-center">
                  <img
                    src={spinnerIcon}
                    alt="loading..."
                    className="animate-spin w-8"
                  />
                </div>
              ) : (
                <div className="overflow-x-auto flex gap-x-2 hide-scroll">
                  {players?.map((ele) => (
                    <div
                      key={ele._id}
                      className="w-52 min-w-[100px] h-40 px-1 rounded border-black shadow border relative bg-center bg-cover bg-no-repeat flex flex-col justify-between after:content-[''] after:bg-gradient-to-t after:from-black after:via-transparent after:to-transparent after:absolute after:top-0 after:bottom-0 after:right-0 after:left-0"
                      style={{
                        backgroundImage: `url('${ele.profile}')`,
                      }}
                    >
                      <div className="z-10 relative cursor-pointer player-select">
                        <input
                          name="players"
                          className="z-10 absolute cursor-pointer w-5 h-5 top-1 left-0 opacity-0"
                          type="checkbox"
                          onChange={() => {
                            handlePlayerSelect(ele._id);
                          }}
                          id={ele._id}
                          checked={selectedPlayers.includes(ele._id)}
                        />
                        <span className="w-5 h-5 absolute border-2 rounded top-1 left-0 cursor-pointer checkmark" />
                      </div>
                      <div className="z-10 min-w-52 text-white mb-2">
                        <h2 className=" font-bold leading-4">{ele.name}</h2>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <p className="text-red-700">{error}</p>
            <InputCheckBox
              id="t&c"
              name="t&c"
              checked={acceptTC}
              onChange={(e) => {
                setAcceptTC(e.target.checked);
              }}
              label="I have read and agree to the all the terms and conditions mentioned above"
              className="text-balck mt-5"
            />
            <div className="flex mt-5 justify-between">
              <InputSubmit
                value="Register"
                loadingValue={submitting ? "Register" : ""}
                onClick={handleSubmit}
                className="h-9 ml-auto mr-0"
                disabled={!acceptTC}
              />
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center flex-wrap">
            <h1>You don&apos;t have a club, &nbsp;</h1>
            <Link to="/user/club" className="text-primary">
              {" "}
              Create new
            </Link>
          </div>
        )}
      </div>
    </RightDrawer>
  );
}

RegisterForm.propTypes = {
  close: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  setIsRegistered: PropTypes.func.isRequired,
  showMessage: PropTypes.func.isRequired,
  openState: PropTypes.bool.isRequired,
};

export default RegisterForm;
