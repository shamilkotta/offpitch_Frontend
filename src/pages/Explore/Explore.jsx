import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Box,
  IconButton,
  Menu,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import TournamentCard from "../../components/Cards/TournamentCard";
import spinnerIcon from "../../assets/icons/spinner.svg";
import filterIcon from "../../assets/icons/filter.svg";
import arrowDownIcon from "../../assets/icons/arrow-down.svg";
import InputFields, {
  InputSubmit,
} from "../../components/InputFields/InputFields";
import { getTournaments } from "../../helpers/apis/guest";
import Carousel from "./Carousel";

function Explore() {
  const auth = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [anchorElFilter, setAnchorElFilter] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState("");
  const [newPage, setNewPage] = useState(false);

  const handleOpenFilterMenu = (event) => {
    setAnchorElFilter(event.currentTarget);
  };

  const handleCloseFilterMenu = () => {
    setAnchorElFilter(null);
  };

  const fetchData = (query) => {
    getTournaments(query)
      .then((res) => {
        if (res?.data?.success) {
          if (newPage)
            setData((prvs) => [...prvs, ...res.data.data.allTournaments]);
          else {
            setData(res.data?.data?.allTournaments);
            setCurrentPage(1);
          }
          const totalRec = res?.data?.data?.total || 1;
          const limit = res?.data?.data?.limit || 1;
          const totalpage = Math.ceil(totalRec / limit);
          setTotalPage(totalpage);
          setNewPage(false);
        }
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
        setLoadingMore(false);
      });
  };

  useEffect(() => {
    const query = `&limit=25&filter=${filter}&search=${search}`;
    fetchData(query);
  }, [filter]);

  useEffect(() => {
    if (currentPage > 1) {
      const query = `&limit=25&filter=${filter}&page=${currentPage}&search=${search}`;
      fetchData(query);
    }
  }, [currentPage]);

  // handling search
  useEffect(() => {
    if (search.length >= 2) {
      const query = `limit=25&filter=${filter}&search=${search}`;
      fetchData(query);
    } else if (search.length > 0) {
      const query = `limit=25&filter=${filter}`;
      fetchData(query);
    }
  }, [search]);

  return (
    <div className="flex flex-col py-10 px-5 sm:p-10 max-w-[1400px] bg-white mx-auto box-border">
      <div className="flex gap-x-2">
        <div className="border bg-slate-100 hidden md:flex gap-y-2 flex-col w-1/4 items-center justify-center rounded px-3 py-4">
          {auth?.name && <p className="font-medium">Hi {auth?.name},</p>}
          <p className="text-center -mt-1 text-base">
            {!auth?.name && (
              <>
                <span className="font-medium">Hi</span> <br />{" "}
              </>
            )}
            List your tournament here
          </p>
          <Link to="/user/tournament/new">
            <InputSubmit value="Get Start" className="h-8 text-sm" />
          </Link>
        </div>
        <div className="relative w-full rounded md:w-[75%] bg-slate-100 h-60">
          <Carousel />
        </div>
      </div>
      <div className="mt-8 flex justify-between flex-wrap">
        <div className="flex items-center gap-x-4">
          <div>
            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenFilterMenu} sx={{ p: 0 }}>
                <img
                  src={filterIcon}
                  alt="profile"
                  className="w-9 my-auto mx-auto"
                />
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElFilter}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElFilter)}
                onClose={handleCloseFilterMenu}
              >
                <div className="px-2">
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={filter}
                    onChange={(e) => {
                      setFilter(e.target.value);
                    }}
                  >
                    <FormControlLabel
                      value="all"
                      control={<Radio />}
                      label="All"
                    />
                    <FormControlLabel
                      value="active"
                      control={<Radio />}
                      label="Upcoming"
                    />
                    <FormControlLabel
                      value="live"
                      control={<Radio />}
                      label="Live"
                    />
                  </RadioGroup>
                </div>
              </Menu>
            </Box>
          </div>
          <InputFields
            holder="Search"
            name="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            transform="w-full"
          />
        </div>
      </div>
      <div className="relative">
        {loading ? (
          <div className="flex justify-center items-center h-[40vh]">
            <img
              src={spinnerIcon}
              className="w-9 animate-spin"
              alt="Loading..."
            />
          </div>
        ) : (
          <>
            <div className="mt-4 relative grid grid-cols-1 min-[580px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-auto gap-2">
              {data.map((ele) => (
                <TournamentCard data={ele} key={ele._id} />
              ))}
            </div>
            {totalPage > currentPage && (
              <div className="h-[100px] bg-gradient-to-t from-white  to-transparent flex justify-center items-end absolute  bottom-0 right-0 left-0">
                <button
                  type="button"
                  className={`bg-slate-200 disabled:bg-slate-100 disabled:text-gray-500 cursor-pointer w-fit flex items-center gap-x-3 px-4 py-1 rounded-full `}
                  disabled={loadingMore}
                  onClick={() => {
                    setNewPage(true);
                    setCurrentPage((prvs) => prvs + 1);
                    setLoadingMore(true);
                  }}
                >
                  <p>Load more</p>
                  {loadingMore ? (
                    <img
                      src={spinnerIcon}
                      alt="more"
                      className="w-5 animate-spin"
                    />
                  ) : (
                    <img src={arrowDownIcon} alt="more" className="w-5 h-5" />
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Explore;
