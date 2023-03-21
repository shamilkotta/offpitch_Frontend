import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import UserLayout from "../layouts/UserLayout";
import Home from "./Home/Home";
import Login from "./Login/Login";
import OtpConfirmation from "./OtpConfirmation/OtpConfirmation";
import Signup from "./Signup/Signup";
import Notfound from "./Notfound";
import UserAuthorization from "../components/Authorization/UserAuthorization";
import PersistLogin from "../components/PersistLogin";
import MyClub from "./User/MyClub";
import NewTournament from "./Tournament/NewTournament";
import EditTournament from "./Tournament/EditTournament";
import ResetPassword from "./ResetPassword/ResetPassword";
import PublicTournament from "./Tournament/PublicTournament";
import AdminAuthorization from "../components/Authorization/AdminAuthorization";
import Clubs from "./Admin/Clubs";
import AdminLayout from "../layouts/AdminLayout";
import Users from "./Admin/Users";
import Explore from "./Explore/Explore";
import AdminLogin from "./Login/AdminLogin";
import Profile from "./User/Profile";
import PrivateClub from "../components/Club/PrivateClub";
import Tournaments from "../components/Club/Tournaments";
import Watchlist from "./User/Watchlist";
import Transactions from "./Admin/Transactions";
import Dashboard from "./Admin/Dashboard";

function Router() {
  const location = useLocation();
  useEffect(
    () => () => {
      window.scrollTo(0, 0);
    },
    [location.pathname]
  );

  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route path="/" element={<UserLayout />}>
          <Route path="/" element={<Home />} />

          {/* auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<OtpConfirmation />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path="/tournament/:id" element={<PublicTournament />} />
          <Route path="/explore" element={<Explore />} />

          {/* user account */}
          <Route path="/user" element={<UserAuthorization />}>
            <Route path="/user" element={<Profile />} />
            <Route path="/user/club" element={<MyClub />}>
              <Route path="/user/club" element={<PrivateClub />} />
              <Route path="/user/club/tournaments" element={<Tournaments />} />
            </Route>
            <Route path="/user/watchlist" element={<Watchlist />} />
            <Route path="/user/tournament/new" element={<NewTournament />} />
            <Route
              path="/user/tournament/:id/edit"
              element={<EditTournament />}
            />
          </Route>
        </Route>

        {/* admin account */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminAuthorization />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/clubs" element={<Clubs />} />
            <Route path="/admin/transactions" element={<Transactions />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route element={<UserLayout />}>
          <Route path="*" element={<Notfound />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default Router;
