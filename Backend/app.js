const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
app.use(cookieParser());
app.use(express.json());
app.use(cors())

const port = process.env.PORT || 3000
const cors = require('cors')
require("dotenv").config()
// const DB = require("./db/DB")
const DB = require("./db/DB")
DB()

const AuthRoutes = require("./routes/AuthRoute")
const HomeRoutes = require("./routes/HomeRoute")

app.get('/', (req, res) => {
    res.json('Home Management System API'); // replace with your actual response
});


app.use('/api', AuthRoutes)
app.use("/api", HomeRoutes)

app.listen(port, () => console.log(`Server is running`))

module.exports = app;
