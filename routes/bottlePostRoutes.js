const express = require('express')
const router = express.Router()
const { deleteBottle, getBottles, postBottles } = require('../controllers/bottleController.js')
const { protect, admin } = require('../middleware/authMiddleware.js')

router.route('/').post(protect, admin, postBottles).get(getBottles).delete(deleteBottle)

module.exports = router