import React, {useState, useEffect, useContext} from "react";
import {motion} from "framer-motion";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKENDURL;
import Cookies from "js-cookie";
import {Users, MapPin, DoorOpen, Home as House} from "lucide-react";
import Logo from "../public/Logo2.jpg";
import {Link} from "react-router-dom";
import Loader from "../components/Loading";
import {HomeContext} from "../context/HomeContext";
const Home = () => {
  // const [house, sethouse] = useState([]);
  const [Loading, setLoading] = useState(true);
  const {house, sethouse} = useContext(HomeContext);
  const token = Cookies.get("token");
  const fetchhouse = async () => {
    try {
      await axios
        .get(`${BACKEND_URL}/api/home`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(function (response) {
          if (response.data.status === true && response.data.home.length > 0) {
            return sethouse(response.data.home);
          }
        });
    } catch (err) {
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchhouse();
  }, []);
  return (
    <div className="w-full min-h-screen ">
      <div className="homeNav py-3 rounded-md w-full  ">
        <div className="flex items-center gap-3 py-2 border-b border-gray-200">
          <img
            src="/Logo.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <button className=" text-gray-500 text-left flex-1">
           HMS
          </button>
        </div>

      <div>
        <h3 className="text-2xl font-extrabold ml-1">Your properties.</h3>
      </div>
      </div>
      {Loading ? (
        <>
          <Loader />
        </>
      ) : house.length > 0 ? (
        <motion.div
          initial={{y: "5%", opacity: 0}} // Start from bottom
          animate={{y: 0, opacity: 1}} // Animate to center
          exit={{y: "100%", opacity: 0}} // Slide left on exit
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {house.map((house) => (
            <Link
              key={house._id}
              to={`/room/${house._id}`}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer">
                <div className=" h-72">
                  <img
                    src={Logo}
                    alt={house.name}
                    className="w-full h-full object-cover overflow-hidden object-center"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                    <House className="w-4 h-4 mr-2 text-blue-600" />
                    {house.name ? house.name : "Home"}
                  </h2>
                  <p className="text-gray-600 mb-2 flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                    {house.address}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-700">
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1 text-green-600" />
                      {house.renters.length === 0 ? (
                        <>{house.renters.length} Renters</>
                      ) : house.renters.length > 1 ? (
                        <>{house.renters.length} Renters</>
                      ) : (
                        <>{house.renters.length} Renter</>
                      )}
                    </span>
                    <span className="flex items-center">
                      <DoorOpen className="w-4 h-4 mr-1 text-amber-600" />
                      {house.totalRooms === 0 ? (
                        <>{house.totalRooms} Rooms</>
                      ) : house.totalRooms > 1 ? (
                        <>{house.totalRooms} Rooms</>
                      ) : (
                        <>{house.totalRooms} Room</>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      ) : (
        <div className="text-center text-gray-600">No houses available</div>
      )}
    </div>
  );
};

export default Home;
