import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SignupPage from "../components/SignupPage";
import LoginPage from "../components/LoginPage";
import React from "react";
import VerifiedMailPage from "../components/VerifiedMailPage";

/* const PrivateRoute = ({ children }) => {
  let storage = localStorage.getItem("store");
  storage = JSON.parse(storage);
  return storage && storage.user ? children : <Navigate to="/login" />;
}; */

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            // <PrivateRoute>
            <SignupPage />
            // </PrivateRoute>
          }
        />
        <Route exact path="/login" element={<LoginPage />} />
        <Route
          exact
          path="/mail_verified/:token"
          element={<VerifiedMailPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
