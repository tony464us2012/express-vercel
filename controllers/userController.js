const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken.js')
const User = require('../models/userModel.js')

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id, 
            firstName: user.firstName,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)})
    } else {
        res.status(401)
        throw new Error('Email or Password Wrong')
    }
})

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(res.body.user._id)
    if(user) {
        res.json({
            _id: user._id,
            firstName: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, phone, email, password } = req.body
  
    const userExists = await User.findOne({ email })

   if(userExists) {
       res.status(400)
       throw new Error('User already exists')
   }

   const user = await User.create({
       firstName,
       lastName,
       phone,
       email,
       password
   })

   if(user) {
    res.json({
        _id: user._id, 
        firstName: user.firstName,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)})
   } else {
    res.status(404)
    throw new Error('User not found')
   }
})

const updateUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.body.id)

    if(user) {
        user.firstName = req.body.firstName || user.firstName
        user.firstLast = req.body.lastName || user.lastName
        user.email = req.body.email || user.email
        user.phone = req.body.phone || user.phone
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    
    if(user) {
        await user.remove()
        res.status(200)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if(user) {
        user.firstName = req.body.firstName || user.firstName
        user.lastName = req.body.lastName || user.lastName
        user.phone = req.body.phone || user.phone
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            phone: updatedUser.phone,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


module.exports = {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
}