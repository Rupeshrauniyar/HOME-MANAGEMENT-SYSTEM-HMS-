"use client";
import {motion, AnimatePresence} from "framer-motion";
import {useState, useEffect, useContext} from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Home, User, Phone, Mail, IndianRupee, Zap, Droplet, Wifi, Plus, DoorOpen, PanelBottomClose} from "lucide-react";
import AddRentOverlay from "../components/AddRentOverlay";
const BACKEND_URL = import.meta.env.VITE_BACKENDURL;
import NepaliDate from "nepali-date-converter";
import {AuthContext} from "../context/Auth";
const RentersDetail = () => {
  const {user} = useContext(AuthContext);
  const Nepalidate = new NepaliDate().format("YYYY");
  const [year, setYear] = useState(0);
  const {id, renterId} = useParams();
  const [renter, setRenter] = useState(null);
  const [home, setHome] = useState(null);
  const [open, setOpen] = useState(false);
  const [showIcon, setShowIcon] = useState(false);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setShowIcon(true);
      }, 300); // Delay of 1 second

      return () => clearTimeout(timer);
    } else {
      setShowIcon(false);
    }
  }, [open]);

  const navigate = useNavigate();
  const location = useLocation();
  const uniqueYears = new Array();

  // Check if the URL contains `?show=true`
  const searchParams = new URLSearchParams(location.search);
  const isComponentVisible = searchParams.get("show") === "true";
  const isRefetch = searchParams.get("refetch") === "true";

  useEffect(() => {
    if (isComponentVisible) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isComponentVisible]);

  useEffect(() => {
    setYear(Nepalidate);
  }, [Nepalidate]);
  const HandelAddRent = () => {
    navigate("?show=true", {replace: false});
  };

  useEffect(() => {
    const getRenterDetails = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/${id}/renters/${renterId}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        setRenter(response.data.renter[0]);
        setHome(response.data.RenterHome);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch renter details.");
      }
    };

    getRenterDetails();
  }, [id, renterId]);
  useEffect(() => {
    if (isRefetch) {
      const Refetch = async () => {
        try {
          const response = await axios.get(`${BACKEND_URL}/api/${id}/renters/${renterId}`, {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          });
          setRenter(response.data.renter[0]);
        } catch (error) {
          console.error(error);
          toast.error("Failed to fetch renter details.");
        }
      };
      Refetch();
    }
  }, [isRefetch]);
  if (!renter || !home) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto ">
      <div className="w-full h-full flex flex-col">
        {showIcon ? (
          <PanelBottomClose
            className="absolute right-5 z-100 cursor-pointer"
            onClick={() => navigate("?show=false", {replace: false})}
          />
        ) : null}

        <AddRentOverlay
          setOpen={open}
          renter={renter}
          className="relative"
        />
      </div>

      <ToastContainer />
      <div className="HomeInformation bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-lg shadow-lg mb-8">
        <h1 className="text-3xl font-bold flex items-center">
          <Home className="mr-2" /> {home.name || "Home"}
        </h1>
        <p className="mt-2 text-lg flex items-center truncate">
          <Mail className="mr-2" /> {home.address}
        </p>
        <p className="mt-1 text-lg flex items-center">
          <DoorOpen className="mr-2" /> Total Rooms: {home.totalRooms}
        </p>
      </div>

      <div className="RentersInformation bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <User className="mr-2" /> Renter Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p className="flex items-center">
            <User className="mr-2" /> {renter.user.name}
          </p>
          <p className="flex items-center">
            <Mail className="mr-2" /> {renter.user.email}
          </p>
          <p className="flex items-center">
            <Phone className="mr-2" /> {renter.user.phone}
          </p>
        </div>
      </div>

      <div className="w-full overflow-y-auto flex">
        {renter.MBMR.filter((MBMR) => {
          if (!uniqueYears.includes(MBMR.year)) {
            uniqueYears.push(MBMR.year);
          }
        })}
        {uniqueYears
          .slice()
          .reverse()
          .map((UnqYr, i) => (
            <button
              key={i}
              className={`${String(year) === String(UnqYr) ? "bg-blue-400" : "bg-gray-400"} m-1 text-white p-2 rounded-md`}
              onClick={() => setYear(UnqYr)}>
              {UnqYr}
            </button>
          ))}
      </div>
      <div className="RentDets bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <div className="w-full">
            {/* Table Header */}
            <div className="bg-gray-50 grid grid-cols-6 min-w-[700px] px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              {["Month", "Room Rent", "Electricity ", "Water", "Internet", "Total"].map((header, i) => (
                <div
                  key={i}
                  className="text-center">
                  {header}
                </div>
              ))}
            </div>

            {/* Table Body */}
            <div className="overflow-y-auto min-w-[700px] max-h-96 bg-white divide-y divide-gray-200">
              {renter.MBMR.length > 0 && year ? (
                renter.MBMR.filter((MBMR) => String(MBMR.year) === String(year)).map((bill, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-6 min-w-[700px] px-4 py-3 hover:bg-gray-50 items-center text-center">
                    <div>{bill.month}</div>
                    <div className="flex justify-center items-center">
                      <IndianRupee className="mr-1 h-4 w-4 text-gray-400" />
                      {bill.roomRent}
                    </div>
                    <div className="flex justify-center items-center">
                      <Zap className="mr-1 h-4 w-4 text-yellow-400" />
                      {bill.electricityBillInUnits}unit(s) = ₹{bill.electricityBillInUnits * renter.electricityUnits}
                    </div>
                    <div className="flex justify-center items-center">
                      <Droplet className="mr-1 h-4 w-4 text-blue-400" />
                      {bill.waterBillinAmount}
                    </div>
                    <div className="flex justify-center items-center">
                      <Wifi className="mr-1 h-4 w-4 text-green-400" />
                      {bill.internetBillInAmount}
                    </div>
                    <div className="font-medium text-indigo-600">
                      ₹
                      {(
                        bill.electricityBillInUnits * renter.electricityUnits +
                        bill.waterBillinAmount +
                        bill.internetBillInAmount +
                        bill.roomRent
                      ).toLocaleString()}
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full p-2 flex flex-col xl:items-center xl:justify-center text-black ml-[130px] xl:ml-0 overflow-hidden">
                  <h3 className="">No rent data available</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {home.admin === user._id ? (
        <div className="flex flex-col items-end justify-right w-full ">
          <button
            onClick={HandelAddRent}
            className="w-[50px] mb-2 mt-2 flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 rounded-lg shadow-md  ">
            <Plus />
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default RentersDetail;
