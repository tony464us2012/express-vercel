const express = require('express')
const router = express.Router()
const { authUser, registerUser, getUserProfile, updateUserProfile, getUsers, deleteUser, getUserById, updateUser } = require('../controllers/userController.js')
const { protect } = require('../middleware/authMiddleware.js')

router.route('/').post(registerUser).get(getUsers)
router.route('/login').post(authUser)
router.route('/profile').get(protect, getUserProfile).put(protect,updateUserProfile)
router.route('/:id').delete(deleteUser).get(protect, getUserById).put(protect, updateUser)

module.exports = router