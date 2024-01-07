const mongoose = require('mongoose')

const productSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true, 
        default: 0
    },
    addOnType: {
        type: String
    },
    available: {
        type: Boolean,
        required: true,
        default: true
    }
  
}, {
    timestaps: true
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product