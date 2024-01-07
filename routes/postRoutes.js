const express = require('express')
const router = express.Router()
const { deleteTap, getTaps, postTap } = require('../controllers/postController.js')
const { protect, admin } = require('../middleware/authMiddleware.js')

router.route('/').post(protect, admin, postTap).get(getTaps).delete(deleteTap)

module.exports = router