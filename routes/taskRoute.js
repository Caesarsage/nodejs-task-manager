const express = require("express")
const TaskModel = require("../models/taskModel")
const UserModel = require("../models/userModel")

const taskRoute = express.Router()

// create a new task
taskRoute.post('/add', async (req, res, next) => {
  try {
    const { title, description, status, userId } = req.body

    const user = await UserModel.findById(userId)

    if (!user){
      res.status(404).send({
        message: "User not found"
      })
    }

    const task = new TaskModel({
      title,
      description,
      status,
      user: user?._id
    })

    await task.save()
    
    user.tasks.push(task._id)
    await user.save()
    
    res.send(task)
  } catch (e) {
    next(e)
  }
})

// Get all tasks
taskRoute.get('/', async (req, res, next) => {
  try {
    const tasks = await TaskModel.find().populate("user")

    res.send({
      message: "Tasks found",
      data: tasks
    })

  } catch (e) {
    next(e)
  }
})







module.exports = taskRoute
