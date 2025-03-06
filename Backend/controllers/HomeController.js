const HomeModel = require("../models/HomeModel");
const UserModel = require("../models/UserModel");
const createHomeSchema = async (req, res) => {
    try {
        const user = req.user
    
        const {
            name,
            address,
            totalRooms
        } = req.body;

        const Home = await HomeModel.create({
            name,
            admin: user.id,
            renters: [],
            address,
            totalRooms

        })
        if (Home) {
            const UpdateAdmin = await UserModel.findOneAndUpdate({ _id: user.id }, {
                $push: {
                    houses: Home._id
                }
            }, { new: true }).select("-password")
            if (UpdateAdmin) {
                res.json({ status: true, message: "Home created successfully", home: Home, user: UpdateAdmin })

            }
        } else {
            res.json({ status: false, message: "Failed to create home" })

        }
    } catch (err) {
        res.json({ status: false, message: err.message })
    }

}
const joinHomeSchema = async (req, res) => {
    try {
        const user = req.user
        const {
            renterId,
            roomId,
            roomRent,
            electricityBill,
            waterBill,
            internetBill,
            totalRooms,
            advancePayment,
            rentingDate
        } = req.body.formData
        const userId = renterId
        if (!userId, !roomId, !roomRent,
            !electricityBill,
            !waterBill,
            !internetBill,
            !rentingDate,
            !totalRooms, !advancePayment) {
            return res.json({ status: false, message: "You missed some fields..." })
        } else {
            const Home = await HomeModel.findOneAndUpdate({ _id: roomId }, {
                $push: {
                    renters: [
                        {
                            user: userId,
                            roomRent,
                            electricityUnits:electricityBill,
                            waterBill,
                            internetBill,
                            totalRooms,
                            advancePayment,
                            joinedAt: rentingDate,
                            MBMR:[]
                        }
                    ]
                },

            }, { new: true })
            const UpdateUser = await UserModel.findOneAndUpdate({ _id: userId }, {
                $push: {
                    rentedRooms: Home._id
                }
            }, { new: true })

            if (Home) {
                res.json({ status: true, message: "Renter added successfully", home: Home, UpdateUser })
            } else {
                res.json({ status: false, message: "Failed to add renter" })

            }


        }

    } catch (err) {
        console.error(err.message)
        res.json({ status: false, message: err.message })
    }

}
const fetchHomeSchema = async (req, res) => {
    const user = req.user
    const AdminHome = await HomeModel.find({ admin: req.user.id }).populate({
        path: 'renters.user',
        select: '-password',
    })
    const RenterHome = await HomeModel.find({ "renters.user": user.id });

    if (!AdminHome.length > 0 && !RenterHome.length > 0) {
        return res.json({ status: false, message: 'No home found' })
    }
    else if (AdminHome.length > 0) {
        return res.json({ status: true, home: AdminHome, type: "Admin" })

    } else {
        return res.json({ status: true, home: RenterHome, type: "Renter" })

    }

}
const searchRentersSchema = async (req, res) => {
    try {
        const Data = req.body;

        if (Data.email) {
            const email = Data.email.toString();
            const Renters = await UserModel.find({ email: { $regex: new RegExp(email, "i") } }).select("-password")
            if (Renters.length > 0) {
                return res.status(200).json({ status: true, renters: Renters });
            } else {
                return res.status(200).json({ status: false, message: "No renter found with this email" });
            }
        } else {
            return res.status(400).json({ status: false, message: "Email is required" });
        }
    } catch (error) {
        console.error("Error searching renters:", error);
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
};

const fetchHomeRentersSchema = async (req, res) => {
    try {
        const user = req.user
        const { id } = req.body
        const Home = await HomeModel.findOne({ _id: id }).populate({
            path: "renters.user",
            select: '-password',
        })
        if (!Home) {
            return res.status(200).json({ status: false, message: 'Home not found' })
        }
        return res.status(200).json({ status: true, message: 'Home found', home: Home })
    } catch (err) {
        console.error("Fetch home renters error:", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }

}

const fetchRenterDetailsSchema = async (req, res) => {
    const { homeId, rentersId } = req.params;
    if (homeId && rentersId) {
        const RenterHome = await HomeModel.findOne({ _id: homeId }).populate({
            path: "renters.user",
            select: '-password',
        })
        if (RenterHome) {
            const FilteredRenter = RenterHome.renters.filter(renter => renter.user._id == rentersId)
            const { renters, ...FilteredHome } = RenterHome.toObject();
            return res.status(200).json({ status: true, renter: FilteredRenter, RenterHome: FilteredHome })
        } else {
            return res.status(200).json({ status: false, message: 'Renter not found in this home' })
        }

    }
}


const addRentSchema = async (req, res) => {
    try {
        const Data = req.body.formData
        const { renterId, roomId, elecRate, electricityUnits, waterBill, internetBill, year, month, roomRent } = Data;
        const TotalAmt = electricityUnits * elecRate + waterBill + internetBill + roomRent
        const Renter = await HomeModel.findOneAndUpdate(
            { _id: roomId, "renters.user": renterId },
            {
                $push: {
                    "renters.$.MBMR": [{
                        electricityBillInUnits: electricityUnits,
                        waterBillinAmount: waterBill,
                        internetBillInAmount: internetBill,
                        year,
                        month,
                        roomRent,
                        total: 0
                    }]
                }
            },
            { new: true }
        );

        if (Renter) {
            res.status(200).json({ Renter, status: true })

        } else {
            res.status(404).json({ status: false, message: "Something went wrong" })

        }
    } catch (err) {
        res.status(404).json({ status: false, message: err.message })
    }

}
module.exports = { createHomeSchema, joinHomeSchema, fetchHomeSchema, fetchHomeRentersSchema, searchRentersSchema, fetchRenterDetailsSchema, addRentSchema }