"use client";

import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {User, Home, DoorOpen,Zap, Droplet, Wifi, CreditCard, MapPin} from "lucide-react";
import axios from "axios";
import {ToastContainer, toast} from "react-toastify";
const BACKEND_URL = import.meta.env.VITE_BACKENDURL;
import Cookies from "js-cookie";
const Create = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    totalRooms: "",
  });
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${BACKEND_URL}/api/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if(response.data.status && response.data.home){
          toast.success("Home created successfully!");
          navigate(`/room/${response.data.home._id}`);
        }else{
          toast.error(response.data.message);
        }
      });
  };
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const CreateHome = async () => {};
  return (
    <div className="w-full ">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Property Details</h2>
      </div>
      <form
        className="mt-8 space-y-6"
        onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div className="relative">
            <label
              htmlFor="name"
              className="sr-only">
              Name
            </label>
            <Home
              className="absolute top-3 left-3 text-gray-400"
              size={20}
            />
            <input
              id="name"
              name="name"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="relative">
            <label
              htmlFor="address"
              className="sr-only">
              Address
            </label>
            <MapPin
              className="absolute top-3 left-3 text-gray-400"
              size={20}
            />
            <input
              id="address"
              name="address"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="relative">
            <label
              htmlFor="totalRooms"
              className="sr-only">
              Total Rooms
            </label>
            <DoorOpen
              className="absolute top-3 left-3 text-gray-400"
              size={20}
            />
            <input
              id="totalRooms"
              name="totalRooms"
              type="number"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Total Rooms"
              value={formData.totalRooms}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
