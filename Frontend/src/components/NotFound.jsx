import React from "react";
import {Link} from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className="text-2xl font-bold">You are lost</h3>
      <Link
        to="/"
        className="bg-blue-500 text-white p-2 ml-2 rounded-md">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
