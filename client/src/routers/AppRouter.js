import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Provider from "../context/context";
import "../styles/index.css";
import NotLoggedRoute from "./NotLoggedRoute";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import HomePage from "../pages/HomePage";
import SignupPage from "../pages/SignupPage";
import UsersPage from "../pages/UsersPage";
import VerifiedMailPage from "../pages/VerifiedMailPage";
import Footer from "../components/Footer";

const AppRouter = () => {
  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route exact path="/profile" element={<ProfilePage />} />
            <Route exact path="/home" element={<HomePage />} />
            <Route exact path="/users" element={<UsersPage />} />
          </Route>
          <Route element={<NotLoggedRoute />}>
            <Route index element={<LoginPage />} />
            <Route exact path="/signup" element={<SignupPage />} />
          </Route>
          <Route
            exact
            path="/mail_verified/:token"
            element={<VerifiedMailPage />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
};

export default AppRouter;
