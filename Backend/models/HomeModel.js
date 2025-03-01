const mongoose = require("mongoose");
const NepaliDate = require('nepali-date-converter');
const nepaliDate = new NepaliDate();
const formattedDate = nepaliDate.format("YYYY-MM-DD"); // Example: 2081-11-03
const HomeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // ✅ References User model
        required: true
    },
    renters: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            roomRent: {
                type: Number,
                required: true
            },
            electricityUnits: {
                type: Number,
                required: true
            },
            totalRooms: {
                type: Number,
                required: true

            },
            joinedAt: {
                type: String,
                default: formattedDate
            },
            advancePayment: {
                type: Number,
                required: true
            },
            MBMR: [
                {
                    year:{
                        type: Number,
                       
                    },
                    month: {
                        type: String,
                       
                         },
                    roomRent: {
                        type: Number,
                        required: true
                    },
                    electricityBillInUnits: {
                        type: Number,
                       

                    },
                    waterBillinAmount: {
                        type: Number,
                       

                    },
                    internetBillInAmount: {
                        type: Number,
                       

                    },
                    total: {
                        type: Number,
                       
                    }

                }
            ]
        },
    ],
    address: {
        type: String,
        required: true
    },
    totalRooms: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Home", HomeSchema);
