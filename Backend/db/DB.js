const mongoose = require('mongoose')
require("dotenv").config()


const DB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB).then(() => {
            console.log("Connected to DB")
        })
    } catch (error) {
        // throw error
    }
}
module.exports = DB