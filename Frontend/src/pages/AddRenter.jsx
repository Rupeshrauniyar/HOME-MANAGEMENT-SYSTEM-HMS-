"use client";

import {useState, useContext} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {User, Home, Zap, Droplet, Wifi, CreditCard, Timer} from "lucide-react";
import axios from "axios";
import {ToastContainer, toast} from "react-toastify";
const BACKEND_URL = import.meta.env.VITE_BACKENDURL;
import Cookies from "js-cookie";
import {AuthContext} from "../context/Auth";
const AddRenter = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const token = Cookies.get("token");
  const [emailVal, setEmailVal] = useState("");
  const [searchedUser, setSearchedUser] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    renterId: "",
    roomId: id,
    roomRent: "",
    electricityBill: "",
    advancePayment: "",
    rentingDate: "",
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleInputChange = async (e) => {
    setOpen(true);
    setEmailVal(e.target.value);
    if (e.target.value === "" || e.target.value.length === 0) {
      setSearchedUser([]);
      setOpen(false);
      return;
    }
    await axios
      .post(
        `${BACKEND_URL}/api/room/search-renters`,
        {email: e.target.value},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (res) {
        if (res.data.status && res.data.renters.length > 0) {
          setSearchedUser(res.data.renters);
        } else {
          setSearchedUser([]);
        }
        if (e.target.value === "" || e.target.value.length === 0) {
          setSearchedUser([]);
        }
      });
  };
  const handleSelectedUserClick = async (userid, useremail) => {
    setOpen(false);
    setEmailVal(useremail);
    setFormData((prevData) => ({
      ...prevData,
      ["renterId"]: userid,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${BACKEND_URL}/api/join`,
        {formData},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        if ((response.data.status, response.data.home)) {
          toast.success("Renter added successfully!");
          navigate(`/room/${response.data.home._id}`);
        } else {
          toast.error(response.data.message);
        }
      });
  };

  return (
    <div className="w-full">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Add New Renter</h2>
      </div>
      <form
        className="mt-8 space-y-6"
        onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div className="relative">
            <label
              htmlFor="renter"
              className="sr-only">
              Renter's Email
            </label>
            <User
              className="absolute top-3 left-3 text-gray-400"
              size={20}
            />
            <input
              type="search"
              id="renter"
              name="renter"
              value={emailVal}
              onChange={handleInputChange}
              className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Renter's Email"
              required
            />
          </div>
          {open && emailVal.trim() !== "" && (
            <div className="w-full rounded-lg bg-gray-300 h-[150px] overflow-y-auto">
              <div className="flex flex-wrap gap-4 p-4">
                {searchedUser.length > 0 ? (
                  searchedUser.map((user, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelectedUserClick(user._id, user.email)}
                      className="flex items-center bg-white rounded-lg shadow-md p-4 w-full">
                      <div className="bg-gray-200 rounded-full p-2 mr-4">
                        <User
                          size={24}
                          className="text-gray-600"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{user.name}</h3>
                        <p className="text-gray-600 text-sm">{user.email}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-sm">No renters found with this email</p>
                )}
              </div>
            </div>
          )}
          <div className="relative">
            <label
              htmlFor="roomRent"
              className="sr-only">
              Renting Date
            </label>
            <Timer
              className="absolute top-3 left-3 text-gray-400"
              size={20}
            />
            <input
              type="text"
              id="rentingDate"
              name="rentingDate"
              value={formData.rentingDate}
              onChange={handleChange}
              className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Renting Date"
              required
            />
          </div>
          <div className="relative">
            <label
              htmlFor="roomRent"
              className="sr-only">
              Room Rent
            </label>
            <Home
              className="absolute top-3 left-3 text-gray-400"
              size={20}
            />
            <input
              type="number"
              id="roomRent"
              name="roomRent"
              value={formData.roomRent}
              onChange={handleChange}
              className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Room Rent"
              required
            />
          </div>
          <div className="relative">
            <label
              htmlFor="electricityBill"
              className="sr-only">
              Electricity Bill
            </label>
            <Zap
              className="absolute top-3 left-3 text-gray-400"
              size={20}
            />
            <input
              type="number"
              id="electricityBill"
              name="electricityBill"
              value={formData.electricityBill}
              onChange={handleChange}
              className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Electricity Bill Per Unit"
              required
            />
          </div>

          <div className="relative">
            <label
              htmlFor="advancePayment"
              className="sr-only">
              Advance Payment
            </label>
            <CreditCard
              className="absolute top-3 left-3 text-gray-400"
              size={20}
            />
            <input
              type="number"
              id="advancePayment"
              name="advancePayment"
              value={formData.advancePayment}
              onChange={handleChange}
              className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Advance Payment"
              required
            />
          </div>
        </div>
       
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Add Renter
            </button>
          </div>

      </form>
    </div>
  );
};

export default AddRenter;
