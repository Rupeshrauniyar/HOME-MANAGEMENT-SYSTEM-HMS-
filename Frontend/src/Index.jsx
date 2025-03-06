import React, {useEffect, useState} from "react";
import {App} from "@capacitor/app";

import {BrowserRouter as Router, Routes, Route, useNavigate, useLocation} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Create from "./pages/Create.jsx";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import Profile from "./pages/Profile.jsx";
import Notifications from "./components/Notifications.jsx";
import {AuthProvider} from "./context/Auth.jsx";
import Issignedin from "./middlewares/Issignedin.jsx";
import BottomNavbar from "./components/BottomNavbar.jsx";
import TopNavbar from "./components/TopNavbar.jsx";
import Search from "./pages/Search.jsx";
import NotFound from "./components/NotFound.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import {HomeProvider} from "./context/HomeContext.jsx";
import Room from "./pages/Room.jsx";
import AddRenter from "./pages/AddRenter.jsx";
import RentersDetail from "./pages/RentersDetail.jsx";
const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const handleBackButton = () => {
      if (location.pathname === "/") {
        // If on home page, close the app
        App.exitApp();
      } else {
        // Navigate back to the previous page
        navigate(-1);
      }
    };

    const backButtonListener = App.addListener("backButton", handleBackButton);

    // Clean up listener when component unmounts
    return () => {
      backButtonListener.remove();
    };
  }, [navigate, location]);

  return (
    // <AuthProvider>
    <div className="bg-gray-100 w-full h-screen text-black p-2 overflow-y-auto">
      <AuthProvider>
        <HomeProvider>
          <div className="py-16">
            {/* <Issignedin> */}
            <Routes>
              <Route element={<Issignedin />}>
                {/* Protected Route */}
                <Route
                  path="/"
                  element={<Home />}
                />
                <Route
                  path="/create"
                  element={<Create />}
                />
                <Route
                  path="/profile"
                  element={<Profile />}
                />
                <Route
                  path="/notifications"
                  element={<Notifications />}
                />
                <Route
                  path="/search"
                  element={<Search />}
                />
                <Route
                  path="/dashboard"
                  element={<Dashboard />}
                />
                <Route
                  path="/room/:id"
                  element={<Room />}
                />
                <Route
                  path="/room/:id/add-renter"
                  element={<AddRenter />}
                />
                <Route
                  path="/room/:id/details/:renterId"
                  element={<RentersDetail />}
                />
                <Route element={<TopNavbar />} />
              </Route>

              <Route
                path="/signin"
                element={<Signin />}
              />
              <Route
                path="/signup"
                element={<Signup />}
              />

              <Route
                path="*"
                element={<NotFound />}
              />
            </Routes>
            {/* </Issignedin> */}
          </div>
          <BottomNavbar />
        </HomeProvider>
      </AuthProvider>
    </div>
    // </AuthProvider>
  );
};

export default Index;
