const express = require("express")
const UserModel = require("../models/userModel")

const userRoutes = express.Router()

// create a new user
userRoutes.post('/add', async (req, res, next) => {
  try {
    const { full_name, email, password } = req.body

    const user_exist = await UserModel.findOne({
      email: email
    })

    if (user_exist) {
      res.status(400).json({
        message: "User already exist"
      })
    }

    const user = new UserModel({
      full_name: full_name,
      email: email,
      password: password
    })

    await user.save()

    res.send(user)
  } catch(e) {
    next(e)
  }
})

// Get all users
userRoutes.get('/', async (req, res, next) => {
  try {
    const users = await UserModel.find().populate("tasks")

    res.send({
      message: "Users found",
      data: users
    })
  } catch (e) {
    next(e)
  }
})

// Get a single users
userRoutes.get('/:id', async (req, res, next) => {
  try{
    const id = req.params.id

    const user = await UserModel.findById(id).populate("tasks")

    if (!user) {
      res.status(404).send({
        message: 'User not found',
        data: null
      })
    }

    res.send({
      message: 'User found',
      data: user
    })
  } catch (e) {
    next(e)
  } 
})

// Update a user
userRoutes.put('/:id/update', async (req, res, next) => {
  try {
    const id = req.params.id
    const { full_name, email, password } = req.body

    const user = await UserModel.findById(id)
    if (!user) {
      res.status(404).send({
        message: 'User not found',
        data: null
      })
    }

    const newUpdate = {
      full_name: full_name,
      email: email,
      password: password
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      id, newUpdate, { new: true }
    )

    res.send({
      message: 'User updated successfully',
      data: updatedUser
    })
  } catch (e) {
    next(e)
  }
})


module.exports = userRoutes
