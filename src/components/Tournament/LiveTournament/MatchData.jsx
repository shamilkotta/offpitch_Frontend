import React, { useState } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as yup from "yup";

import RightDrawer from "../../Drawer/RightDrawer";
import { CssTextField } from "../../InputFields/InputFields";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useErrorToast } from "../../../hooks/useToast";

function MatchData({ close, data, openState, isHost, tournamentId }) {
  const [updatingResult, setUpdatingResult] = useState(false);
  const axios = useAxiosPrivate();

  const shortName = (name) => {
    const words = name.split(" ");
    let shrt = "";
    for (let i = 0; i < words.length; i += 1) {
      shrt += words[i][0];
    }

    return shrt;
  };

  const formik = useFormik({
    initialValues: { teamA: 0, teamB: 0 },

    validationSchema: yup.object().shape({
      teamA: yup.number().typeError(" ").required(" ").min(0, " "),
      teamB: yup.number().typeError(" ").required(" ").min(0, " "),
    }),

    onSubmit: (values) => {
      setUpdatingResult(true);

      const matchResult = {
        ...values,
        match_no: data?.match?.match_no,
        round_no: data?.round?.round_no,
      };

      axios
        .post(`/user/tournament/${tournamentId}/result`, matchResult)
        .then((res) => {
          if (res.data.success) {
            close();
          } else {
            useErrorToast({
              message: res.data.message || "Something went wrong",
            });
          }
        })
        .catch((err) => {
          useErrorToast({
            message: err.response.data.message || "Something went wrong",
          });
        })
        .finally(() => {
          setUpdatingResult(false);
        });
    },
  });

  return (
    <RightDrawer
      openState={openState}
      close={() => {
        close();
      }}
    >
      <div className="w-[80vw] min-[450px]:w-[400px]">
        <h1 className="text-slate-500 font-medium">
          Match {parseInt(data?.match?.match_no, 10) + 1} /{" "}
          {data?.round?.round_name}
        </h1>
        <div className="shadow px-3 py-2 rounded-md my-1">
          <div className="flex justify-between mb-2 items-center">
            <div className="flex flex-col gap-y-3 min-[400px]:w-[150px] items-start">
              <div className="flex gap-x-2 items-center">
                <img
                  src={
                    data?.match?.teamA?.profile ||
                    "https://www.gstatic.com/onebox/sports/logos/crest_48dp.png"
                  }
                  className="w-8 h-8 rounded-full"
                  alt=".."
                />
                <h1 className="text-left">
                  {data?.match?.teamA?.name ? (
                    shortName(data?.match?.teamA.name)
                  ) : (
                    <span className="text-slate-500">Team A</span>
                  )}
                </h1>
              </div>

              {data?.match?.teamA?.goals < 0 && isHost ? (
                <CssTextField
                  sx={{ width: "100px" }}
                  type="number"
                  name="teamA"
                  hiddenLabel
                  error={formik?.errors?.teamA && formik?.touched?.teamA}
                  value={formik?.values?.teamA}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  size="small"
                />
              ) : (
                ""
              )}
            </div>
            <div className="flex gap-x-2">
              {data?.match?.teamA?.goals >= 0 ? (
                <h1 className="text-lg font-medium">
                  {data?.match?.teamA?.goals >= 0
                    ? data?.match?.teamA?.goals
                    : ""}
                </h1>
              ) : (
                ""
              )}
              <h1 className="text-slate-400 font-medium">-</h1>
              {data?.match?.teamB?.goals >= 0 ? (
                <h1 className="text-lg font-medium">
                  {data?.match?.teamB?.goals >= 0
                    ? data?.match?.teamB?.goals
                    : ""}
                </h1>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col gap-y-3 min-[400px]:w-[150px] items-end">
              <div className="flex gap-x-2 items-center">
                <h1 className="text-right">
                  {data?.match?.teamB?.name ? (
                    shortName(data?.match?.teamB.name)
                  ) : (
                    <span className="text-slate-500">Team B</span>
                  )}
                </h1>
                <img
                  src={
                    data?.match?.teamB?.profile ||
                    "https://www.gstatic.com/onebox/sports/logos/crest_48dp.png"
                  }
                  className="w-7 h-7 rounded-full"
                  alt=".."
                />
              </div>
              {data?.match?.teamB?.goals < 0 && isHost ? (
                <CssTextField
                  sx={{ width: "100px", marginLeft: "auto", marginRight: 0 }}
                  type="number"
                  name="teamB"
                  error={formik?.errors?.teamB && formik?.touched?.teamB}
                  value={formik?.values?.teamB}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  hiddenLabel
                  size="small"
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="mt-3 flex">
            {data?.match?.teamA?.goals < 0 && isHost ? (
              <button
                type="button"
                className="border-2 ml-auto mr-0 border-green-800 px-3 py-1 text-sm text-green-800 rounded"
                onClick={formik.handleSubmit}
                disabled={updatingResult}
              >
                Update
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </RightDrawer>
  );
}

MatchData.propTypes = {
  close: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  openState: PropTypes.bool.isRequired,
  isHost: PropTypes.bool.isRequired,
  tournamentId: PropTypes.string.isRequired,
};

export default MatchData;
