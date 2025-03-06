import React from "react";
import {BrowserRouter as Router, Routes, Route, useNavigate, useLocation} from "react-router-dom";
import Index from "./Index.jsx";
const App = () => {
  return (
    // <AuthProvider>
    <div className="bg-gray-100 w-full h-screen text-black p-2 overflow-y-auto">
      <Router>
        <Index />
      </Router>
    </div>
    // </AuthProvider>
  );
};

export default App;
