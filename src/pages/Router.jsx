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
import MyOrganization from "./Organization/MyOrganization";
import MyClub from "./Club/MyClub";
import NewTournament from "./Tournament/NewTournament";

function Router() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route path="/" element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<OtpConfirmation />} />
          <Route path="/user" element={<UserAuthorization />}>
            <Route path="/user/profile" />
            <Route path="/user/organization" element={<MyOrganization />} />
            <Route path="/user/club" element={<MyClub />} />
            <Route path="/user/tournament/new" element={<NewTournament />} />
          </Route>

          <Route path="/admin" />

          {/* 404 */}
          <Route path="*" element={<Notfound />} />
        </Route>
      </Route>
      <Route path="/admin" />
    </Routes>
  );
}

export default Router;
