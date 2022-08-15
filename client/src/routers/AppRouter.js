import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Provider from "../context/context";
import SignupPage from "../components/SignupPage";
import LoginPage from "../components/LoginPage";
import VerifiedMailPage from "../components/VerifiedMailPage";
import HomePage from "../components/HomePage";
import ProfilePage from "../components/ProfilePage";
import PrivateRoute from "./PrivateRoute";
import NotLoggedRoute from "./NotLoggedRoute";

const AppRouter = () => {
  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <NotLoggedRoute>
                <HomePage />
              </NotLoggedRoute>
            }
          />
          <Route
            exact
            path="/signup"
            element={
              <NotLoggedRoute>
                <SignupPage />
              </NotLoggedRoute>
            }
          />
          <Route
            exact
            path="/login"
            element={
              <NotLoggedRoute>
                <LoginPage />
              </NotLoggedRoute>
            }
          />
          <Route
            exact
            path="/mail_verified/:token"
            element={<VerifiedMailPage />}
          />
          <Route
            exact
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default AppRouter;
