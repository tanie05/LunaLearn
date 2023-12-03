const express = require("express")
const app = express()
const mongoose = require("mongoose")
const PORT = 5000
app.use("/files", express.static("files"));
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
require("./Models/ClassModel")
require("./Models/DiscussionModel")

const authRouter = require('./Routes/AuthRoute')
const classRouter = require('./Routes/ClassRoutes')
const contentRouter = require('./Routes/ContentRoutes')
const user = require('./Routes/UserRoutes')
const todoRouter = require('./Routes/TodoRoutes')
const discussionsRouter = require('./Routes/DiscussionRoutes')
const cors = require('cors');
app.use(cors());
app.use(express.json())

app.use('/auth', authRouter)
app.use('/classes', classRouter)
app.use('/contents', contentRouter)
app.use('/users', user)
app.use('/todos', todoRouter)
app.use('/classes', discussionsRouter)


app.listen(PORT, () => {
    console.log("Running on port ", PORT);
})