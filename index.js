const express = require("express") // Load express library in node.JS
const app = express() // Initialize app
const port = 4001 // Initialized port
const cors = require("cors")
const gameRouter = require("./src/game")
const playerRouter = require("./src/player")
require("dotenv").config() // Call dovenv to read environment variables
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_URL) //Connect to mongoDB

app.use(express.json()) //  Indicates the usage of json requests

app.use(cors())
app.use(gameRouter)
app.use(playerRouter)

app.listen(port,() =>{
    console.log("Server initialized in the port: ", port);
})