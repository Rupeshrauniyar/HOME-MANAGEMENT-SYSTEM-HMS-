const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
const port = process.env.PORT || 3000
const cors = require('cors')
app.use(cors())
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

