import React, {createContext, useState, useEffect} from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
// Create context
import axios from "axios";
export const AuthContext = createContext();
const BACKENDURL = import.meta.env.VITE_BACKENDURL;
// Create a provider component
export const AuthProvider = ({children}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async (token) => {
    try {
      const response = await axios.get(`${BACKENDURL}/api/authorize`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token as Bearer token
        },
      });
      if (response.data.status) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
      return setLoading(false);
    } catch (err) {
      if (!err.response.data.status) {
        setUser(null);
      } else {
      }
      return setLoading(false);
    }
  };

  useEffect(() => {
    // Check if there is a token in cookies/localStorage and set the user
    const token = Cookies.get("token");

    if (token) {
      fetchUser(token);
    } else {
      setUser(null);
      return setLoading(false);
    }
  }, []);

  // Function to set user on successful login/signup
  const login = (userData) => {
    setUser(userData);
    // Optionally store token in cookies or localStorage
    Cookies.set("token", userData.token);
  };

  // Function to log out
  const logout = () => {
    setUser(null);
    Cookies.remove("token");
  };

  return <AuthContext.Provider value={{user,setUser, loading, login, logout}}>{!loading && children}</AuthContext.Provider>;
};
