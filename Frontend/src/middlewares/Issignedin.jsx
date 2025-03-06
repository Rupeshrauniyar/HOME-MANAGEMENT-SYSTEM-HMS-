import React, {useContext} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../context/Auth";
import Signin from "../pages/Signin";
const Issignedin = () => {
  const navigate = useNavigate();

  const {user, loading} = useContext(AuthContext);
  return <>{loading ? <>Loading</> : user ? <Outlet /> : <Signin />}</>;
};

export default Issignedin;
