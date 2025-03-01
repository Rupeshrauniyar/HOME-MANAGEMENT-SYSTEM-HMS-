import React, {useContext, useState, useEffect} from "react";
import {motion} from "framer-motion";
import {HomeContext} from "../context/HomeContext";
import {useParams} from "react-router-dom";
import Loader from "../components/Loading";
const BACKEND_URL = import.meta.env.VITE_BACKENDURL;
import axios from "axios";
import Cookies from "js-cookie";
import {Link} from "react-router-dom";
import Logo from "../public/Logo2.jpg";
import {User, Home, Phone, Mail, Calendar, DollarSign, Zap, Droplet, Wifi, PhoneCall, Plus} from "lucide-react";
import {ToastContainer, toast} from "react-toastify";
import {AuthContext} from "../context/Auth";
const Room = () => {
  const {id} = useParams();
  const [Loading, setLoading] = useState(true);
  const [house, sethouse] = useState([]);
  const {user} = useContext(AuthContext);
  const fetchhouseRenters = async (token) => {
    try {
      await axios
        .post(
          `${BACKEND_URL}/api/home/renters`,
          {id},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          if (response.data.status === true && response.data.home) {
            return sethouse(response.data.home);
          }
        });
    } catch (err) {
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    const token = Cookies.get("token");
    fetchhouseRenters(token);
  }, []);
  return (
    <div className="w-full min-h-screen ">
      {Loading ? (
        <>
          <Loader />
        </>
      ) : house?._id ? (
        <div className="w-full">
          <ToastContainer />
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-lg shadow-md mb-6">
            <h1 className="text-3xl font-bold flex items-center">
              <Home className="mr-1" /> {house.name ? house.name : "Home"}
            </h1>
            <p className="mt-1 text-lg">📍 {house.address}</p>
            <p className="mt-1 text-lg">🏠 Total Rooms: {house.totalRooms}</p>
          </div>
          <motion.div
            initial={{y: "10%", opacity: 0}} // Start from bottom
            animate={{y: 0, opacity: 1}} // Animate to center
            exit={{y: "100%", opacity: 0}} // Slide left on exit
            transition={{type: "spring", stiffness: 100, damping: 15}}
            className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {!house.renters.length > 0 ? (
              <div className=" w-full  font-semibold flex flex-col items-center justify-center text-center">
                <h2>No renters available.</h2>
              </div>
            ) : house.admin === user._id ? (
              house.renters
                .slice()
                .reverse()
                .map((renter) => (
                  <Link
                    key={renter.user._id}
                    to={`details/${renter.user._id}`}>
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
                      {/* Renter Info */}
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-5 text-white">
                        <h2 className="text-2xl font-semibold flex items-center">
                          <User className="mr-2" />
                          {renter.user.name}
                        </h2>
                        <p className="flex items-center mt-1">
                          <Mail className="mr-2" />
                          {renter.user.email}
                        </p>
                        <p className="flex items-center mt-1">
                          <PhoneCall className="mr-2" />
                          {renter.user.phone}
                        </p>
                        <p className="flex items-center mt-1">
                          <Calendar className="mr-2" />
                          Joined: {new Date(renter.joinedAt).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Rent & Bills */}
                      <div className="p-5 space-y-3">
                        <p className="text-lg font-semibold text-gray-700 flex items-center">
                          <DollarSign className="mr-2 text-green-500" /> Room Rent:{" "}
                          <span className="ml-auto text-gray-800 font-medium">₹{renter.roomRent.toLocaleString()}</span>
                        </p>

                        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                          <div className="bg-gray-100 p-3 rounded-md truncate">💡 Electricity: ₹{renter.electricityUnits.toLocaleString()}/unit</div>
                          <div className="bg-gray-100 p-3 rounded-md font-semibold text-blue-600">Advance: ₹{renter.advancePayment.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
            ) : (
              house.renters
                .slice()
                .reverse()
                .filter((renter) => renter.user._id === user._id)
                .map((renter) => (
                  <Link
                    key={renter.user._id}
                    to={`details/${renter.user._id}`}>
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
                      {/* Renter Info */}
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-5 text-white">
                        <h2 className="text-2xl font-semibold flex items-center">
                          <User className="mr-2" />
                          {renter.user.name}
                        </h2>
                        <p className="flex items-center mt-1">
                          <Mail className="mr-2" />
                          {renter.user.email}
                        </p>
                        <p className="flex items-center mt-1">
                          <PhoneCall className="mr-2" />
                          {renter.user.phone}
                        </p>
                        <p className="flex items-center mt-1">
                          <Calendar className="mr-2" />
                          Joined: {new Date(renter.joinedAt).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Rent & Bills */}
                      <div className="p-5 space-y-3">
                        <p className="text-lg font-semibold text-gray-700 flex items-center">
                          <DollarSign className="mr-2 text-green-500" /> Room Rent:{" "}
                          <span className="ml-auto text-gray-800 font-medium">₹{renter.roomRent.toLocaleString()}</span>
                        </p>

                        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                          <div className="bg-gray-100 p-3 rounded-md truncate">💡 Electricity: ₹{renter.electricityUnits.toLocaleString()}/unit</div>
                          <div className="bg-gray-100 p-3 rounded-md font-semibold text-blue-600">Advance: ₹{renter.advancePayment.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
            )}
          </motion.div>
          {house.admin === user._id ? (
            <div className="">
              <Link
                to={`/room/${house._id}/add-renter`}
                className="fixed right-1 bottom-18  bg-red-500  bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 rounded-lg shadow-md  flex flex-col items-center justify-center">
                <Plus />
              </Link>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div className=" w-full  font-semibold flex flex-col items-center justify-center">
          <h2>Broken room 😔.</h2>
          <span>
            Go back to{" "}
            <Link
              to="/"
              className="text-blue-500">
              Home
            </Link>
          </span>
        </div>
      )}
    </div>
  );
};

export default Room;
