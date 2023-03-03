/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Modal from "../Modal/Modal";
import { InputSubmit } from "../InputFields/InputFields";
import useAxiosPrivate from "../../hooks/userAxiosPrivate";
import { useErrorToast, useSuccessToast } from "../../hooks/useToast";
import InputCheckBox from "../InputFields/InputCheckBox";
import spinnerIcon from "../../assets/icons/spinner.svg";

function RegisterForm({ close, data, setIsRegistered }) {
  const [players, setPlayers] = useState([]);
  const auth = useSelector((state) => state.auth);
  const axios = useAxiosPrivate();
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [acceptTC, setAcceptTC] = useState(false);
  const [fetchingPlayers, setFetchingPlayers] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [haveClub, setHaveClub] = useState(
    auth?.club && auth?.clubStatus === "active"
  );

  const handlePlayerSelect = (id) => {
    setError("");
    if (selectedPlayers.includes(id))
      setSelectedPlayers((prvs) => prvs.filter((pl) => pl !== id));
    else setSelectedPlayers((prvs) => [...prvs, id]);
  };

  const handleConitnue = () => {
    if (selectedPlayers.length < data?.min_no_players)
      setError(`Minimum ${data?.min_no_players} players required`);
    else if (selectedPlayers > data?.max_no_players)
      setError(`Can only have maximum of ${data?.min_no_players} players`);
    else setStep(2);
  };

  const handleSubmit = () => {
    setSubmitting(true);
    axios
      .post(`/user/tournament/${data._id}/register`, {
        players: selectedPlayers,
      })
      .then((res) => {
        if (res?.data?.success) useSuccessToast({ message: res?.dat?.message });
        setIsRegistered(true);
        close();
      })
      .catch((err) => {
        useErrorToast({
          message: err?.response?.data?.message || "Something went wrong",
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
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
      useErrorToast({
        message: err?.response?.data.message || "Something went wrong",
      });
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
    <Modal closeOnOutSide closeModal={close}>
      <div className=" w-[80vw] sm:w-[600px]">
        {haveClub ? (
          step === 1 ? (
            <div>
              <p className="text-gray-500">{data?.title}</p>
              <h1 className="font-medium text-xl">Register for Tournament</h1>
              <div className="flex items-center justify-between my-3">
                <div className="">
                  <p className="text-gray-500">
                    Last date :{" "}
                    <span className="text-base text-black">
                      {data?.registration_date}
                    </span>
                  </p>
                </div>
                <div className="">
                  <p className="text-gray-500">
                    Fee : ₹
                    <span className="text-base text-black">
                      {data?.registration_fee?.amount}
                    </span>
                  </p>
                </div>
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
              <div className="flex mt-5 justify-between">
                <InputSubmit
                  value="Continue"
                  onClick={handleConitnue}
                  className="h-9 ml-auto mr-0"
                />
              </div>
            </div>
          ) : (
            <div className="mt-5">
              <h1 className="text-lg">Insturctions</h1>
              <p className="text-gray-600">{data?.instruction}</p>

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
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                  }}
                  className="bg-white text-primary"
                >
                  Back
                </button>
                <InputSubmit
                  value="Register"
                  loadingValue={submitting ? "Register" : ""}
                  onClick={handleSubmit}
                  className="h-9 ml-auto mr-0"
                  disabled={!acceptTC}
                />
              </div>
            </div>
          )
        ) : (
          <div className="flex justify-center items-center flex-wrap">
            <h1>You don&apose;t have a club, </h1>
            <Link to="/user/club" className="text-primary">
              {" "}
              Create new
            </Link>
          </div>
        )}
      </div>
    </Modal>
  );
}

RegisterForm.propTypes = {
  close: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  setIsRegistered: PropTypes.func.isRequired,
};

export default RegisterForm;
