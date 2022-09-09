import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Provider from "../context/context";
import SignupPage from "../components/SignupPage";
import VerifiedMailPage from "../components/VerifiedMailPage";
import ProfilePage from "../components/ProfilePage";
import PrivateRoute from "./PrivateRoute";
import NotLoggedRoute from "./NotLoggedRoute";
import HomePage from "../components/HomePage";
import EditPage from "../components/EditPage";
import InfoPage from "../components/InfoPage";
import FollowingPage from "../components/FollowingPage";
import Followers from "../components/Followers";

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
          <Route
            exact
            path="/info"
            element={
              <PrivateRoute>
                <InfoPage />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/following"
            element={
              <PrivateRoute>
                <FollowingPage />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/followers"
            element={
              <PrivateRoute>
                <Followers />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/edit-profile"
            element={
              <PrivateRoute>
                <EditPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default AppRouter;
