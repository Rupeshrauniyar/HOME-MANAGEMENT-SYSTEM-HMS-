const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    houses: {
        type: Array,
        default: [] // ✅ Blank array by default
    }, rentedRooms: {
        ref:"Home",
        type: Array,
        default: [] // ✅ Blank array by default
    },
    type:{
        type: String,
        required: true,
        enum: ["Admin", "Renter"]
    }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
