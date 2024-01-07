const express = require('express')
const router = express.Router()
const { addOrderItems, getOrderById, getOrders, getMyOrders, refundOrder, guestOrder } = require('../controllers/orderController.js')
const { protect, admin } = require('../middleware/authMiddleware.js')

router.route('/').post(addOrderItems).get(protect, admin, getOrders)
router.route('/guest').post(guestOrder)
router.route('/:id').get(protect, getOrderById)
router.route('/myorders/:id').get(protect, getMyOrders)
router.route('/refund').put(protect, admin, refundOrder)

module.exports = router