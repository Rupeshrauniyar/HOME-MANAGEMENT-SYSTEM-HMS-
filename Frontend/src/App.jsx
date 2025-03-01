import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Create from "./pages/Create";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Notifications from "./components/Notifications";
import {AuthProvider} from "./context/Auth";
import Issignedin from "./middlewares/Issignedin";
import BottomNavbar from "./components/BottomNavbar.jsx";
import TopNavbar from "./components/TopNavbar.jsx";
import Search from "./pages/Search.jsx";
import NotFound from "./components/NotFound.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import {HomeProvider} from "./context/HomeContext.jsx";
import Room from "./pages/Room.jsx";
import AddRenter from "./pages/AddRenter.jsx";
import RentersDetail from "./pages/RentersDetail.jsx";
const App = () => {
  return (
    // <AuthProvider>
    <div className="bg-gray-100 w-full h-screen text-black p-2 overflow-y-auto">
      <Router>
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
            <TopNavbar />
            <BottomNavbar />
          </HomeProvider>
        </AuthProvider>
      </Router>
    </div>
    // </AuthProvider>
  );
};

export default App;
