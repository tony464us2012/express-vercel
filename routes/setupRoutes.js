const express = require('express')
const router = express.Router()
const { getSetup, updateSetup } = require('../controllers/orderController.js')
const { protect, admin } = require('../middleware/authMiddleware.js')

router.route('/').get(getSetup).put(protect, admin, updateSetup)

module.exports = router