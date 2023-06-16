import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "../components/Footer";
import Provider from "../context/context";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import SignupPage from "../pages/SignupPage";
import UsersPage from "../pages/UsersPage";
import VerifiedMailPage from "../pages/VerifiedMailPage";
import PrivateRoute from "./PrivateRoute";
import NotLoggedRoute from "./NotLoggedRoute";

const AppRouter = () => {
  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route exact path="/profile" element={<ProfilePage />} />
            <Route exact path="/users" element={<UsersPage />} />
          </Route>
          <Route element={<NotLoggedRoute />}>
            <Route index element={<HomePage />} />
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
