import React from "react";
import { Routes, Route } from "react-router-dom";

import UserLayout from "../layouts/UserLayout";
import Home from "./Home/Home";
import Login from "./Login/Login";
import OtpConfirmation from "./OtpConfirmation/OtpConfirmation";
import Signup from "./Signup/Signup";
import Notfound from "./Notfound";
import UserAuthorization from "../components/Authorization/UserAuthorization";
import PersistLogin from "../components/PersistLogin";
import MyClub from "./Club/MyClub";
import NewTournament from "./Tournament/NewTournament";
import EditTournament from "./Tournament/EditTournament";
import ResetPassword from "./ResetPassword/ResetPassword";
import PublicTournament from "./Tournament/PublicTournament";
import AdminAuthorization from "../components/Authorization/AdminAuthorization";
import Clubs from "./Admin/Clubs";
import AdminLayout from "../layouts/AdminLayout";

function Router() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route path="/" element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<OtpConfirmation />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/tournament/:id" element={<PublicTournament />} />

          {/* user account */}
          <Route path="/user" element={<UserAuthorization />}>
            <Route path="/user" />
            <Route path="/user/club" element={<MyClub />} />
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
            <Route path="/admin/clubs" element={<Clubs />} />
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
