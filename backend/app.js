const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")
const errorMiddleware = require('./middleware/error')
const fileUpload = require("express-fileupload")
const dotenv = require("dotenv")

//config file main
dotenv.config({ path: "./config/config.env" })

app.use(express.json())
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())


//importing all routes from the routes folder. This is the main file where all routes will be imported

const product = require('./routes/productRoute')
const user = require("./routes/userRoute")
const order = require("./routes/orderRoute")
const payment = require("./routes/paymentRoute")

app.use("/api/v1", product)
app.use("/api/v1", user)
app.use("/api/v1", order)
app.use("/api/v1", payment)


app.use(errorMiddleware)


module.exports = app