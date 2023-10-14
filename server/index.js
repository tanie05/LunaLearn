const express = require("express")
const app = express()
const mongoose = require("mongoose")
const PORT = 5000

require('dotenv').config()

const MONGOURI = process.env.MONGOURI

mongoose.connect(MONGOURI)
mongoose.connection.on("connected", () => {
    console.log("Successfully connected!!!");
})

mongoose.connection.on("error", (err) => {
    console.log("Error connecting!!!", err);
})


require("./Models/UserModel")

const authRouter = require('./Routes/AuthRoute')

app.use(express.json())
app.use('/auth', authRouter)


app.listen(PORT, () => {
    console.log("Running on port ", PORT);
})