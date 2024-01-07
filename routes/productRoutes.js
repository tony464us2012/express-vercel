const express = require('express')
const router = express.Router()
const { getProducts, getProductById, deleteProduct, updateProduct, createProduct } = require('../controllers/productController.js')
const { protect, admin } = require('../middleware/authMiddleware.js')

router.route('/').get(getProducts).post(createProduct)
router.route('/:id').get(getProductById).delete(deleteProduct).put(updateProduct)

module.exports = router
