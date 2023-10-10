const express = require("express")
const mongoose = require("mongoose")
const connectDB = require("./databases")
const userRoutes = require("./routes/userRoute")
const taskRoutes = require("./routes/taskRoute")

const app = express()
const port = 3000

// Connect to MongoDB
connectDB()

// Middleware
app.use(express.json())

app.use('/user', userRoutes)
app.use('/task', taskRoutes)

app.listen(port, ()=> console.log(`Server is running on port ${port} successfully`))
