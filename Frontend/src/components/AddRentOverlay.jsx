import {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {PanelLeftClose} from "lucide-react";
import {User, Home, Zap, Droplet, Wifi, CreditCard, Timer, Calendar, CalendarDays} from "lucide-react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKENDURL;
import Cookies from "js-cookie";
import {ToastContainer, toast} from "react-toastify";
import NepaliDate from "nepali-date-converter";
const AddRentersOverlay = (props) => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const Nepalidate = new NepaliDate().format("YYYY");
  const {id, renterId} = useParams();
  const [formData, setFormData] = useState({
    renterId: renterId,
    roomId: id,
    roomRent: props.renter.roomRent,
    elecRate: props.renter.electricityBill,
    electricityUnits: "",
    waterBill: "",
    internetBill: "",
    year: Nepalidate,
    month: "",
  });
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    if (
      (!formData.renterId,
      !formData.roomId,
      !formData.roomRent,
      !formData.elecRate,
      !formData.electricityUnits,
      !formData.waterBill,
      !formData.internetBill,
      !formData.year,
      !formData.month)
    ) {
      return toast.error("Please fill all the fields");
    }
    await axios
      .post(
        `${BACKEND_URL}/api/room/renter/add-rent`,
        {formData},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.status && response.data.Renter) {
         
          toast.success("Rent added successfully!");
          navigate(`/room/${id}/details/${renterId}?refetch=true`);
        } else {
          toast.error(response.data.message);
        }
      });
  };

  return (
    <>
      <ToastContainer />
      <AnimatePresence>
        {props.setOpen ? (
          <motion.div
            initial={{y: "100%", opacity: 0}} // Start from bottom
            animate={{y: 0, opacity: 1}} // Animate to center
            exit={{y: "100%", opacity: 0}} // Slide left on exit
            transition={{type: "spring", stiffness: 100, damping: 15}}
            className="w-full h-full p-6 rounded-md bg-white fixed top-10 left-0 flex flex-col items-center justify-center">
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div className="relative w-full">
                <label
                  htmlFor="year"
                  className="sr-only">
                  Year
                </label>
                <Calendar
                  className="absolute top-3 left-3 text-gray-400"
                  size={20}
                />
                <select
                  type="year"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="rounded-t-md appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Year"
                  required>
                  <option value={Nepalidate}>{Nepalidate}</option>
                  <option value={Nepalidate - 1}>{Nepalidate - 1}</option>
                </select>
              </div>
              <div className="relative w-full">
                <label
                  htmlFor="month"
                  className="sr-only">
                  Month
                </label>
                <CalendarDays
                  className="absolute top-3 left-3 text-gray-400"
                  size={20}
                />
                <select
                  id="month"
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Month"
                  required>
                  <option value="">Month</option>
                  <option value="Baishak">Baishak</option>
                  <option value="Jestha">Jestha</option>
                  <option value="Ashad">Ashad</option>
                  <option value="Shrawan">Shrawan</option>
                  <option value="Bhadrab">Bhadrab</option>
                  <option value="Ashwin">Ashwin</option>
                  <option value="Kartik">Kartik</option>
                  <option value="Margashirsha">Margashirsha</option>
                  <option value="Poush">Poush</option>
                  <option value="Magh">Magh</option>
                  <option value="Falgun">Falgun</option>
                  <option value="Chaitra">Chaitra</option>
                </select>
              </div>
              <div className="relative w-full">
                <label
                  htmlFor="electricityBill"
                  className="sr-only">
                  Electricity Units
                </label>
                <Zap
                  className="absolute top-3 left-3 text-gray-400"
                  size={20}
                />
                <input
                  type="number"
                  id="electricityUnits"
                  name="electricityUnits"
                  value={formData.electricityUnits}
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Electricity Units"
                  required
                />
              </div>
              <div className="relative w-full">
                <label
                  htmlFor="waterBill"
                  className="sr-only">
                  Water Bill
                </label>
                <Droplet
                  className="absolute top-3 left-3 text-gray-400"
                  size={20}
                />
                <input
                  type="number"
                  id="waterBill"
                  name="waterBill"
                  value={formData.waterBill}
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Water Bill"
                  required
                />
              </div>
              <div className="relative w-full">
                <label
                  htmlFor="internetBill"
                  className="sr-only">
                  Internet Bill
                </label>
                <Wifi
                  className="absolute top-3 left-3 text-gray-400"
                  size={20}
                />
                <input
                  type="number"
                  id="internetBill"
                  name="internetBill"
                  value={formData.internetBill}
                  onChange={handleChange}
                  className="rounded-b-md appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Internet Bill"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  onClick={() => handleSubmit()}
                  className="mt-2 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Add Rent
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default AddRentersOverlay;
